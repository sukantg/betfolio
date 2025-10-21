import type { Market, PolymarketMarket } from './types'

// Polymarket API configuration based on official documentation
const POLYMARKET_GAMMA_URL = 'https://gamma-api.polymarket.com'
const POLYMARKET_DATA_URL = 'https://data-api.polymarket.com'

// Fetch markets using Polymarket's Gamma API
export async function fetchPolymarketMarketsReal(
  limit: number = 50,
  offset: number = 0
): Promise<Market[]> {
  try {
    // Try Gamma API first (recommended for markets)
    const response = await fetch(`${POLYMARKET_GAMMA_URL}/markets?limit=${limit}&offset=${offset}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Betfolio-App/1.0'
      },
      signal: AbortSignal.timeout(15000)
    })

    if (response.ok) {
      const marketsData = await response.json()
      return transformMarketsData(marketsData)
    }

    // Fallback to Data API
    const dataResponse = await fetch(`${POLYMARKET_DATA_URL}/markets?limit=${limit}&offset=${offset}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Betfolio-App/1.0'
      },
      signal: AbortSignal.timeout(15000)
    })

    if (dataResponse.ok) {
      const marketsData = await dataResponse.json()
      return transformMarketsData(marketsData)
    }

    throw new Error(`API request failed with status: ${response.status}`)
  } catch (error) {
    console.error('Error fetching from Polymarket APIs:', error)
    throw error
  }
}

// Search markets using Polymarket's search endpoint
export async function searchPolymarketMarketsReal(
  query: string,
  limit: number = 20
): Promise<Market[]> {
  try {
    // Try Gamma API search first
    const response = await fetch(`${POLYMARKET_GAMMA_URL}/search?q=${encodeURIComponent(query)}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Betfolio-App/1.0'
      },
      signal: AbortSignal.timeout(15000)
    })

    if (response.ok) {
      const searchData = await response.json()
      return transformMarketsData(searchData.markets || searchData)
    }

    // Fallback to Data API search
    const dataResponse = await fetch(`${POLYMARKET_DATA_URL}/search?q=${encodeURIComponent(query)}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Betfolio-App/1.0'
      },
      signal: AbortSignal.timeout(15000)
    })

    if (dataResponse.ok) {
      const searchData = await dataResponse.json()
      return transformMarketsData(searchData.markets || searchData)
    }

    throw new Error(`Search request failed with status: ${response.status}`)
  } catch (error) {
    console.error('Error searching Polymarket:', error)
    throw error
  }
}

// Transform Polymarket API response to our Market format
function transformMarketsData(apiData: any[]): Market[] {
  if (!Array.isArray(apiData)) {
    console.warn('API response is not an array:', apiData)
    return []
  }

  return apiData.map((market: any) => {
    // Calculate odds from outcome tokens or prices
    let odds = 2.0 // Default odds
    let yesPrice = 0.5
    let noPrice = 0.5

    if (market.outcome_tokens && market.outcome_tokens.length > 0) {
      const yesToken = market.outcome_tokens.find((token: any) => 
        token.outcome?.toLowerCase().includes('yes') || 
        token.outcome?.toLowerCase().includes('true')
      )
      const noToken = market.outcome_tokens.find((token: any) => 
        token.outcome?.toLowerCase().includes('no') || 
        token.outcome?.toLowerCase().includes('false')
      )
      
      yesPrice = yesToken ? parseFloat(yesToken.price || '0.5') : 0.5
      noPrice = noToken ? parseFloat(noToken.price || '0.5') : 0.5
      odds = yesPrice > 0 ? 1 / yesPrice : 2.0
    } else if (market.yes_price && market.no_price) {
      yesPrice = parseFloat(market.yes_price)
      noPrice = parseFloat(market.no_price)
      odds = yesPrice > 0 ? 1 / yesPrice : 2.0
    }

    // Calculate liquidity from volume
    const volume = parseFloat(market.volume || market.total_volume || '0')
    const liquidity = volume * 1000000 // Convert to our scale

    // Categorize market based on question content
    const question = market.question || market.title || ''
    const category = categorizeMarket(question)

    return {
      id: market.id || market.market_id || `market-${Math.random()}`,
      title: question,
      category,
      odds: Math.round(odds * 10) / 10, // Round to 1 decimal
      liquidity: Math.round(liquidity),
      resolveDate: market.end_date || market.endDate || market.end_time || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Default to 30 days from now
      description: market.description || question,
      // Polymarket specific fields
      marketId: market.id || market.market_id,
      question: question,
      endDate: market.end_date || market.endDate || market.end_time,
      volume: volume,
      outcomeTokens: market.outcome_tokens?.map((token: any) => ({
        id: token.id || token.token_id,
        outcome: token.outcome || 'Unknown',
        price: parseFloat(token.price || '0.5')
      })) || [
        { id: 'yes', outcome: 'Yes', price: yesPrice },
        { id: 'no', outcome: 'No', price: noPrice }
      ],
      resolutionSource: market.resolution_source || market.resolutionSource || 'Unknown',
      active: market.active !== false,
      closed: market.closed || false,
      archived: market.archived || false
    }
  })
}

// Helper function to categorize markets based on question content
function categorizeMarket(question: string): "politics" | "crypto" | "macro" | "sports" {
  const lowerQuestion = question.toLowerCase()
  
  if (lowerQuestion.includes('election') || lowerQuestion.includes('president') || 
      lowerQuestion.includes('congress') || lowerQuestion.includes('senate') ||
      lowerQuestion.includes('governor') || lowerQuestion.includes('mayor') ||
      lowerQuestion.includes('vote') || lowerQuestion.includes('candidate') ||
      lowerQuestion.includes('democrat') || lowerQuestion.includes('republican') ||
      lowerQuestion.includes('trump') || lowerQuestion.includes('biden')) {
    return 'politics'
  }
  
  if (lowerQuestion.includes('bitcoin') || lowerQuestion.includes('ethereum') ||
      lowerQuestion.includes('crypto') || lowerQuestion.includes('btc') ||
      lowerQuestion.includes('eth') || lowerQuestion.includes('solana') ||
      lowerQuestion.includes('defi') || lowerQuestion.includes('nft') ||
      lowerQuestion.includes('blockchain') || lowerQuestion.includes('token') ||
      lowerQuestion.includes('coin') || lowerQuestion.includes('sol')) {
    return 'crypto'
  }
  
  if (lowerQuestion.includes('fed') || lowerQuestion.includes('federal reserve') ||
      lowerQuestion.includes('inflation') || lowerQuestion.includes('gdp') ||
      lowerQuestion.includes('recession') || lowerQuestion.includes('unemployment') ||
      lowerQuestion.includes('interest rate') || lowerQuestion.includes('economy') ||
      lowerQuestion.includes('rate') || lowerQuestion.includes('dollar') ||
      lowerQuestion.includes('market') || lowerQuestion.includes('stock')) {
    return 'macro'
  }
  
  if (lowerQuestion.includes('nba') || lowerQuestion.includes('nfl') ||
      lowerQuestion.includes('mlb') || lowerQuestion.includes('nhl') ||
      lowerQuestion.includes('championship') || lowerQuestion.includes('super bowl') ||
      lowerQuestion.includes('world cup') || lowerQuestion.includes('olympics') ||
      lowerQuestion.includes('lakers') || lowerQuestion.includes('warriors') ||
      lowerQuestion.includes('football') || lowerQuestion.includes('basketball') ||
      lowerQuestion.includes('baseball') || lowerQuestion.includes('hockey') ||
      lowerQuestion.includes('soccer') || lowerQuestion.includes('tennis')) {
    return 'sports'
  }
  
  // Default to macro for economic/financial questions
  return 'macro'
}
