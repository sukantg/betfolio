# Point Spread (Betfolio) — Anchor integration

This folder contains the Anchor program and TypeScript tests for the Point Spread market.

Files added:

- `programs/betfolio_spread/src/lib.rs` — Rust program (already present)
- `programs/betfolio_spread/Cargo.toml` — Cargo manifest for the program (added)
- `tests/betfolio_spread.ts` — TypeScript tests (already present)
- `Anchor.toml` — Anchor workspace config (added)
- `package.json` — helper scripts / dev deps for running tests (added)

Quick start (assumes you have `anchor`, `solana`, Rust toolchain and `npm`/`pnpm` installed):

1. Install CLI/tools if you haven't already:

   - Rust & cargo (rustup)
   - Solana CLI: https://docs.solana.com/cli/install-solana-cli-tools
   - Anchor CLI: https://book.anchor-lang.com

2. From this directory (`solana/point-spread`) install JS deps:

   npm install

3. Build the program and generate IDL:

   npm run build

4. Run tests (Anchor will start a local validator automatically):

   npm test

Notes:

- If you need to change the program id, update `Anchor.toml` under `[programs.localnet]`.
- Make sure your Solana CLI wallet exists (default `~/.config/solana/id.json`) or update the `wallet` path in `Anchor.toml`.
- If you run into permission or version mismatches, check your Anchor and Solana CLI versions and adjust `anchor` package/dev tooling accordingly.
