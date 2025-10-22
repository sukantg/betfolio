import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/40">
      <div className="container py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm">
            <Sparkles className="h-4 w-4 text-accent-foreground" />
            <span className="text-muted-foreground">Built on Polymarket Protocol</span>
          </div>

          <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Multiply Your Odds with <span className="text-accent-foreground">Parlay Betting</span>
          </h1>

          <p className="mb-10 text-balance text-lg text-muted-foreground sm:text-xl lg:text-2xl leading-relaxed">
            Combine multiple Polymarket prediction markets into single parlay tickets. Higher risk, exponentially higher
            rewards. All on-chain, fully transparent.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base"
              asChild
            >
              <Link href="/markets">
                Start Building Parlays
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-transparent" asChild>
              <Link href="/how-it-works">Learn How It Works</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
    </section>
  )
}
