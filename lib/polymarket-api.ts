import type { Market, PolymarketMarket, PolymarketApiResponse, PolymarketConfig } from './types'

// Polymarket API configuration
const POLYMARKET_CONFIG: PolymarketConfig = {
  apiUrl: '/api/polymarket',
  timeout: 10000
}

// GraphQL query to fetch active markets
const MARKETS_QUERY = `
  query GetMarkets($limit: Int, $offset: Int, $active: Boolean) {
    markets(
      limit: $limit
      offset: $offset
      where: {
        active: $active
        closed: false
        archived: false
      }
      orderBy: "volume"
      orderDirection: "desc"
    ) {
      id
      question
      description
      endDate
      volume
      outcomeTokens {
        id
        outcome
        price
      }
      resolutionSource
      active
      closed
      archived
      createdAt
      updatedAt
    }
  }
`

// Helper function to categorize markets based on question content
function categorizeMarket(question: string): "politics" | "crypto" | "macro" | "sports" {
  const lowerQuestion = question.toLowerCase()
  
  if (lowerQuestion.includes('election') || lowerQuestion.includes('president') || 
      lowerQuestion.includes('congress') || lowerQuestion.includes('senate') ||
      lowerQuestion.includes('governor') || lowerQuestion.includes('mayor') ||
      lowerQuestion.includes('vote') || lowerQuestion.includes('candidate')) {
    return 'politics'
  }
  
  if (lowerQuestion.includes('bitcoin') || lowerQuestion.includes('ethereum') ||
      lowerQuestion.includes('crypto') || lowerQuestion.includes('btc') ||
      lowerQuestion.includes('eth') || lowerQuestion.includes('solana') ||
      lowerQuestion.includes('defi') || lowerQuestion.includes('nft')) {
    return 'crypto'
  }
  
  if (lowerQuestion.includes('fed') || lowerQuestion.includes('federal reserve') ||
      lowerQuestion.includes('inflation') || lowerQuestion.includes('gdp') ||
      lowerQuestion.includes('recession') || lowerQuestion.includes('unemployment') ||
      lowerQuestion.includes('interest rate') || lowerQuestion.includes('economy')) {
    return 'macro'
  }
  
  if (lowerQuestion.includes('nba') || lowerQuestion.includes('nfl') ||
      lowerQuestion.includes('mlb') || lowerQuestion.includes('nhl') ||
      lowerQuestion.includes('championship') || lowerQuestion.includes('super bowl') ||
      lowerQuestion.includes('world cup') || lowerQuestion.includes('olympics') ||
      lowerQuestion.includes('lakers') || lowerQuestion.includes('warriors')) {
    return 'sports'
  }
  
  // Default to macro for economic/financial questions
  return 'macro'
}

// Convert Polymarket market to our Market interface
function transformPolymarketMarket(pmMarket: PolymarketMarket): Market {
  // Calculate odds from outcome token prices
  const yesToken = pmMarket.outcomeTokens.find(token => 
    token.outcome.toLowerCase().includes('yes') || 
    token.outcome.toLowerCase().includes('true')
  )
  
  const noToken = pmMarket.outcomeTokens.find(token => 
    token.outcome.toLowerCase().includes('no') || 
    token.outcome.toLowerCase().includes('false')
  )
  
  // Calculate odds (inverse of probability)
  const yesPrice = yesToken ? parseFloat(yesToken.price) : 0.5
  const odds = yesPrice > 0 ? 1 / yesPrice : 2.0
  
  // Calculate liquidity from volume
  const volume = parseFloat(pmMarket.volume) || 0
  const liquidity = volume * 1000000 // Convert to our scale
  
  return {
    id: pmMarket.id,
    title: pmMarket.question,
    category: categorizeMarket(pmMarket.question),
    odds: Math.round(odds * 10) / 10, // Round to 1 decimal
    liquidity: Math.round(liquidity),
    resolveDate: pmMarket.endDate,
    description: pmMarket.description || pmMarket.question,
    // Polymarket specific fields
    marketId: pmMarket.id,
    question: pmMarket.question,
    endDate: pmMarket.endDate,
    volume: volume,
    outcomeTokens: pmMarket.outcomeTokens.map(token => ({
      id: token.id,
      outcome: token.outcome,
      price: parseFloat(token.price)
    })),
    resolutionSource: pmMarket.resolutionSource,
    active: pmMarket.active,
    closed: pmMarket.closed,
    archived: pmMarket.archived
  }
}

// Fetch markets from Polymarket API
export async function fetchPolymarketMarkets(
  limit: number = 50,
  offset: number = 0
): Promise<Market[]> {
  try {
    const url = new URL(POLYMARKET_CONFIG.apiUrl, window.location.origin)
    url.searchParams.set('limit', limit.toString())
    url.searchParams.set('offset', offset.toString())

    const response = await fetch(url.toString(), {
      method: 'GET',
      signal: AbortSignal.timeout(POLYMARKET_CONFIG.timeout)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: PolymarketApiResponse = await response.json()
    
    if (!data.data?.markets) {
      throw new Error('Invalid API response structure')
    }

    // Transform Polymarket markets to our Market interface
    return data.data.markets.map(transformPolymarketMarket)
    
  } catch (error) {
    console.error('Error fetching Polymarket markets:', error)
    
    // Return empty array on error to prevent app crashes
    // In production, you might want to show a toast or error message
    return []
  }
}

// Fetch a specific market by ID
export async function fetchPolymarketMarket(marketId: string): Promise<Market | null> {
  try {
    const url = new URL(POLYMARKET_CONFIG.apiUrl, window.location.origin)
    url.searchParams.set('marketId', marketId)

    const response = await fetch(url.toString(), {
      method: 'GET',
      signal: AbortSignal.timeout(POLYMARKET_CONFIG.timeout)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    if (!data.data?.market) {
      return null
    }

    return transformPolymarketMarket(data.data.market)
    
  } catch (error) {
    console.error('Error fetching Polymarket market:', error)
    return null
  }
}

// Search markets by query
export async function searchPolymarketMarkets(
  query: string,
  limit: number = 20
): Promise<Market[]> {
  try {
    const url = new URL(POLYMARKET_CONFIG.apiUrl, window.location.origin)
    url.searchParams.set('search', query)
    url.searchParams.set('limit', limit.toString())

    const response = await fetch(url.toString(), {
      method: 'GET',
      signal: AbortSignal.timeout(POLYMARKET_CONFIG.timeout)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: PolymarketApiResponse = await response.json()
    
    if (!data.data?.markets) {
      return []
    }

    return data.data.markets.map(transformPolymarketMarket)
    
  } catch (error) {
    console.error('Error searching Polymarket markets:', error)
    return []
  }
}
