use anchor_lang::prelude::*;
use anchor_lang::system_program;

declare_id!("5HkXrfVJJEmhz89sajAk62tbny4MgKQFPLpdzo3E95Fg");

#[program]
pub mod betfolio_spread {
    use super::*;

    // admin: Address, Global program admin, 9WzD...
    // fee_bps: Number, Protocol fee percentage, 250 = 2.5%
    pub fn initialize_global(
        ctx: Context<InitializeGlobal>,
        fee_bps: u16,
    ) -> Result<()> {
        require!(fee_bps <= 1000, ErrorCode::InvalidFee);
        
        let config = &mut ctx.accounts.config;
        config.bump = ctx.bumps.config;
        config.admin = ctx.accounts.admin.key();
        config.fee_bps = fee_bps;
        config.paused = false;
        
        emit!(GlobalConfigInitialized {
            admin: config.admin,
            fee_bps,
        });
        
        Ok(())
    }

    pub fn set_fee_bps(ctx: Context<UpdateConfig>, new_fee_bps: u16) -> Result<()> {
        require!(new_fee_bps <= 1000, ErrorCode::InvalidFee);
        
        let config = &mut ctx.accounts.config;
        config.fee_bps = new_fee_bps;
        
        Ok(())
    }

    pub fn pause(ctx: Context<UpdateConfig>, paused: bool) -> Result<()> {
        let config = &mut ctx.accounts.config;
        config.paused = paused;
        
        Ok(())
    }

    // home_team: String, Team name, "Lakers"
    // away_team: String, Team name, "Warriors"  
    // spread_bps: Number, Spread in basis points, -750 = -7.5 pts
    // favorite_is_home: Boolean, True if home team favored
    // lock_time: Number, Unix timestamp cutoff, 1640995200
    // max_exposure_lamports: Number, Risk cap in lamports, 1000000000
    // market_id: Number, Unique market identifier, 1
    pub fn create_market(
        ctx: Context<CreateMarket>,
        home_team: String,
        away_team: String,
        spread_bps: i32,
        favorite_is_home: bool,
        lock_time: i64,
        max_exposure_lamports: u64,
        market_id: u64,
    ) -> Result<()> {
        require!(home_team.len() <= 32, ErrorCode::InvalidParameter);
        require!(away_team.len() <= 32, ErrorCode::InvalidParameter);
        require!(spread_bps >= -5000 && spread_bps <= 5000, ErrorCode::InvalidSpread);
        require!(lock_time > Clock::get()?.unix_timestamp, ErrorCode::InvalidParameter);
        require!(max_exposure_lamports > 0, ErrorCode::InvalidParameter);

        let authority_key = ctx.accounts.authority.key();
        
        let market = &mut ctx.accounts.market;
        market.bump = ctx.bumps.market;
        market.authority = authority_key;
        market.market_id = market_id;
        
        let mut home_team_bytes = [0u8; 32];
        let home_bytes = home_team.as_bytes();
        home_team_bytes[..home_bytes.len()].copy_from_slice(home_bytes);
        market.home_team = home_team_bytes;
        
        let mut away_team_bytes = [0u8; 32];
        let away_bytes = away_team.as_bytes();
        away_team_bytes[..away_bytes.len()].copy_from_slice(away_bytes);
        market.away_team = away_team_bytes;
        
        market.spread_bps = spread_bps;
        market.favorite_is_home = favorite_is_home;
        market.lock_time = lock_time;
        market.settled = false;
        market.home_score = 0;
        market.away_score = 0;
        market.total_handle_lamports = 0;
        market.favorite_pool_lamports = 0;
        market.underdog_pool_lamports = 0;
        market.max_exposure_lamports = max_exposure_lamports;
        
        let vault = &mut ctx.accounts.market_vault;
        vault.bump = ctx.bumps.market_vault;
        
        emit!(MarketCreated {
            market: ctx.accounts.market.key(),
            authority: authority_key,
            market_id,
            spread_bps,
            lock_time,
        });
        
        Ok(())
    }

    pub fn delegate_market_to_er(ctx: Context<DelegateMarket>) -> Result<()> {
        // MagicBlock ER delegation CPI would go here
        // let cpi_program = ctx.accounts.er_program.to_account_info();
        // let cpi_accounts = MagicBlockDelegate { ... };
        // magicblock::delegate(CpiContext::new(cpi_program, cpi_accounts))?;
        
        emit!(Delegated {
            market: ctx.accounts.market.key(),
        });
        
        Ok(())
    }

    // side: Number, Betting side, 0 = Favorite, 1 = Underdog
    // stake: Number, Bet amount in lamports, 1000000000
    pub fn place_bet(
        ctx: Context<PlaceBet>,
        side: u8,
        stake: u64,
    ) -> Result<()> {
        let config = &ctx.accounts.config;
        let market = &ctx.accounts.market;
        let bettor_key = ctx.accounts.bettor.key();
        
        require!(!config.paused, ErrorCode::Paused);
        require!(!market.settled, ErrorCode::AlreadySettled);
        require!(Clock::get()?.unix_timestamp < market.lock_time, ErrorCode::BettingWindowClosed);
        require!(side <= 1, ErrorCode::InvalidParameter);
        require!(stake > 0, ErrorCode::InvalidStake);
        
        let new_total = market.total_handle_lamports
            .checked_add(stake)
            .ok_or(ErrorCode::MathOverflow)?;
        require!(new_total <= market.max_exposure_lamports, ErrorCode::ExposureExceeded);
        
        system_program::transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                system_program::Transfer {
                    from: ctx.accounts.bettor.to_account_info(),
                    to: ctx.accounts.market_vault.to_account_info(),
                },
            ),
            stake,
        )?;
        
        let bet = &mut ctx.accounts.bet;
        bet.bump = ctx.bumps.bet;
        bet.bettor = bettor_key;
        bet.market = ctx.accounts.market.key();
        bet.side = side;
        bet.stake_lamports = stake;
        bet.odds_bps = 0; // Pari-mutuel
        bet.claimed = false;
        bet.created_at = Clock::get()?.unix_timestamp;
        
        let market = &mut ctx.accounts.market;
        market.total_handle_lamports = new_total;
        
        if side == 0 {
            market.favorite_pool_lamports = market.favorite_pool_lamports
                .checked_add(stake)
                .ok_or(ErrorCode::MathOverflow)?;
        } else {
            market.underdog_pool_lamports = market.underdog_pool_lamports
                .checked_add(stake)
                .ok_or(ErrorCode::MathOverflow)?;
        }
        
        emit!(BetPlaced {
            market: ctx.accounts.market.key(),
            bettor: bettor_key,
            side,
            stake,
        });
        
        Ok(())
    }

    pub fn commit_from_er(ctx: Context<CommitFromEr>) -> Result<()> {
        // MagicBlock commit CPI would go here
        
        emit!(Committed {
            market: ctx.accounts.market.key(),
        });
        
        Ok(())
    }

    pub fn commit_and_undelegate(ctx: Context<CommitAndUndelegate>) -> Result<()> {
        // MagicBlock commit and undelegate CPI would go here
        
        emit!(Undelegated {
            market: ctx.accounts.market.key(),
        });
        
        Ok(())
    }

    pub fn undelegate_market(ctx: Context<UndelegateMarket>) -> Result<()> {
        // MagicBlock undelegation CPI via validator would go here
        
        Ok(())
    }

    // home_score: Number, Final home team score, 105
    // away_score: Number, Final away team score, 98
    pub fn post_result_and_settle(
        ctx: Context<SettleMarket>,
        home_score: i32,
        away_score: i32,
    ) -> Result<()> {
        let market = &ctx.accounts.market;
        
        require!(!market.settled, ErrorCode::AlreadySettled);
        require!(home_score >= 0, ErrorCode::InvalidParameter);
        require!(away_score >= 0, ErrorCode::InvalidParameter);
        
        let fav_margin = if market.favorite_is_home {
            (home_score - away_score) * 100
        } else {
            (away_score - home_score) * 100
        };
        
        let winner_side = if fav_margin > market.spread_bps {
            0 // Favorite wins
        } else if fav_margin < market.spread_bps {
            1 // Underdog wins
        } else {
            255 // Push (only for whole-point spreads)
        };
        
        let is_push = winner_side == 255 && (market.spread_bps % 50 == 0);
        
        let market = &mut ctx.accounts.market;
        market.settled = true;
        market.home_score = home_score;
        market.away_score = away_score;
        
        emit!(MarketSettled {
            market: ctx.accounts.market.key(),
            home_score,
            away_score,
            winner_side,
            push: is_push,
        });
        
        Ok(())
    }

    pub fn claim(ctx: Context<Claim>) -> Result<()> {
        let bet = &ctx.accounts.bet;
        let market = &ctx.accounts.market;
        let config = &ctx.accounts.config;
        
        require!(market.settled, ErrorCode::SettlementNotReady);
        require!(!bet.claimed, ErrorCode::AlreadyClaimed);
        
        let fav_margin = if market.favorite_is_home {
            (market.home_score - market.away_score) * 100
        } else {
            (market.away_score - market.home_score) * 100
        };
        
        let winner_side = if fav_margin > market.spread_bps {
            0
        } else if fav_margin < market.spread_bps {
            1
        } else {
            255 // Push
        };
        
        let is_push = winner_side == 255 && (market.spread_bps % 50 == 0);
        let bettor_key = ctx.accounts.bettor.key();
        let market_key = ctx.accounts.market.key();
        
        let payout = if is_push {
            bet.stake_lamports
        } else if winner_side == bet.side {
            let winner_pool = if bet.side == 0 {
                market.favorite_pool_lamports
            } else {
                market.underdog_pool_lamports
            };
            
            let fee_amount = market.total_handle_lamports
                .checked_mul(config.fee_bps as u64)
                .ok_or(ErrorCode::MathOverflow)?
                .checked_div(10000)
                .ok_or(ErrorCode::MathOverflow)?;
            
            let net_pool = market.total_handle_lamports
                .checked_sub(fee_amount)
                .ok_or(ErrorCode::MathOverflow)?;
                
            bet.stake_lamports
                .checked_mul(net_pool)
                .ok_or(ErrorCode::MathOverflow)?
                .checked_div(winner_pool)
                .ok_or(ErrorCode::MathOverflow)?
        } else {
            0 // Losing bet
        };
        
        require!(payout > 0, ErrorCode::NothingToClaim);
        
        let market_key = ctx.accounts.market.key();
        let vault_bump = [ctx.accounts.market_vault.bump];
        let vault_seeds = &[b"vault", market_key.as_ref(), &vault_bump];
        let signer_seeds: &[&[&[u8]]] = &[vault_seeds];
        
        system_program::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.system_program.to_account_info(),
                system_program::Transfer {
                    from: ctx.accounts.market_vault.to_account_info(),
                    to: ctx.accounts.bettor.to_account_info(),
                },
                signer_seeds,
            ),
            payout,
        )?;
        
        let bet = &mut ctx.accounts.bet;
        bet.claimed = true;
        
        emit!(BetClaimed {
            market: market_key,
            bettor: bettor_key,
            amount: payout,
        });
        
        Ok(())
    }

    pub fn withdraw_fees(ctx: Context<WithdrawFees>, amount: u64) -> Result<()> {
        let to_key = ctx.accounts.to.key();
        
        system_program::transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                system_program::Transfer {
                    from: ctx.accounts.fee_vault.to_account_info(),
                    to: ctx.accounts.to.to_account_info(),
                },
            ),
            amount,
        )?;
        
        emit!(FeesWithdrawn {
            to: to_key,
            amount,
        });
        
        Ok(())
    }
}

// Accounts
#[account]
pub struct GlobalConfig {
    pub bump: u8,
    pub admin: Pubkey,
    pub fee_bps: u16,
    pub paused: bool,
}
impl GlobalConfig {
    pub const LEN: usize = 1 + 32 + 2 + 1;
}

#[account]
pub struct Market {
    pub bump: u8,
    pub authority: Pubkey,
    pub market_id: u64,
    pub home_team: [u8; 32],
    pub away_team: [u8; 32],
    pub spread_bps: i32,
    pub favorite_is_home: bool,
    pub lock_time: i64,
    pub settled: bool,
    pub home_score: i32,
    pub away_score: i32,
    pub total_handle_lamports: u64,
    pub favorite_pool_lamports: u64,
    pub underdog_pool_lamports: u64,
    pub max_exposure_lamports: u64,
}
impl Market {
    pub const LEN: usize = 1 + 32 + 8 + 32 + 32 + 4 + 1 + 8 + 1 + 4 + 4 + 8 + 8 + 8 + 8;
}

#[account]
pub struct Bet {
    pub bump: u8,
    pub bettor: Pubkey,
    pub market: Pubkey,
    pub side: u8,
    pub stake_lamports: u64,
    pub odds_bps: i32,
    pub claimed: bool,
    pub created_at: i64,
}
impl Bet {
    pub const LEN: usize = 1 + 32 + 32 + 1 + 8 + 4 + 1 + 8;
}

#[account]
pub struct MarketVault {
    pub bump: u8,
}
impl MarketVault {
    pub const LEN: usize = 1;
}

// Context structs
#[derive(Accounts)]
pub struct InitializeGlobal<'info> {
    #[account(
        init,
        seeds = [b"config", admin.key().as_ref()],
        bump,
        payer = admin,
        space = 8 + GlobalConfig::LEN
    )]
    pub config: Account<'info, GlobalConfig>,
    #[account(mut)]
    pub admin: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateConfig<'info> {
    #[account(
        mut,
        seeds = [b"config", config.admin.as_ref()],
        bump = config.bump,
        has_one = admin @ ErrorCode::Unauthorized
    )]
    pub config: Account<'info, GlobalConfig>,
    pub admin: Signer<'info>,
}

#[derive(Accounts)]
#[instruction(home_team: String, away_team: String, spread_bps: i32, favorite_is_home: bool, lock_time: i64, max_exposure_lamports: u64, market_id: u64)]
pub struct CreateMarket<'info> {
    #[account(
        init,
        seeds = [b"market", authority.key().as_ref(), &market_id.to_le_bytes()],
        bump,
        payer = authority,
        space = 8 + Market::LEN
    )]
    pub market: Account<'info, Market>,
    #[account(
        init,
        seeds = [b"vault", market.key().as_ref()],
        bump,
        payer = authority,
        space = 8 + MarketVault::LEN
    )]
    pub market_vault: Account<'info, MarketVault>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DelegateMarket<'info> {
    pub market: Account<'info, Market>,
    // pub er_program: Program<'info, MagicBlockEr>,
}

#[derive(Accounts)]
pub struct PlaceBet<'info> {
    #[account(
        init,
        seeds = [b"bet", bettor.key().as_ref(), market.key().as_ref()],
        bump,
        payer = bettor,
        space = 8 + Bet::LEN
    )]
    pub bet: Account<'info, Bet>,
    #[account(
        mut,
        seeds = [b"market", market.authority.as_ref(), &market.market_id.to_le_bytes()],
        bump = market.bump
    )]
    pub market: Account<'info, Market>,
    #[account(
        mut,
        seeds = [b"vault", market.key().as_ref()],
        bump = market_vault.bump
    )]
    pub market_vault: Account<'info, MarketVault>,
    #[account(
        seeds = [b"config", config.admin.as_ref()],
        bump = config.bump
    )]
    pub config: Account<'info, GlobalConfig>,
    #[account(mut)]
    pub bettor: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CommitFromEr<'info> {
    pub market: Account<'info, Market>,
    // pub er_program: Program<'info, MagicBlockEr>,
}

#[derive(Accounts)]
pub struct CommitAndUndelegate<'info> {
    pub market: Account<'info, Market>,
    // pub er_program: Program<'info, MagicBlockEr>,
}

#[derive(Accounts)]
pub struct UndelegateMarket<'info> {
    pub market: Account<'info, Market>,
    // pub er_validator: Program<'info, MagicBlockValidator>,
}

#[derive(Accounts)]
pub struct SettleMarket<'info> {
    #[account(
        mut,
        constraint = market.authority == oracle.key() @ ErrorCode::UnauthorizedOracle
    )]
    pub market: Account<'info, Market>,
    pub oracle: Signer<'info>,
}

#[derive(Accounts)]
pub struct Claim<'info> {
    #[account(
        mut,
        seeds = [b"bet", bettor.key().as_ref(), market.key().as_ref()],
        bump = bet.bump,
        has_one = bettor @ ErrorCode::Unauthorized,
        has_one = market @ ErrorCode::InvalidParameter
    )]
    pub bet: Account<'info, Bet>,
    #[account(
        seeds = [b"market", market.authority.as_ref(), &market.market_id.to_le_bytes()],
        bump = market.bump
    )]
    pub market: Account<'info, Market>,
    #[account(
        mut,
        seeds = [b"vault", market.key().as_ref()],
        bump = market_vault.bump
    )]
    pub market_vault: Account<'info, MarketVault>,
    #[account(
        seeds = [b"config", config.admin.as_ref()],
        bump = config.bump
    )]
    pub config: Account<'info, GlobalConfig>,
    #[account(mut)]
    pub bettor: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct WithdrawFees<'info> {
    #[account(
        seeds = [b"config", config.admin.as_ref()],
        bump = config.bump,
        has_one = admin @ ErrorCode::Unauthorized
    )]
    pub config: Account<'info, GlobalConfig>,
    #[account(
        mut,
        seeds = [b"fee_vault"],
        bump
    )]
    pub fee_vault: SystemAccount<'info>,
    #[account(mut)]
    /// CHECK: Validated through admin authority
    pub to: UncheckedAccount<'info>,
    pub admin: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// Events
#[event]
pub struct GlobalConfigInitialized {
    pub admin: Pubkey,
    pub fee_bps: u16,
}

#[event]
pub struct MarketCreated {
    pub market: Pubkey,
    pub authority: Pubkey,
    pub market_id: u64,
    pub spread_bps: i32,
    pub lock_time: i64,
}

#[event]
pub struct BetPlaced {
    pub market: Pubkey,
    pub bettor: Pubkey,
    pub side: u8,
    pub stake: u64,
}

#[event]
pub struct MarketSettled {
    pub market: Pubkey,
    pub home_score: i32,
    pub away_score: i32,
    pub winner_side: u8,
    pub push: bool,
}

#[event]
pub struct BetClaimed {
    pub market: Pubkey,
    pub bettor: Pubkey,
    pub amount: u64,
}

#[event]
pub struct FeesWithdrawn {
    pub to: Pubkey,
    pub amount: u64,
}

#[event]
pub struct Delegated {
    pub market: Pubkey,
}

#[event]
pub struct Committed {
    pub market: Pubkey,
}

#[event]
pub struct Undelegated {
    pub market: Pubkey,
}

// Errors
#[error_code]
pub enum ErrorCode {
    #[msg("System is paused")]
    Paused,
    #[msg("Betting window closed")]
    BettingWindowClosed,
    #[msg("Market already settled")]
    AlreadySettled,
    #[msg("Invalid spread value")]
    InvalidSpread,
    #[msg("Invalid stake amount")]
    InvalidStake,
    #[msg("Exposure limit exceeded")]
    ExposureExceeded,
    #[msg("Unauthorized oracle")]
    UnauthorizedOracle,
    #[msg("Nothing to claim")]
    NothingToClaim,
    #[msg("Bet already claimed")]
    AlreadyClaimed,
    #[msg("Market not settled yet")]
    SettlementNotReady,
    #[msg("Math overflow")]
    MathOverflow,
    #[msg("Unauthorized access")]
    Unauthorized,
    #[msg("Invalid parameter")]
    InvalidParameter,
    #[msg("Invalid fee")]
    InvalidFee,
}
