import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function PropBetPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h1 className="text-4xl font-bold">Prop (Proposition) Betting</h1>
            <Button asChild size="lg" className="gap-2">
              <Link href="/markets">
                Start Betting <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-xl mb-8">
              Bet on specific events within a game, from player performance to game circumstances, independent of the final outcome.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">How Prop Betting Works</h2>
            <p>
              Proposition bets, or props, are wagers on specific events or statistics within a game. These can range from player
              performance metrics to game events, and even non-gaming occurrences during major events.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Types of Prop Bets</h2>
            <div className="bg-muted p-6 rounded-lg">
              <p className="font-semibold mb-2">Common Categories:</p>
              <ul className="list-none space-y-2">
                <li className="font-semibold">Player Props:</li>
                <li>- Points/Goals/Runs scored</li>
                <li>- Assists/Rebounds</li>
                <li>- First scorer</li>
                <li className="pt-2 border-t mt-2 font-semibold">Team Props:</li>
                <li>- First team to score</li>
                <li>- Team total points</li>
                <li>- Win margin</li>
                <li className="pt-2 border-t mt-2 font-semibold">Game Props:</li>
                <li>- First half result</li>
                <li>- Total corners/free kicks</li>
                <li>- Will there be overtime?</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Popular Prop Markets</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Player performance stats</li>
              <li>First/last scorer</li>
              <li>Time-based events</li>
              <li>Special event props (Super Bowl, World Cup)</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Advantages of Prop Betting</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>More betting options and opportunities</li>
              <li>Can focus on specific player/team strengths</li>
              <li>Often less efficient markets than main lines</li>
              <li>Great for player-specific knowledge</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Research Factors</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Player matchups and history</li>
              <li>Recent performance trends</li>
              <li>Team strategies and rotations</li>
              <li>Weather conditions (for outdoor sports)</li>
              <li>Coaching tendencies</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Tips for Prop Betting</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Focus on specific players/teams you know well</li>
              <li>Track line movements and market changes</li>
              <li>Consider correlation with other bets</li>
              <li>Look for props with clear statistical backing</li>
            </ul>

            <div className="bg-muted p-6 rounded-lg mt-8">
              <p className="font-semibold mb-2">Pro Tip:</p>
              <p>Props can offer great value in parlay combinations, especially when you find correlated props. For example, if you believe a team will dominate possession, you might parlay their top scorer props with high passing stats.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}