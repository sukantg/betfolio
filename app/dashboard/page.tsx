"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, DollarSign, Clock, CheckCircle2, Loader2, XCircle, Sparkles } from "lucide-react"
import type { Parlay } from "@/lib/types"

const mockParlays: Parlay[] = [
  {
    id: "1",
    legs: [
      {
        market: {
          id: "1",
          title: "Trump wins 2024 Presidential Election",
          category: "politics",
          odds: 2.1,
          liquidity: 5200000,
          resolveDate: "2024-11-05",
          description: "Will Donald Trump win the 2024 US Presidential Election?",
        },
        weight: 40,
        outcome: "pending",
      },
      {
        market: {
          id: "2",
          title: "Bitcoin reaches $100k by EOY 2025",
          category: "crypto",
          odds: 1.8,
          liquidity: 3800000,
          resolveDate: "2025-12-31",
          description: "Will Bitcoin (BTC) reach $100,000 USD by end of 2025?",
        },
        weight: 35,
        outcome: "pending",
      },
      {
        market: {
          id: "5",
          title: "Lakers win NBA Championship 2025",
          category: "sports",
          odds: 3.2,
          liquidity: 1500000,
          resolveDate: "2025-06-20",
          description: "Will the LA Lakers win the 2025 NBA Championship?",
        },
        weight: 25,
        outcome: "pending",
      },
    ],
    totalBet: 250,
    status: "active",
    createdAt: "2024-10-15T10:30:00Z",
    potentialPayout: 687.5,
    allWinMultiplier: 1.1,
  },
  {
    id: "2",
    legs: [
      {
        market: {
          id: "3",
          title: "Ethereum reaches $5k by Q2 2025",
          category: "crypto",
          odds: 1.5,
          liquidity: 2100000,
          resolveDate: "2025-06-30",
          description: "Will Ethereum (ETH) reach $5,000 USD by Q2 2025?",
        },
        weight: 60,
        outcome: "pending",
      },
      {
        market: {
          id: "6",
          title: "Fed cuts rates below 3% in 2025",
          category: "macro",
          odds: 1.9,
          liquidity: 2800000,
          resolveDate: "2025-12-31",
          description: "Will the Federal Reserve cut interest rates below 3% in 2025?",
        },
        weight: 40,
        outcome: "pending",
      },
    ],
    totalBet: 150,
    status: "pending",
    createdAt: "2024-10-18T14:20:00Z",
    potentialPayout: 234.75,
    allWinMultiplier: 1.1,
  },
  {
    id: "3",
    legs: [
      {
        market: {
          id: "7",
          title: "Solana reaches $300 by EOY 2025",
          category: "crypto",
          odds: 2.3,
          liquidity: 1700000,
          resolveDate: "2025-12-31",
          description: "Will Solana (SOL) reach $300 USD by end of 2025?",
        },
        weight: 50,
        outcome: "won",
      },
      {
        market: {
          id: "8",
          title: "Democrats win House majority 2024",
          category: "politics",
          odds: 1.7,
          liquidity: 4100000,
          resolveDate: "2024-11-05",
          description: "Will Democrats win the House majority in 2024?",
        },
        weight: 50,
        outcome: "won",
      },
    ],
    totalBet: 100,
    status: "settled",
    createdAt: "2024-09-20T09:15:00Z",
    potentialPayout: 196.5,
    allWinMultiplier: 1.1,
    actualPayout: 196.5, // All won, got full payout with bonus
  },
  {
    id: "4",
    legs: [
      {
        market: {
          id: "9",
          title: "Apple reaches $250 by Q1 2025",
          category: "macro",
          odds: 1.6,
          liquidity: 3200000,
          resolveDate: "2025-03-31",
          description: "Will Apple stock reach $250 by Q1 2025?",
        },
        weight: 40,
        outcome: "won",
      },
      {
        market: {
          id: "10",
          title: "Dogecoin reaches $1 by EOY 2025",
          category: "crypto",
          odds: 4.5,
          liquidity: 1200000,
          resolveDate: "2025-12-31",
          description: "Will Dogecoin reach $1 USD by end of 2025?",
        },
        weight: 30,
        outcome: "lost",
      },
      {
        market: {
          id: "11",
          title: "S&P 500 above 6000 by EOY 2025",
          category: "macro",
          odds: 1.8,
          liquidity: 4500000,
          resolveDate: "2025-12-31",
          description: "Will S&P 500 close above 6000 by end of 2025?",
        },
        weight: 30,
        outcome: "won",
      },
    ],
    totalBet: 200,
    status: "settled",
    createdAt: "2024-09-10T11:45:00Z",
    potentialPayout: 520.8,
    allWinMultiplier: 1.1,
    actualPayout: 156.8, // Partial win: weight-allocated payout (no bonus)
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("active")

  const activeParlays = mockParlays.filter((p) => p.status === "active")
  const pendingParlays = mockParlays.filter((p) => p.status === "pending")
  const settledParlays = mockParlays.filter((p) => p.status === "settled")

  const totalInvested = activeParlays.reduce((sum, p) => sum + p.totalBet, 0)
  const totalPotential = activeParlays.reduce((sum, p) => sum + p.potentialPayout, 0)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Track your active betfolios and view historical performance</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Betfolios</p>
                <p className="text-2xl font-bold text-foreground">{activeParlays.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Invested</p>
                <p className="text-2xl font-bold text-foreground">${totalInvested.toFixed(2)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Potential Payout</p>
                <p className="text-2xl font-bold text-primary">${totalPotential.toFixed(2)}</p>
              </div>
            </div>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="active">Active ({activeParlays.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingParlays.length})</TabsTrigger>
            <TabsTrigger value="settled">Settled ({settledParlays.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeParlays.length === 0 ? (
              <Card className="p-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Active Betfolios</h3>
                  <p className="text-muted-foreground mb-6">Start building your first betfolio to see it here</p>
                  <Button>Browse Markets</Button>
                </div>
              </Card>
            ) : (
              activeParlays.map((parlay) => <ParlayCard key={parlay.id} parlay={parlay} />)
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {pendingParlays.length === 0 ? (
              <Card className="p-12">
                <div className="text-center">
                  <p className="text-muted-foreground">No pending betfolios</p>
                </div>
              </Card>
            ) : (
              pendingParlays.map((parlay) => <ParlayCard key={parlay.id} parlay={parlay} />)
            )}
          </TabsContent>

          <TabsContent value="settled" className="space-y-4">
            {settledParlays.length === 0 ? (
              <Card className="p-12">
                <div className="text-center">
                  <p className="text-muted-foreground">No settled betfolios</p>
                </div>
              </Card>
            ) : (
              settledParlays.map((parlay) => <ParlayCard key={parlay.id} parlay={parlay} />)
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function ParlayCard({ parlay }: { parlay: Parlay }) {
  const calculateActualPayout = () => {
    if (parlay.status !== "settled" || !parlay.actualPayout) {
      return null
    }
    return parlay.actualPayout
  }

  const actualPayout = calculateActualPayout()
  const allWon = parlay.legs.every((leg) => leg.outcome === "won")
  const someWon = parlay.legs.some((leg) => leg.outcome === "won")
  const wonCount = parlay.legs.filter((leg) => leg.outcome === "won").length

  const totalOdds = parlay.legs.reduce((product, leg) => {
    const legMultiplier = Math.pow(leg.market.odds, leg.weight / 100)
    return product * legMultiplier
  }, 1)

  const profit =
    parlay.status === "settled" && actualPayout
      ? actualPayout - parlay.totalBet
      : parlay.potentialPayout - parlay.totalBet
  const roi =
    parlay.status === "settled" && actualPayout
      ? ((profit / parlay.totalBet) * 100).toFixed(1)
      : (((parlay.potentialPayout - parlay.totalBet) / parlay.totalBet) * 100).toFixed(1)

  // Calculate progress
  const resolvedLegs = parlay.legs.filter((leg) => leg.outcome && leg.outcome !== "pending").length
  const progress = (resolvedLegs / parlay.legs.length) * 100

  const getStatusIcon = () => {
    if (parlay.status === "settled") {
      if (allWon) {
        return <CheckCircle2 className="w-4 h-4 text-primary" />
      } else if (someWon) {
        return <CheckCircle2 className="w-4 h-4 text-primary/60" />
      } else {
        return <XCircle className="w-4 h-4 text-destructive" />
      }
    }
    switch (parlay.status) {
      case "active":
        return <Loader2 className="w-4 h-4 text-primary animate-spin" />
      case "pending":
        return <Clock className="w-4 h-4 text-muted-foreground" />
      default:
        return null
    }
  }

  const getStatusBadge = () => {
    if (parlay.status === "settled") {
      if (allWon) {
        return (
          <Badge className="bg-primary/10 text-primary border-primary/20 gap-1">
            <Sparkles className="w-3 h-3" />
            All Won
          </Badge>
        )
      } else if (someWon) {
        return <Badge className="bg-primary/10 text-primary border-primary/20">Partial Win</Badge>
      } else {
        return <Badge variant="destructive">Lost</Badge>
      }
    }
    switch (parlay.status) {
      case "active":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Active</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      default:
        return null
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <div>
            <h3 className="font-semibold text-foreground">{parlay.legs.length}-Bet Betfolio</h3>
            <p className="text-sm text-muted-foreground">Created {new Date(parlay.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        {getStatusBadge()}
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Bet Amount</p>
          <p className="text-lg font-semibold text-foreground">${parlay.totalBet}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Combined Odds</p>
          <p className="text-lg font-semibold text-primary">{totalOdds.toFixed(2)}x</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">
            {parlay.status === "settled" ? "Actual Payout" : "Potential Payout"}
          </p>
          <p className="text-lg font-semibold text-foreground">
            ${(actualPayout ?? parlay.potentialPayout).toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">
            {parlay.status === "settled" ? "Actual ROI" : "Potential ROI"}
          </p>
          <p className={`text-lg font-semibold ${profit > 0 ? "text-primary" : "text-destructive"}`}>
            {profit > 0 ? "+" : ""}
            {roi}%
          </p>
        </div>
      </div>

      {parlay.status === "settled" && allWon && parlay.allWinMultiplier && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-foreground">
            All bets won! Received {((parlay.allWinMultiplier - 1) * 100).toFixed(0)}% bonus
          </span>
        </div>
      )}

      {parlay.status !== "settled" && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Resolution Progress</span>
            <span className="text-foreground font-medium">
              {resolvedLegs}/{parlay.legs.length} bets resolved
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">
          Bets {parlay.status === "settled" && `(${wonCount}/${parlay.legs.length} won)`}:
        </p>
        {parlay.legs.map((leg, index) => (
          <div key={leg.market.id} className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-6 h-6 bg-background rounded-full flex items-center justify-center text-xs font-semibold text-foreground">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground line-clamp-1">{leg.market.title}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                  <span>{leg.market.odds.toFixed(2)}x odds</span>
                  <span>{leg.weight.toFixed(0)}% weight</span>
                </div>
              </div>
            </div>
            {leg.outcome === "won" ? (
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
            ) : leg.outcome === "lost" ? (
              <XCircle className="w-5 h-5 text-destructive shrink-0" />
            ) : (
              <Clock className="w-5 h-5 text-muted-foreground shrink-0" />
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}
