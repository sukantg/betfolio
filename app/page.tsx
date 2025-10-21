"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { MarketCard } from "@/components/market-card"
import { MarketFilters } from "@/components/market-filters"
import { mockMarkets } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { useBetStore } from "@/lib/store"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const legs = useBetStore((state) => state.legs)

  const filteredMarkets = useMemo(() => {
    return mockMarkets.filter((market) => {
      const matchesSearch =
        market.title.toLowerCase().includes(search.toLowerCase()) ||
        market.description.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === "all" || market.category === category
      return matchesSearch && matchesCategory
    })
  }, [search, category])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">AI-Powered Prediction Betfolios</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Build multi-bet prediction bundles with AI-optimized weights and maximize your expected value
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          <div className="space-y-6">
            <MarketFilters onSearchChange={setSearch} onCategoryChange={setCategory} selectedCategory={category} />

            <div className="grid sm:grid-cols-2 gap-4">
              {filteredMarkets.map((market) => (
                <MarketCard key={market.id} market={market} />
              ))}
            </div>

            {filteredMarkets.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No markets found matching your criteria</p>
              </div>
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
