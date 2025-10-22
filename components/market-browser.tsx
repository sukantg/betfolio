"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, TrendingUp, Check } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

interface Market {
  id: string
  question: string
  description: string
  outcomes: string[]
  volume: number
  liquidity: number
  endDate: string
  category: string
  image?: string
  selectedOutcome?: string
}

export function MarketBrowser() {
  const [markets, setMarkets] = useState<Market[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [addedMarketIds, setAddedMarketIds] = useState<Set<string>>(new Set())
  const [selectedOutcomes, setSelectedOutcomes] = useState<Record<string, string>>({})
  const { toast } = useToast()

  const MAX_PARLAY_SIZE = 5

  useEffect(() => {
    fetchMarkets()
    loadExistingParlay()
  }, [])

  useEffect(() => {
    const handleParlayUpdate = () => {
      loadExistingParlay()
    }
    window.addEventListener("parlayUpdated", handleParlayUpdate)
    return () => window.removeEventListener("parlayUpdated", handleParlayUpdate)
  }, [])

  function loadExistingParlay() {
    const existingParlay = JSON.parse(localStorage.getItem("parlay") || "[]")
    const ids = new Set(existingParlay.map((m: Market) => m.id))
    setAddedMarketIds(ids)
    const outcomes: Record<string, string> = {}
    existingParlay.forEach((m: Market) => {
      if (m.selectedOutcome) {
        outcomes[m.id] = m.selectedOutcome
      }
    })
    setSelectedOutcomes(outcomes)
  }

  async function fetchMarkets() {
    try {
      setLoading(true)
      const response = await fetch("/api/markets")
      const data = await response.json()
      setMarkets(data.markets)
    } catch (error) {
      console.error("[v0] Error fetching markets:", error)
      toast({
        title: "Error",
        description: "Failed to load markets. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const categories = ["all", "politics", "sports", "crypto", "entertainment", "science"]

  const filteredMarkets = markets.filter((market) => {
    const matchesSearch = market.question.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || market.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  function selectOutcome(marketId: string, outcome: string) {
    if (selectedOutcomes[marketId]) {
      return
    }
    setSelectedOutcomes((prev) => ({
      ...prev,
      [marketId]: outcome,
    }))
  }

  function toggleParlay(market: Market) {
    const existingParlay = JSON.parse(localStorage.getItem("parlay") || "[]")
    const isInParlay = existingParlay.some((m: Market) => m.id === market.id)

    if (isInParlay) {
      const updatedParlay = existingParlay.filter((m: Market) => m.id !== market.id)
      localStorage.setItem("parlay", JSON.stringify(updatedParlay))

      setAddedMarketIds((prev) => {
        const newSet = new Set(prev)
        newSet.delete(market.id)
        return newSet
      })

      setSelectedOutcomes((prev) => {
        const newOutcomes = { ...prev }
        delete newOutcomes[market.id]
        return newOutcomes
      })

      window.dispatchEvent(new Event("parlayUpdated"))

      toast({
        title: "Removed from Parlay",
        description: `${market.question} removed from your parlay.`,
      })
    } else {
      if (existingParlay.length >= MAX_PARLAY_SIZE) {
        toast({
          title: "Parlay Limit Reached",
          description: `You can only add up to ${MAX_PARLAY_SIZE} markets to a parlay.`,
          variant: "destructive",
        })
        return
      }

      setAddedMarketIds((prev) => new Set([...prev, market.id]))

      const marketWithOutcome = {
        ...market,
        selectedOutcome: selectedOutcomes[market.id],
      }
      existingParlay.push(marketWithOutcome)
      localStorage.setItem("parlay", JSON.stringify(existingParlay))

      window.dispatchEvent(new Event("parlayUpdated"))

      toast({
        title: "Added to Parlay",
        description: `${market.question} added to your parlay.`,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Parlay:{" "}
          <span className="font-semibold text-foreground">
            {addedMarketIds.size}/{MAX_PARLAY_SIZE}
          </span>{" "}
          markets selected
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search markets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-4 w-3/4 mb-4" />
              <Skeleton className="h-3 w-full mb-2" />
              <Skeleton className="h-3 w-2/3 mb-4" />
              <div className="flex gap-2 mb-4">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-10 w-full" />
            </Card>
          ))}
        </div>
      ) : filteredMarkets.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No markets found matching your criteria.</p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredMarkets.map((market) => {
            const isAdded = addedMarketIds.has(market.id)
            const isDisabled = !isAdded && addedMarketIds.size >= MAX_PARLAY_SIZE
            const hasSelectedOutcome = !!selectedOutcomes[market.id]

            return (
              <Card key={market.id} className="p-6 hover:border-accent transition-colors">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold leading-tight text-balance">{market.question}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 text-pretty">{market.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="capitalize">
                      {market.category}
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <TrendingUp className="h-3 w-3" />${(market.volume / 1000).toFixed(1)}k
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Select Outcome:</p>
                    <div className="flex gap-2">
                      {market.outcomes.map((outcome) => (
                        <Button
                          key={outcome}
                          variant={selectedOutcomes[market.id] === outcome ? "default" : "outline"}
                          size="sm"
                          onClick={() => selectOutcome(market.id, outcome)}
                          className="flex-1"
                          disabled={isAdded || !!selectedOutcomes[market.id]}
                        >
                          {outcome}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => toggleParlay(market)}
                    disabled={isDisabled || (!isAdded && !hasSelectedOutcome)}
                    className={`w-full gap-2 transition-all duration-300 ${
                      isAdded ? "bg-green-600 hover:bg-green-700" : ""
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="h-4 w-4" />
                        Bet Added
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        Add Bet
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
