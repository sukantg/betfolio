import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function HowItWorks() {
  const betTypes = [
    {
      title: "Moneyline",
      description: "The simplest form of betting where you pick the outright winner of a game or event.",
      link: "/bet-types/moneyline",
    },
    {
      title: "Point Spread",
      description: "Bet on teams with a handicap (points added or subtracted) to even the playing field.",
      link: "/bet-types/point-spread",
    },
    {
      title: "Over/Under",
      description: "Also known as totals, bet on whether the combined score will be over or under a set number.",
      link: "/bet-types/over-under",
    },
    {
      title: "Parlay",
      description: "Combine multiple bets for higher potential payouts. All selections must win for the parlay to pay.",
      link: "/bet-types/parlay",
    },
    {
      title: "Teaser",
      description: "Similar to parlays, but with adjusted point spreads in your favor for lower payouts.",
      link: "/bet-types/teaser",
    },
    {
      title: "Props",
      description: "Bet on specific events within a game, like player performance or game milestones.",
      link: "/bet-types/prop",
    },
    {
      title: "Futures",
      description: "Long-term bets on events that will be decided in the future, like championship winners.",
      link: "/bet-types/futures",
    },
    {
      title: "Live Betting",
      description: "Place bets during a game with odds that update in real-time based on the action.",
      link: "/bet-types/live",
    },
    {
      title: "Round Robin",
      description: "Create multiple parlay combinations from a set of bets to spread your risk.",
      link: "/bet-types/round-robin",
    },
  ]

  return (
    <section id="how-it-works" className="border-t border-border/40 bg-muted/30 py-24 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Types of Bets</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Explore different betting options available on Betfolio to find what works best for your strategy.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {betTypes.map((type, index) => (
              <Card key={index} className="border-border bg-card group relative">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <h3 className="mb-2 text-xl font-semibold">{type.title}</h3>
                    <p className="text-muted-foreground leading-relaxed grow mb-4">
                      {type.description}
                    </p>
                    <Button asChild variant="secondary" className="w-full gap-2">
                      <Link href={type.link}>
                        Learn More <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-6">
            Ready to start betting? Visit our markets page to see available opportunities.
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link href="/markets">
              Explore Markets <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
