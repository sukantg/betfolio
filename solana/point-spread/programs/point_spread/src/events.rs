use anchor_lang::prelude::*;

#[event]
pub struct BetPlaced {
    pub user: Pubkey,
}
