import { NextResponse } from "next/server"

// Mock data for development - in production, this would fetch from Polymarket's Gamma API
const mockMarkets = [
  {
    id: "1",
    question: "Will Bitcoin reach $150k by end of 2025?",
    description:
      "This market resolves YES if Bitcoin (BTC) reaches or exceeds $150,000 USD at any point before December 31, 2025, 11:59 PM ET.",
    outcomes: ["Yes", "No"],
    volume: 2500000,
    liquidity: 500000,
    endDate: "2025-12-31",
    category: "crypto",
  },
  {
    id: "2",
    question: "Will the Democrats win the 2026 midterm elections?",
    description:
      "This market resolves YES if Democrats win control of both the House and Senate in the 2026 midterm elections.",
    outcomes: ["Yes", "No"],
    volume: 5000000,
    liquidity: 1000000,
    endDate: "2026-11-03",
    category: "politics",
  },
  {
    id: "3",
    question: "Will Ethereum merge to Proof of Stake succeed?",
    description:
      "This market resolves YES if Ethereum successfully transitions to Proof of Stake without major issues.",
    outcomes: ["Yes", "No"],
    volume: 1800000,
    liquidity: 400000,
    endDate: "2025-06-30",
    category: "crypto",
  },
  {
    id: "4",
    question: "Will the Lakers win the 2025 NBA Championship?",
    description: "This market resolves YES if the Los Angeles Lakers win the 2025 NBA Championship.",
    outcomes: ["Yes", "No"],
    volume: 3200000,
    liquidity: 650000,
    endDate: "2025-06-30",
    category: "sports",
  },
  {
    id: "5",
    question: "Will AI achieve AGI by 2030?",
    description: "This market resolves YES if artificial general intelligence (AGI) is achieved by December 31, 2030.",
    outcomes: ["Yes", "No"],
    volume: 4500000,
    liquidity: 900000,
    endDate: "2030-12-31",
    category: "science",
  },
  {
    id: "6",
    question: "Will the next Marvel movie gross over $1B?",
    description:
      "This market resolves YES if the next Marvel Cinematic Universe film grosses over $1 billion worldwide.",
    outcomes: ["Yes", "No"],
    volume: 1200000,
    liquidity: 250000,
    endDate: "2025-12-31",
    category: "entertainment",
  },
  {
    id: "7",
    question: "Will Trump run for president in 2028?",
    description:
      "This market resolves YES if Donald Trump officially announces a presidential campaign for the 2028 election.",
    outcomes: ["Yes", "No"],
    volume: 6000000,
    liquidity: 1200000,
    endDate: "2028-01-01",
    category: "politics",
  },
  {
    id: "8",
    question: "Will Solana flip Ethereum by market cap?",
    description:
      "This market resolves YES if Solana's market capitalization exceeds Ethereum's at any point before 2026.",
    outcomes: ["Yes", "No"],
    volume: 2800000,
    liquidity: 550000,
    endDate: "2025-12-31",
    category: "crypto",
  },
  {
    id: "9",
    question: "Will the Chiefs win Super Bowl LX?",
    description: "This market resolves YES if the Kansas City Chiefs win Super Bowl LX in 2026.",
    outcomes: ["Yes", "No"],
    volume: 3500000,
    liquidity: 700000,
    endDate: "2026-02-08",
    category: "sports",
  },
]

export async function GET() {
  // In production, fetch from Polymarket's Gamma API
  // const response = await fetch('https://gamma-api.polymarket.com/markets')
  // const data = await response.json()

  return NextResponse.json({ markets: mockMarkets })
}
