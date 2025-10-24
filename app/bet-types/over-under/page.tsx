import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function OverUnderBetPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h1 className="text-4xl font-bold">Over/Under Betting</h1>
            <Button asChild size="lg" className="gap-2">
              <Link href="/markets">
                Start Betting <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-xl mb-8">
              Bet on whether the combined score or total will be over or under a set number, regardless of who wins.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">How Over/Under Betting Works</h2>
            <p>
              Over/Under betting, also known as totals betting, focuses on the combined score of both teams or participants.
              The sportsbook sets a number, and you bet on whether the actual total will be higher (over) or lower (under) than that number.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Understanding Over/Under Lines</h2>
            <div className="bg-muted p-6 rounded-lg">
              <p className="font-semibold mb-2">Example: NBA Game Total 220.5</p>
              <ul className="list-none space-y-2">
                <li>Over (O220.5): Combined score must be 221 or higher</li>
                <li>Under (U220.5): Combined score must be 220 or lower</li>
                <li className="pt-2 border-t mt-2">
                  <span className="font-semibold">The half-point prevents ties (pushes)</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Popular Over/Under Markets</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Game totals (combined final score)</li>
              <li>Player props (points, rebounds, assists)</li>
              <li>Team totals (individual team scores)</li>
              <li>First half/quarter totals</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Factors to Consider</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Team offensive/defensive stats</li>
              <li>Pace of play and style matchups</li>
              <li>Weather conditions (for outdoor sports)</li>
              <li>Recent scoring trends</li>
              <li>Head-to-head history</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Tips for Over/Under Betting</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Research team scoring patterns</li>
              <li>Consider external factors (weather, injuries)</li>
              <li>Look for line movement trends</li>
              <li>Don't just bet overs for more excitement</li>
              <li>Track your results by sport and total range</li>
            </ul>

            <div className="bg-muted p-6 rounded-lg mt-8">
              <p className="font-semibold mb-2">Pro Tip:</p>
              <p>Over/Under bets are great for combining with other bet types in parlays. For example, you can bet on a team to win and the total to go over, creating a correlated parlay with potentially higher odds.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}