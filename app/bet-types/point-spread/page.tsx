import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function PointSpreadBetPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h1 className="text-4xl font-bold">Point Spread Betting</h1>
            <Button asChild size="lg" className="gap-2">
              <Link href="/markets">
                Start Betting <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-xl mb-8">
              Bet on the margin of victory in a game. The favorite must win by more than the spread, while the underdog can lose by less than the spread.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">How Point Spread Betting Works</h2>
            <p>
              Point spreads level the playing field between teams by adding or subtracting points from their final score.
              This creates more balanced betting opportunities when one team is heavily favored.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Understanding Point Spreads</h2>
            <div className="bg-muted p-6 rounded-lg">
              <p className="font-semibold mb-2">Example:</p>
              <ul className="list-none space-y-2">
                <li>Favorite: -7.5 (Must win by 8 or more points)</li>
                <li>Underdog: +7.5 (Can lose by 7 or fewer points)</li>
                <li className="pt-2 border-t mt-2">
                  <span className="font-semibold">The half-point prevents ties</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Key Benefits</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>More balanced odds between teams</li>
              <li>Better payouts on heavy favorites</li>
              <li>Opportunities in mismatched games</li>
              <li>Popular in basketball and football</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Tips for Point Spread Betting</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Consider recent performance trends</li>
              <li>Watch for key numbers in spreads</li>
              <li>Monitor line movements</li>
              <li>Factor in home/away performance</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}