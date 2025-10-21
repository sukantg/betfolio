export interface Market {
  id: string
  title: string
  category: "politics" | "crypto" | "macro" | "sports"
  odds: number
  liquidity: number
  resolveDate: string
  description: string
  // Polymarket specific fields
  marketId?: string
  question?: string
  endDate?: string
  volume?: number
  outcomeTokens?: {
    id: string
    outcome: string
    price: number
  }[]
  resolutionSource?: string
  active?: boolean
  closed?: boolean
  archived?: boolean
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

// Polymarket API Response Types
export interface PolymarketMarket {
  id: string
  question: string
  description: string
  endDate: string
  volume: string
  outcomeTokens: {
    id: string
    outcome: string
    price: string
  }[]
  resolutionSource: string
  active: boolean
  closed: boolean
  archived: boolean
  createdAt: string
  updatedAt: string
}

export interface PolymarketApiResponse {
  data: {
    markets: PolymarketMarket[]
  }
}

export interface PolymarketConfig {
  apiUrl: string
  timeout: number
}
