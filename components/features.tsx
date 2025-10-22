import { Card, CardContent } from "@/components/ui/card"
import { Lock, Zap, TrendingUp, Shield, Coins, BarChart3 } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: TrendingUp,
      title: "Exponential Returns",
      description: "Combine multiple markets to multiply your odds. Win all legs, win big.",
    },
    {
      icon: Lock,
      title: "On-Chain Escrow",
      description: "Your funds are locked in smart contracts. Trustless, transparent, secure.",
    },
    {
      icon: Zap,
      title: "Instant Settlement",
      description: "Automatic payouts when all markets resolve. No manual claims needed.",
    },
    {
      icon: Shield,
      title: "Polymarket Oracle",
      description: "Leverages Polymarket's proven oracle system for accurate market resolution.",
    },
    {
      icon: Coins,
      title: "Multi-Chain Support",
      description: "Built on Solana for speed, compatible with EVM chains for flexibility.",
    },
    {
      icon: BarChart3,
      title: "AI-Powered Insights",
      description: "Get optimal parlay suggestions based on correlation analysis and EV calculations.",
    },
  ]

  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Why Betfolio?</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The first decentralized parlay betting layer for prediction markets. Built for degens, secured by smart
            contracts.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                  <feature.icon className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
