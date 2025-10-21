import { useState, useEffect, useCallback } from 'react'
import type { Market } from '@/lib/types'
import { fetchPolymarketMarkets, searchPolymarketMarkets } from '@/lib/polymarket-api'

interface UsePolymarketMarketsReturn {
  markets: Market[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  search: (query: string) => Promise<void>
  isSearching: boolean
}

export function usePolymarketMarkets(limit: number = 50): UsePolymarketMarketsReturn {
  const [markets, setMarkets] = useState<Market[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  const fetchMarkets = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const fetchedMarkets = await fetchPolymarketMarkets(limit)
      setMarkets(fetchedMarkets)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch markets'
      setError(errorMessage)
      console.error('Error fetching markets:', err)
    } finally {
      setLoading(false)
    }
  }, [limit])

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      await fetchMarkets()
      return
    }

    try {
      setIsSearching(true)
      setError(null)
      const searchResults = await searchPolymarketMarkets(query, 20)
      setMarkets(searchResults)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search markets'
      setError(errorMessage)
      console.error('Error searching markets:', err)
    } finally {
      setIsSearching(false)
    }
  }, [fetchMarkets])

  const refetch = useCallback(async () => {
    await fetchMarkets()
  }, [fetchMarkets])

  useEffect(() => {
    fetchMarkets()
  }, [fetchMarkets])

  return {
    markets,
    loading,
    error,
    refetch,
    search,
    isSearching
  }
}
