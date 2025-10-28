use anchor_lang::prelude::*;

#[error_code]
pub enum PointSpreadError {
    #[msg("Invalid market state")]
    InvalidMarketState,
}
