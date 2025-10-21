"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { useBetStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, X, TrendingUp, DollarSign, Percent, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ConfirmationModal } from "@/components/confirmation-modal"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"

const ALL_WIN_BONUS_MULTIPLIER = 1.1 // 10% bonus if all bets win

export default function BuilderPage() {
  const { legs, removeLeg, updateWeight, clearLegs, applyAIWeights } = useBetStore()
  const [betAmount, setBetAmount] = useState("100")
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [aiRecommendation, setAiRecommendation] = useState<{
    expectedEV: number
    confidence: number
  } | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  const handleOptimizeWithAI = async () => {
    setIsOptimizing(true)
    try {
      const response = await fetch("/api/optimize-weights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          legs: legs.map((leg) => ({
            id: leg.market.id,
            title: leg.market.title,
            odds: leg.market.odds,
            liquidity: leg.market.liquidity,
            category: leg.market.category,
          })),
        }),
      })

      const data = await response.json()
      applyAIWeights(data.weights)
      setAiRecommendation({
        expectedEV: data.expectedEV,
        confidence: data.confidence,
      })
    } catch (error) {
      console.error("[v0] AI optimization failed:", error)
    } finally {
      setIsOptimizing(false)
    }
  }

  const handlePlaceParlay = async () => {
    setIsProcessing(true)
    try {
      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Betfolio Placed Successfully!",
        description: `Your ${legs.length}-bet betfolio has been submitted to the blockchain.`,
      })

      clearLegs()
      setShowConfirmation(false)
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Transaction Failed",
        description: "Failed to place betfolio. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const totalWeight = legs.reduce((sum, leg) => sum + leg.weight, 0)
  const isWeightValid = Math.abs(totalWeight - 100) < 0.01

  const calculatePotentialPayout = () => {
    if (!isWeightValid || !betAmount) return 0
    const amount = Number.parseFloat(betAmount)
    if (isNaN(amount)) return 0

    const weightedMultiplier = legs.reduce((product, leg) => {
      const legMultiplier = Math.pow(leg.market.odds, leg.weight / 100)
      return product * legMultiplier
    }, 1)

    // Apply all-win bonus multiplier
    return amount * weightedMultiplier * ALL_WIN_BONUS_MULTIPLIER
  }

  const potentialPayout = calculatePotentialPayout()
  const potentialProfit = potentialPayout - Number.parseFloat(betAmount || "0")

  if (legs.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">No Bets Selected</h2>
            <p className="text-muted-foreground mb-6">
              Add markets to your betfolio from the markets page to get started
            </p>
            <Link href="/">
              <Button>Browse Markets</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Build Your Betfolio</h1>
          <p className="text-muted-foreground">Adjust weights and optimize with AI to maximize your expected value</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Your Bets ({legs.length})</h2>
              <Button variant="outline" size="sm" onClick={clearLegs}>
                Clear All
              </Button>
            </div>

            {legs.map((leg) => (
              <Card key={leg.market.id} className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{leg.market.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {leg.market.odds.toFixed(2)}x
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />${(leg.market.liquidity / 1000000).toFixed(1)}M
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeLeg(leg.market.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">Weight Allocation</Label>
                    <span className="text-sm font-semibold text-foreground">{leg.weight.toFixed(1)}%</span>
                  </div>
                  <Slider
                    value={[leg.weight]}
                    onValueChange={([value]) => updateWeight(leg.market.id, value)}
                    max={100}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </Card>
            ))}

            <Button
              onClick={handleOptimizeWithAI}
              disabled={isOptimizing || legs.length < 2}
              className="w-full gap-2"
              size="lg"
            >
              <Sparkles className="w-4 h-4" />
              {isOptimizing ? "Optimizing..." : "Optimize Weights with AI"}
            </Button>

            {aiRecommendation && (
              <Alert className="bg-primary/10 border-primary/20">
                <Sparkles className="w-4 h-4 text-primary" />
                <AlertDescription className="text-foreground">
                  <div className="font-semibold mb-1">AI Optimization Complete</div>
                  <div className="text-sm text-muted-foreground">
                    Expected EV:{" "}
                    <span className="text-primary font-semibold">+{aiRecommendation.expectedEV.toFixed(2)}%</span> •
                    Confidence: {(aiRecommendation.confidence * 100).toFixed(0)}%
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div className="lg:sticky lg:top-20 h-fit">
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Betfolio Summary</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="bet-amount" className="text-sm text-muted-foreground mb-2 block">
                    Bet Amount (USDC)
                  </Label>
                  <Input
                    id="bet-amount"
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    placeholder="100"
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2 pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Weight</span>
                    <span className={`font-semibold ${isWeightValid ? "text-primary" : "text-destructive"}`}>
                      {totalWeight.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Number of Bets</span>
                    <span className="text-foreground font-semibold">{legs.length}</span>
                  </div>
                </div>

                {!isWeightValid && (
                  <Alert variant="destructive">
                    <AlertCircle className="w-4 h-4" />
                    <AlertDescription className="text-sm">
                      Weights must total 100%. Currently at {totalWeight.toFixed(1)}%
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Max Payout (All Win)</span>
                    <span className="text-xl font-bold text-foreground">${potentialPayout.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      Includes {((ALL_WIN_BONUS_MULTIPLIER - 1) * 100).toFixed(0)}% bonus
                    </span>
                    <span className="text-primary font-semibold">
                      +${((potentialPayout / ALL_WIN_BONUS_MULTIPLIER) * (ALL_WIN_BONUS_MULTIPLIER - 1)).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Potential Profit</span>
                    <span
                      className={`text-lg font-semibold ${potentialProfit > 0 ? "text-primary" : "text-muted-foreground"}`}
                    >
                      +${potentialProfit.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                disabled={!isWeightValid || !betAmount || Number.parseFloat(betAmount) <= 0}
                onClick={() => setShowConfirmation(true)}
              >
                <Percent className="w-4 h-4 mr-2" />
                Confirm Betfolio
              </Button>
            </Card>
          </div>
        </div>
      </main>

      <ConfirmationModal
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        legs={legs}
        betAmount={betAmount}
        potentialPayout={potentialPayout}
        allWinMultiplier={ALL_WIN_BONUS_MULTIPLIER}
        onConfirm={handlePlaceParlay}
        isProcessing={isProcessing}
      />
    </div>
  )
}
