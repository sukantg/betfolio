use anchor_lang::prelude::*;

#[account]
pub struct Market {
    pub authority: Pubkey,
}

#[account]
pub struct Bet {
    pub user: Pubkey,
}
