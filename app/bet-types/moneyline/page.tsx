import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function MoneylineBetPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h1 className="text-4xl font-bold">Moneyline Betting</h1>
            <Button asChild size="lg" className="gap-2">
              <Link href="/markets">
                Start Betting <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-xl mb-8">
              The simplest form of betting - pick the winner of an event. No point spreads or handicaps involved.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">How Moneyline Betting Works</h2>
            <p>
              Moneyline betting is straightforward: you're betting on which side will win outright. The odds reflect the likelihood
              of each outcome, with favorites paying less than underdogs.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Understanding Moneyline Odds</h2>
            <div className="bg-muted p-6 rounded-lg">
              <p className="font-semibold mb-2">Example Odds:</p>
              <ul className="list-none space-y-2">
                <li>Favorite: -150 (Bet $150 to win $100)</li>
                <li>Underdog: +200 (Bet $100 to win $200)</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Key Benefits</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Simple to understand and place</li>
              <li>Clear win/lose conditions</li>
              <li>No point spreads to worry about</li>
              <li>Great for betting on underdogs</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Tips for Moneyline Betting</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Compare odds across different markets</li>
              <li>Consider the value, not just the favorite</li>
              <li>Research head-to-head history</li>
              <li>Look for undervalued underdogs</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}