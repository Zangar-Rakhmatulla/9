pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("AUov6zyDFS4R86PtEMxeikWXfXAc5j6pHxXtZcPkjBRv");

#[program]
pub mod liquidity_vault {
    use super::*;

    pub fn initialize_vault(ctx: Context<InitializeVault>) -> Result<()> {
        crate::instructions::initialize_vault::handle_initialize_vault(ctx)
    }

    pub fn open_position(ctx: Context<OpenPosition>) -> Result<()> {
        crate::instructions::open_position::handle_open_position(ctx)
    }
}
