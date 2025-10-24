import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ParlayBetPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h1 className="text-4xl font-bold">Parlay Betting</h1>
            <Button asChild size="lg" className="gap-2">
              <Link href="/markets">
                Start Betting <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-xl mb-8">
              Combine multiple bets into one for higher potential payouts. All selections must win for the parlay to pay out.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">How Parlay Betting Works</h2>
            <p>
              A parlay bet combines multiple individual bets into a single wager. While this increases the risk since all selections must win,
              it also offers significantly higher potential returns than placing each bet separately.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Key Benefits</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Higher potential payouts than single bets</li>
              <li>Combine predictions across different markets</li>
              <li>Maximize returns with minimal stake</li>
              <li>Perfect for high-confidence predictions</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Example Parlay</h2>
            <div className="bg-muted p-6 rounded-lg">
              <p className="font-semibold mb-2">3-Leg Parlay:</p>
              <ul className="list-none space-y-2">
                <li>✓ Bet 1: Bitcoin {'>'} $100k (2.5x)</li>
                <li>✓ Bet 2: ETH {'>'} $10k (3.0x)</li>
                <li>✓ Bet 3: SOL {'>'} $500 (2.0x)</li>
                <li className="pt-2 border-t mt-2">
                  <span className="font-semibold">Combined Odds: 15x</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Tips for Successful Parlay Betting</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Start with 2-3 selections to manage risk</li>
              <li>Research each selection thoroughly</li>
              <li>Consider correlations between markets</li>
              <li>Don't chase massive odds with low probability</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}