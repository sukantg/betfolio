"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { MarketCard } from "@/components/market-card"
import { MarketFilters } from "@/components/market-filters"
import { usePolymarketMarkets } from "@/hooks/use-polymarket-markets"
import { Button } from "@/components/ui/button"
import { useBetStore } from "@/lib/store"
import { ArrowRight, RefreshCw, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"

export default function HomePage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const legs = useBetStore((state) => state.legs)
  
  const { markets, loading, error, refetch, search: searchMarkets, isSearching } = usePolymarketMarkets(50)

  const filteredMarkets = useMemo(() => {
    return markets.filter((market) => {
      const matchesSearch =
        market.title.toLowerCase().includes(search.toLowerCase()) ||
        market.description.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === "all" || market.category === category
      return matchesSearch && matchesCategory
    })
  }, [markets, search, category])

  const handleSearchChange = async (searchQuery: string) => {
    setSearch(searchQuery)
    if (searchQuery.trim()) {
      await searchMarkets(searchQuery)
    } else {
      await refetch()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">AI-Powered Prediction Betfolios</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Build multi-bet prediction bundles with AI-optimized weights and maximize your expected value
          </p>
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-200">
              <strong>Live Data:</strong> Markets are fetched from Polymarket's official API. Fallback to sample data if API is unavailable.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <MarketFilters onSearchChange={handleSearchChange} onCategoryChange={setCategory} selectedCategory={category} />
              <Button
                variant="outline"
                size="sm"
                onClick={refetch}
                disabled={loading || isSearching}
                className="gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${(loading || isSearching) ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error}. Please try refreshing the page.
                </AlertDescription>
              </Alert>
            )}

            {loading ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="border rounded-lg p-6">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2 mb-4" />
                    <Skeleton className="h-8 w-16 mb-2" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  {filteredMarkets.map((market) => (
                    <MarketCard key={market.id} market={market} />
                  ))}
                </div>

                {filteredMarkets.length === 0 && !loading && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">
                      {search ? 'No markets found matching your search.' : 'No markets available at the moment.'}
                    </p>
                    {search && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearch('')
                          refetch()
                        }}
                        className="mt-4"
                      >
                        Clear Search
                      </Button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {legs.length > 0 && (
            <div className="lg:sticky lg:top-20 h-fit">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Your Betfolio ({legs.length} bets)</h3>
                <div className="space-y-3 mb-6">
                  {legs.map((leg) => (
                    <div key={leg.market.id} className="text-sm">
                      <p className="text-foreground font-medium line-clamp-1">{leg.market.title}</p>
                      <p className="text-muted-foreground text-xs">{leg.market.odds.toFixed(2)}x odds</p>
                    </div>
                  ))}
                </div>
                <Link href="/builder">
                  <Button className="w-full gap-2">
                    Build Betfolio
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
