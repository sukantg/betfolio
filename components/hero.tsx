import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Shield, Trophy } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/40">
      <div className="container py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Your Gateway to All Types of <span className="bg-linear-to-r from-[#4C1D95] to-[#6D28D9] bg-clip-text text-transparent">Betting</span> on Solana
          </h1>

          <p className="mb-10 text-balance text-lg text-muted-foreground sm:text-xl lg:text-2xl leading-relaxed">
            From simple moneylines to complex parlays, explore every betting strategy on the fastest blockchain.
            Experience instant settlement and transparent odds on all your favorite bet types.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base"
              asChild
            >
              <Link href="/markets">
                Explore Markets
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-transparent" asChild>
              <Link href="/#how-it-works">Learn About Bet Types</Link>
            </Button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mx-auto mt-20 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative p-6 border rounded-lg bg-card">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-accent/10">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Instant Settlement</h3>
              </div>
              <p className="mt-4 text-muted-foreground">
                No more waiting for payouts. Bets are settled instantly on the Solana blockchain.
              </p>
            </div>

            <div className="relative p-6 border rounded-lg bg-card">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-accent/10">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Secure & Transparent</h3>
              </div>
              <p className="mt-4 text-muted-foreground">
                All bets are secured by smart contracts. Every transaction is verifiable on-chain.
              </p>
            </div>

            <div className="relative p-6 border rounded-lg bg-card">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-accent/10">
                  <Trophy className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Best Odds</h3>
              </div>
              <p className="mt-4 text-muted-foreground">
                Get the best odds in the market with our low 1% fee structure and transparent pricing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]" />
    </section>
  )
}
