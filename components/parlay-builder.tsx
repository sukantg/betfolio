"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Trash2, TrendingUp, DollarSign, Percent, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"

interface Market {
  id: string
  question: string
  description: string
  outcomes: string[]
  volume: number
  liquidity: number
  endDate: string
  category: string
  selectedOutcome?: string
}

interface ParlaySelection {
  market: Market
  selectedOutcome: string
  odds: number
}

export function ParlayBuilder() {
  const [parlaySelections, setParlaySelections] = useState<ParlaySelection[]>([])
  const [betAmount, setBetAmount] = useState<string>("100")
  const { connected, publicKey } = useWallet()
  const { setVisible } = useWalletModal()
  const { toast } = useToast()

  function loadParlay() {
    const savedMarkets = JSON.parse(localStorage.getItem("parlay") || "[]")
    if (savedMarkets.length > 0) {
      const selections = savedMarkets.map((market: Market) => ({
        market,
        selectedOutcome: market.selectedOutcome || market.outcomes[0],
        odds: generateMockOdds(),
      }))
      setParlaySelections(selections)
    } else {
      setParlaySelections([])
    }
  }

  useEffect(() => {
    // Initial load
    loadParlay()

    const handleParlayUpdate = () => {
      loadParlay()
    }

    const handleWalletChange = () => {
      // Force re-render when wallet connects/disconnects
      loadParlay()
    }

    window.addEventListener("parlayUpdated", handleParlayUpdate)
    window.addEventListener("storage", handleParlayUpdate)
    window.addEventListener("walletConnected", handleWalletChange)
    window.addEventListener("walletDisconnected", handleWalletChange)

    return () => {
      window.removeEventListener("parlayUpdated", handleParlayUpdate)
      window.removeEventListener("storage", handleParlayUpdate)
      window.removeEventListener("walletConnected", handleWalletChange)
      window.removeEventListener("walletDisconnected", handleWalletChange)
    }
  }, [])

  function generateMockOdds() {
    // Generate realistic odds between 1.2 and 3.5
    return Number((Math.random() * 2.3 + 1.2).toFixed(2))
  }

  function removeFromParlay(marketId: string) {
    const updatedSelections = parlaySelections.filter((s) => s.market.id !== marketId)
    setParlaySelections(updatedSelections)

    // Update localStorage
    const updatedMarkets = updatedSelections.map((s) => s.market)
    localStorage.setItem("parlay", JSON.stringify(updatedMarkets))

    window.dispatchEvent(new Event("parlayUpdated"))

    toast({
      title: "Removed",
      description: "Market removed from parlay.",
    })
  }

  function updateOutcome(marketId: string, outcome: string) {
    setParlaySelections(
      parlaySelections.map((s) => (s.market.id === marketId ? { ...s, selectedOutcome: outcome } : s)),
    )
  }

  // Calculate combined odds (multiply all individual odds)
  const combinedOdds = parlaySelections.reduce((acc, selection) => acc * selection.odds, 1)
  const potentialPayout = Number(betAmount) * combinedOdds
  const potentialProfit = potentialPayout - Number(betAmount)

  // Calculate implied probability
  const impliedProbability = parlaySelections.length > 0 ? (1 / combinedOdds) * 100 : 0

  async function placeParlayBet() {
    if (!connected || !publicKey) {
      setVisible(true)
      return
    }

    if (parlaySelections.length === 0) {
      toast({
        title: "No Selections",
        description: "Add markets to your parlay before placing a bet.",
        variant: "destructive",
      })
      return
    }

    if (!betAmount || Number(betAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid bet amount.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/parlay/place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selections: parlaySelections,
          betAmount: Number(betAmount),
          combinedOdds,
          potentialPayout,
          walletAddress: publicKey.toString(),
        }),
      })

      if (!response.ok) throw new Error("Failed to place bet")

      toast({
        title: "Parlay Placed!",
        description: `Your ${parlaySelections.length}-leg parlay has been placed.`,
      })

      setParlaySelections([])
      localStorage.removeItem("parlay")
      setBetAmount("100")

      window.dispatchEvent(new Event("parlayUpdated"))
    } catch (error) {
      console.error("[v0] Error placing parlay:", error)
      toast({
        title: "Error",
        description: "Failed to place parlay. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Parlay Selections */}
      <div className="lg:col-span-2 space-y-4">
        {parlaySelections.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No markets in your parlay yet.</p>
            <Link href="/markets">
              <Button>Browse Markets</Button>
            </Link>
          </Card>
        ) : (
          parlaySelections.map((selection, index) => (
            <Card key={selection.market.id} className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        Leg {index + 1}
                      </Badge>
                      <Badge variant="outline" className="text-xs capitalize">
                        {selection.market.category}
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-1 text-balance">{selection.market.question}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 text-pretty">
                      {selection.market.description}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromParlay(selection.market.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Select Outcome:</p>
                  <div className="flex gap-2">
                    {selection.market.outcomes.map((outcome) => (
                      <Button
                        key={outcome}
                        variant={selection.selectedOutcome === outcome ? "default" : "outline"}
                        size="sm"
                        onClick={() => updateOutcome(selection.market.id, outcome)}
                        className="flex-1"
                      >
                        {outcome}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-sm text-muted-foreground">Odds</span>
                  <span className="font-semibold">{selection.odds.toFixed(2)}x</span>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Bet Slip */}
      <div className="lg:col-span-1">
        <Card className="p-6 sticky top-24">
          <h2 className="text-xl font-bold mb-6">Bet Slip</h2>

          <div className="space-y-6">
            {/* Stats */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Legs</span>
                <span className="font-semibold">{parlaySelections.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Combined Odds</span>
                <span className="font-semibold text-accent">{combinedOdds.toFixed(2)}x</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Percent className="h-3 w-3" />
                  Win Probability
                </span>
                <span className="font-semibold">{impliedProbability.toFixed(1)}%</span>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <label className="text-sm font-medium mb-2 block">Bet Amount (USDC)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  className="pl-10"
                  placeholder="100"
                  min="0"
                  step="10"
                />
              </div>
            </div>

            {parlaySelections.length > 0 && Number(betAmount) > 0 && (
              <div className="space-y-2 p-4 bg-accent/10 rounded-lg border border-accent/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Potential Payout</span>
                  <span className="font-bold text-lg">${potentialPayout.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-accent">
                  <span className="text-sm flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Potential Profit
                  </span>
                  <span className="font-semibold">${potentialProfit.toFixed(2)}</span>
                </div>
              </div>
            )}

            <Button
              onClick={placeParlayBet}
              disabled={parlaySelections.length === 0 || !betAmount || Number(betAmount) <= 0}
              className="w-full gap-2"
              size="lg"
            >
              Place Parlay Bet
              <ArrowRight className="h-4 w-4" />
            </Button>

            {!connected && (
              <p className="text-xs text-center text-muted-foreground">Connect your Solana wallet to place bets</p>
            )}
            {parlaySelections.length === 0 && connected && (
              <p className="text-xs text-center text-muted-foreground">Add markets to start building your parlay</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
