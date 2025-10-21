"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import type { BetLeg } from "@/lib/types"
import { TrendingUp, DollarSign, CheckCircle2, Sparkles } from "lucide-react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"

interface ConfirmationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  legs: BetLeg[]
  betAmount: string
  potentialPayout: number
  allWinMultiplier: number
  onConfirm: () => void
  isProcessing: boolean
}

export function ConfirmationModal({
  open,
  onOpenChange,
  legs,
  betAmount,
  potentialPayout,
  allWinMultiplier,
  onConfirm,
  isProcessing,
}: ConfirmationModalProps) {
  const { connected } = useWallet()
  const { setVisible } = useWalletModal()

  const totalOdds = legs.reduce((product, leg) => {
    const legMultiplier = Math.pow(leg.market.odds, leg.weight / 100)
    return product * legMultiplier
  }, 1)

  const potentialProfit = potentialPayout - Number.parseFloat(betAmount || "0")

  const baseMultiplier = totalOdds
  const allWinBonus = (allWinMultiplier - 1) * 100 // Convert to percentage
  const basePayout = Number.parseFloat(betAmount || "0") * baseMultiplier
  const bonusAmount = basePayout * (allWinMultiplier - 1)

  const handleConfirm = () => {
    if (!connected) {
      setVisible(true)
      return
    }
    onConfirm()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Confirm Your Betfolio</DialogTitle>
          <DialogDescription>Review your betfolio details before placing your bet</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Bet Amount</span>
              <span className="text-lg font-bold text-foreground">${betAmount} USDC</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Combined Odds</span>
              <span className="text-lg font-bold text-primary">{totalOdds.toFixed(2)}x</span>
            </div>
            <Separator />
            <div className="bg-primary/10 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">All Bets Win Scenario</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Base Payout</span>
                <span className="text-sm font-semibold text-foreground">${basePayout.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Bonus ({allWinBonus.toFixed(0)}%)</span>
                <span className="text-sm font-semibold text-primary">+${bonusAmount.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Payout</span>
                <span className="text-xl font-bold text-primary">${potentialPayout.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Profit</span>
                <span className="text-lg font-bold text-primary">+${potentialProfit.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-muted rounded-lg p-3">
              <div className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Partial Win:</span> If some bets lose, you'll receive a
                weight-allocated payout based on winning bets only (no bonus).
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Betfolio Bets ({legs.length})</h4>
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {legs.map((leg) => (
                <div key={leg.market.id} className="bg-card border border-border rounded-lg p-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-sm font-medium text-foreground line-clamp-2 flex-1">{leg.market.title}</p>
                    <Badge variant="secondary" className="shrink-0">
                      {leg.weight.toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {leg.market.odds.toFixed(2)}x
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />${(leg.market.liquidity / 1000000).toFixed(1)}M
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isProcessing} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleConfirm} disabled={isProcessing} className="flex-1 gap-2">
              {isProcessing ? (
                <>Processing...</>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  {connected ? "Confirm & Place Bet" : "Connect Wallet"}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
