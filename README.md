# Betfolio — Your betting portfolio on Solana

> Built for the **Solana Colosseum (Cypherpunk) Hackathon** with **MagicBlock Ephemeral Rollups (ER)** integration.

Betfolio is a fast, modern web app built on **Solana** that introduces multiple styles of decentralized betting — **moneylines, spreads, parlays, and props** — on top of **Polymarket**.

For the MVP, Betfolio implements **Point Spread Betting**, where users bet on the **margin of victory** rather than just the winner.  
The platform delivers **instant on-chain settlements**, **low fees**, and **transparent wagers** through **MagicBlock’s Ephemeral Rollups**, enabling **sub-second confirmation** — a first for decentralized betting.

**Live Demo:** [https://betfolio-live.vercel.app/](https://betfolio-live.vercel.app/)

---

## What Is It?

Betfolio combines the thrill of **sports betting** with the **transparency of Web3**.  
It enables users to place bets, manage their **betting portfolios**, and experience **real-time results** — all executed via Solana smart contracts.

The platform personalizes user onboarding based on risk appetite and preferences to deliver an intelligent, data-driven experience:contentReference[oaicite:1]{index=1}.

---

## Why Use It?

### Real Sports Betting, Not Just Predictions

Unlike **Polymarket**, which focuses solely on binary “Yes/No” prediction markets, Betfolio introduces **true sports betting formats** — spreads, parlays, and props.

### Fully Transparent & Non-Custodial

All wagers, odds, and results are executed on-chain through a **Solana Anchor program**, meaning **no centralized control or hidden custody**.  
Users bet directly from their wallets, ensuring full transparency and ownership.

### Build Your Own Betting Portfolio

Just like managing a financial portfolio, users can **diversify bets across sports and risk levels**, track performance, and optimize strategies over time.

### Real-Time Settlement

With **MagicBlock Ephemeral Rollups**, bets confirm and settle in under a second, creating a **real-time, interactive betting experience**:contentReference[oaicite:2]{index=2}.

---

## MVP Features

| Feature                                  | Description                                                                                                                                                    |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Point Spread Betting (Core Use Case)** | Users bet on the margin of victory rather than just the winner — favorites must win by more than the spread, underdogs can lose by fewer points and still win. |
| **Real-Time Betting Execution**          | Instant bet processing through MagicBlock’s Ephemeral Rollups (ER) for sub-second confirmations.                                                               |
| **On-Chain Wagering & Settlement**       | All wagers and payouts handled entirely on-chain through a transparent Anchor program with non-custodial escrow.                                               |
| **Personalized Onboarding**              | Quick questionnaire tailors recommendations based on risk level and sport preferences.                                                                         |
| **Audit & Transparency Layer**           | Every bet, market, and payout verifiable on-chain, with dashboards showing live ER session commits:contentReference[oaicite:3]{index=3}.                       |

---

## Future Features

- **Parlay & Multi-Leg Bets:** Combine multiple bets into one ticket for higher potential payouts.
- **AI-Powered Bet Allocation:** Suggest optimal bet allocations based on historical data and user risk profile.
- **Private Bets with PER:** Use **MagicBlock Private Ephemeral Rollups** for privacy-preserving betting.
- **Cross-Chain Markets:** Integrate **LayerZero** to enable betting across Solana, Base, Polygon, and Avalanche.

---

## Tech Stack

| Layer               | Tools                                                                               |
| ------------------- | ----------------------------------------------------------------------------------- |
| **Frontend**        | Next.js + Tailwind                                                                  |
| **Smart Contract**  | Anchor (Rust)                                                                       |
| **Blockchain**      | Solana                                                                              |
| **Real-Time Layer** | MagicBlock Ephemeral Rollups                                                        |
| **Data Source**     | Polymarket API                                                                      |
| **Infra & Tools**   | Vercel, GitHub, Visual Studio Code, TryNoah.ai:contentReference[oaicite:7]{index=7} |

---

## How It Works

1. **Create Market:** Admin initializes market (e.g., _Lakers vs Warriors_) with a spread and cutoff time.
2. **Delegate to ER:** Market state is delegated to **MagicBlock’s Ephemeral Rollup** for real-time updates.
3. **Place Bets:** Users bet on either side; transactions confirm instantly under `#[ephemeral]`.
4. **Commit:** The ER session syncs and commits results back to Solana.
5. **Settle:** Oracle posts scores; contract calculates winners and auto-pays via escrow.

---

## Installation (Local Dev)

### Requirements

- Solana `v2.1.21`
- Rust `v1.82.0`
- Anchor `v0.31.1`

### Setup

```bash
git clone https://github.com/sukantg/betfolio
cd betfolio
anchor build
solana-test-validator
anchor deploy
```
