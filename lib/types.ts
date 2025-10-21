export interface Market {
  id: string
  title: string
  category: "politics" | "crypto" | "macro" | "sports"
  odds: number
  liquidity: number
  resolveDate: string
  description: string
}

export interface BetLeg {
  market: Market
  weight: number
  outcome?: "won" | "lost" | "pending"
}

export interface Parlay {
  id: string
  legs: BetLeg[]
  totalBet: number
  status: "active" | "settled" | "pending"
  createdAt: string
  potentialPayout: number
  allWinMultiplier?: number // Bonus multiplier if all bets win (e.g., 1.1 = 10% bonus)
  actualPayout?: number // Actual payout received (for settled betfolios)
}

export interface AIRecommendation {
  weights: number[]
  expectedEV: number
  confidence: number
}
