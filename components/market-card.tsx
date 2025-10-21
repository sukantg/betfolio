"use client"

import type { Market } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, TrendingUp } from "lucide-react"
import { useBetStore } from "@/lib/store"

interface MarketCardProps {
  market: Market
}

export function MarketCard({ market }: MarketCardProps) {
  const addLeg = useBetStore((state) => state.addLeg)
  const legs = useBetStore((state) => state.legs)
  const isAdded = legs.some((leg) => leg.market.id === market.id)

  const formatLiquidity = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    }
    return `$${(value / 1000).toFixed(0)}K`
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "politics":
        return "bg-chart-3/20 text-chart-3 border-chart-3/30"
      case "crypto":
        return "bg-chart-1/20 text-chart-1 border-chart-1/30"
      case "macro":
        return "bg-chart-2/20 text-chart-2 border-chart-2/30"
      case "sports":
        return "bg-chart-4/20 text-chart-4 border-chart-4/30"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="p-4 hover:border-primary/50 transition-all group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <Badge variant="outline" className={`mb-2 ${getCategoryColor(market.category)}`}>
            {market.category}
          </Badge>
          <h3 className="font-semibold text-foreground leading-snug mb-1 text-balance">{market.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{market.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Odds</p>
            <p className="text-lg font-bold text-primary">{market.odds.toFixed(2)}x</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Liquidity</p>
            <p className="text-sm font-semibold text-foreground">{formatLiquidity(market.liquidity)}</p>
          </div>
        </div>

        <Button size="sm" onClick={() => addLeg(market)} disabled={isAdded} className="gap-2">
          {isAdded ? (
            <>
              <TrendingUp className="w-4 h-4" />
              Added
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Add Bet
            </>
          )}
        </Button>
      </div>
    </Card>
  )
}
