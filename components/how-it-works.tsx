import { Card, CardContent } from "@/components/ui/card"

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Select Markets",
      description: "Browse Polymarket and choose multiple prediction markets you want to combine.",
    },
    {
      number: "02",
      title: "Build Your Parlay",
      description: "Add markets to your parlay ticket. See combined odds and potential payout in real-time.",
    },
    {
      number: "03",
      title: "Lock Funds",
      description: "Connect your wallet and lock your stake. Smart contract holds funds in escrow.",
    },
    {
      number: "04",
      title: "Wait for Resolution",
      description: "Markets resolve via Polymarket oracles. Track your parlay status in the dashboard.",
    },
    {
      number: "05",
      title: "Collect Winnings",
      description: "If all legs win, receive automatic payout. If any leg loses, stake goes to treasury.",
    },
  ]

  return (
    <section className="border-t border-border/40 bg-muted/30 py-24 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Five simple steps from market selection to payout. All automated, all on-chain.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="space-y-6">
            {steps.map((step, index) => (
              <Card key={index} className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-lg font-bold text-accent-foreground">
                        {step.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3">
            <span className="text-sm font-medium">Example:</span>
            <span className="text-sm text-muted-foreground">
              Trump wins (2x) + BTC {">"} $100k (3x) + ETH {">"} $10k (2x) = 12x payout
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
