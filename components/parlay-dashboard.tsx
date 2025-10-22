"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, CheckCircle2, XCircle, TrendingUp, DollarSign, Calendar } from "lucide-react"

interface ParlaySelection {
  market: {
    id: string
    question: string
    category: string
  }
  selectedOutcome: string
  odds: number
}

interface Parlay {
  id: string
  selections: ParlaySelection[]
  betAmount: number
  combinedOdds: number
  potentialPayout: number
  status: "active" | "won" | "lost"
  createdAt: string
  settledAt?: string
}

export function ParlayDashboard() {
  const [parlays, setParlays] = useState<Parlay[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadParlays()
  }, [])

  function loadParlays() {
    try {
      // In production, fetch from API/database
      const savedParlays = JSON.parse(localStorage.getItem("userParlays") || "[]")

      // Add some mock completed parlays for demo
      const mockCompletedParlays: Parlay[] = [
        {
          id: "parlay_demo_won",
          selections: [
            {
              market: { id: "1", question: "Will Bitcoin reach $150k by end of 2025?", category: "crypto" },
              selectedOutcome: "Yes",
              odds: 2.5,
            },
            {
              market: { id: "4", question: "Will the Lakers win the 2025 NBA Championship?", category: "sports" },
              selectedOutcome: "Yes",
              odds: 3.2,
            },
          ],
          betAmount: 100,
          combinedOdds: 8.0,
          potentialPayout: 800,
          status: "won",
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          settledAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "parlay_demo_lost",
          selections: [
            {
              market: { id: "2", question: "Will the Democrats win the 2026 midterm elections?", category: "politics" },
              selectedOutcome: "Yes",
              odds: 1.8,
            },
            {
              market: { id: "3", question: "Will Ethereum merge to Proof of Stake succeed?", category: "crypto" },
              selectedOutcome: "No",
              odds: 2.1,
            },
            {
              market: { id: "5", question: "Will AI achieve AGI by 2030?", category: "science" },
              selectedOutcome: "Yes",
              odds: 2.5,
            },
          ],
          betAmount: 50,
          combinedOdds: 9.45,
          potentialPayout: 472.5,
          status: "lost",
          createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          settledAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ]

      setParlays([...savedParlays, ...mockCompletedParlays])
    } catch (error) {
      console.error("[v0] Error loading parlays:", error)
    } finally {
      setLoading(false)
    }
  }

  const activeParlays = parlays.filter((p) => p.status === "active")
  const completedParlays = parlays.filter((p) => p.status === "won" || p.status === "lost")

  // Calculate stats
  const totalBet = parlays.reduce((sum, p) => sum + p.betAmount, 0)
  const totalWon = parlays.filter((p) => p.status === "won").reduce((sum, p) => sum + p.potentialPayout, 0)
  const winRate =
    completedParlays.length > 0 ? (parlays.filter((p) => p.status === "won").length / completedParlays.length) * 100 : 0

  function getStatusIcon(status: Parlay["status"]) {
    switch (status) {
      case "active":
        return <Clock className="h-4 w-4" />
      case "won":
        return <CheckCircle2 className="h-4 w-4" />
      case "lost":
        return <XCircle className="h-4 w-4" />
    }
  }

  function getStatusColor(status: Parlay["status"]) {
    switch (status) {
      case "active":
        return "default"
      case "won":
        return "default"
      case "lost":
        return "destructive"
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-accent/10 rounded-lg">
              <DollarSign className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Wagered</p>
              <p className="text-2xl font-bold">${totalBet.toFixed(2)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-accent/10 rounded-lg">
              <TrendingUp className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Won</p>
              <p className="text-2xl font-bold">${totalWon.toFixed(2)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-accent/10 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Win Rate</p>
              <p className="text-2xl font-bold">{winRate.toFixed(1)}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Parlays List */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="active">Active ({activeParlays.length})</TabsTrigger>
          <TabsTrigger value="history">History ({completedParlays.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4 mt-6">
          {activeParlays.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground mb-4">No active parlays.</p>
              <Button asChild>
                <a href="/markets">Browse Markets</a>
              </Button>
            </Card>
          ) : (
            activeParlays.map((parlay) => (
              <Card key={parlay.id} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={getStatusColor(parlay.status)} className="gap-1">
                          {getStatusIcon(parlay.status)}
                          {parlay.status.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(parlay.createdAt)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {parlay.selections.length}-leg parlay • {parlay.combinedOdds.toFixed(2)}x odds
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Potential Payout</p>
                      <p className="text-xl font-bold text-accent">${parlay.potentialPayout.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {parlay.selections.map((selection, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className="text-xs">
                              Leg {idx + 1}
                            </Badge>
                            <Badge variant="outline" className="text-xs capitalize">
                              {selection.market.category}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium text-balance">{selection.market.question}</p>
                          <p className="text-xs text-muted-foreground mt-1">Pick: {selection.selectedOutcome}</p>
                        </div>
                        <span className="text-sm font-semibold ml-4">{selection.odds.toFixed(2)}x</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-sm text-muted-foreground">Bet Amount</span>
                    <span className="font-semibold">${parlay.betAmount.toFixed(2)}</span>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4 mt-6">
          {completedParlays.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No completed parlays yet.</p>
            </Card>
          ) : (
            completedParlays.map((parlay) => (
              <Card key={parlay.id} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={getStatusColor(parlay.status)} className="gap-1">
                          {getStatusIcon(parlay.status)}
                          {parlay.status.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(parlay.createdAt)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {parlay.selections.length}-leg parlay • {parlay.combinedOdds.toFixed(2)}x odds
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{parlay.status === "won" ? "Payout" : "Lost"}</p>
                      <p
                        className={`text-xl font-bold ${parlay.status === "won" ? "text-accent" : "text-destructive"}`}
                      >
                        {parlay.status === "won" ? "+" : "-"}$
                        {parlay.status === "won" ? parlay.potentialPayout.toFixed(2) : parlay.betAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {parlay.selections.map((selection, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className="text-xs">
                              Leg {idx + 1}
                            </Badge>
                            <Badge variant="outline" className="text-xs capitalize">
                              {selection.market.category}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium text-balance">{selection.market.question}</p>
                          <p className="text-xs text-muted-foreground mt-1">Pick: {selection.selectedOutcome}</p>
                        </div>
                        <span className="text-sm font-semibold ml-4">{selection.odds.toFixed(2)}x</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-sm text-muted-foreground">Bet Amount</span>
                    <span className="font-semibold">${parlay.betAmount.toFixed(2)}</span>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
