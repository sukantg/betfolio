import { NextRequest, NextResponse } from 'next/server'
import { fetchPolymarketMarketsReal, searchPolymarketMarketsReal } from '@/lib/polymarket-real-api'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const search = searchParams.get('search') || ''

    // Try to fetch from real Polymarket API first
    try {
      let markets
      
      if (search) {
        markets = await searchPolymarketMarketsReal(search, limit)
      } else {
        markets = await fetchPolymarketMarketsReal(limit, 0)
      }

      return NextResponse.json({
        data: {
          markets: markets
        }
      })
    } catch (apiError) {
      console.log('Polymarket API not accessible, falling back to mock data:', apiError)
    }

    // Fallback to mock data if API is not accessible
    const mockMarkets = [
      {
        id: "0x1234567890abcdef",
        question: "Will Bitcoin reach $100,000 by end of 2024?",
        description: "Bitcoin price prediction market",
        endDate: "2024-12-31T23:59:59Z",
        volume: "1500000",
        outcomeTokens: [
          { id: "yes-token", outcome: "Yes", price: "0.45" },
          { id: "no-token", outcome: "No", price: "0.55" }
        ],
        resolutionSource: "CoinGecko",
        active: true,
        closed: false,
        archived: false,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-15T12:00:00Z"
      },
      {
        id: "0x2345678901bcdefg",
        question: "Will Trump win the 2024 Presidential Election?",
        description: "US Presidential Election prediction",
        endDate: "2024-11-05T23:59:59Z",
        volume: "2500000",
        outcomeTokens: [
          { id: "yes-token-2", outcome: "Yes", price: "0.52" },
          { id: "no-token-2", outcome: "No", price: "0.48" }
        ],
        resolutionSource: "Associated Press",
        active: true,
        closed: false,
        archived: false,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-15T12:00:00Z"
      },
      {
        id: "0x3456789012cdefgh",
        question: "Will Ethereum reach $5,000 by Q2 2024?",
        description: "Ethereum price prediction",
        endDate: "2024-06-30T23:59:59Z",
        volume: "800000",
        outcomeTokens: [
          { id: "yes-token-3", outcome: "Yes", price: "0.35" },
          { id: "no-token-3", outcome: "No", price: "0.65" }
        ],
        resolutionSource: "CoinGecko",
        active: true,
        closed: false,
        archived: false,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-15T12:00:00Z"
      },
      {
        id: "0x4567890123defghi",
        question: "Will the US enter a recession in 2024?",
        description: "Economic recession prediction",
        endDate: "2024-12-31T23:59:59Z",
        volume: "1200000",
        outcomeTokens: [
          { id: "yes-token-4", outcome: "Yes", price: "0.30" },
          { id: "no-token-4", outcome: "No", price: "0.70" }
        ],
        resolutionSource: "NBER",
        active: true,
        closed: false,
        archived: false,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-15T12:00:00Z"
      },
      {
        id: "0x5678901234efghij",
        question: "Will the Lakers win the 2024 NBA Championship?",
        description: "NBA Championship prediction",
        endDate: "2024-06-20T23:59:59Z",
        volume: "600000",
        outcomeTokens: [
          { id: "yes-token-5", outcome: "Yes", price: "0.15" },
          { id: "no-token-5", outcome: "No", price: "0.85" }
        ],
        resolutionSource: "NBA Official",
        active: true,
        closed: false,
        archived: false,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-15T12:00:00Z"
      },
      {
        id: "0x6789012345fghijk",
        question: "Will Solana reach $200 by end of 2024?",
        description: "Solana price prediction",
        endDate: "2024-12-31T23:59:59Z",
        volume: "900000",
        outcomeTokens: [
          { id: "yes-token-6", outcome: "Yes", price: "0.25" },
          { id: "no-token-6", outcome: "No", price: "0.75" }
        ],
        resolutionSource: "CoinGecko",
        active: true,
        closed: false,
        archived: false,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-15T12:00:00Z"
      },
      {
        id: "0x7890123456ghijkl",
        question: "Will the Fed cut rates below 4% in 2024?",
        description: "Federal Reserve interest rate prediction",
        endDate: "2024-12-31T23:59:59Z",
        volume: "1800000",
        outcomeTokens: [
          { id: "yes-token-7", outcome: "Yes", price: "0.40" },
          { id: "no-token-7", outcome: "No", price: "0.60" }
        ],
        resolutionSource: "Federal Reserve",
        active: true,
        closed: false,
        archived: false,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-15T12:00:00Z"
      },
      {
        id: "0x8901234567hijklm",
        question: "Will Democrats win the House majority in 2024?",
        description: "US House of Representatives prediction",
        endDate: "2024-11-05T23:59:59Z",
        volume: "1100000",
        outcomeTokens: [
          { id: "yes-token-8", outcome: "Yes", price: "0.38" },
          { id: "no-token-8", outcome: "No", price: "0.62" }
        ],
        resolutionSource: "Associated Press",
        active: true,
        closed: false,
        archived: false,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-15T12:00:00Z"
      }
    ]

    // Filter by search if provided
    let filteredMarkets = mockMarkets
    if (search) {
      filteredMarkets = mockMarkets.filter(market => 
        market.question.toLowerCase().includes(search.toLowerCase()) ||
        market.description.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Limit results
    const limitedMarkets = filteredMarkets.slice(0, limit)

    return NextResponse.json({
      data: {
        markets: limitedMarkets
      }
    })
  } catch (error) {
    console.error('Polymarket API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch markets from Polymarket' },
      { status: 500 }
    )
  }
}