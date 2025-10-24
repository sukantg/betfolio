import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function LiveBettingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h1 className="text-4xl font-bold">Live Betting</h1>
            <Button asChild size="lg" className="gap-2">
              <Link href="/markets">
                Start Betting <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-xl mb-8">
              Place bets in real-time as the action unfolds, with constantly updating odds and markets.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">How Live Betting Works</h2>
            <p>
              Live betting, also known as in-play betting, allows you to place bets while a game is in progress.
              Odds are continuously updated based on the current state of play, giving you the opportunity to
              capitalize on momentum shifts and game developments.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Types of Live Bets</h2>
            <div className="bg-muted p-6 rounded-lg">
              <p className="font-semibold mb-2">Common Markets:</p>
              <ul className="list-none space-y-2">
                <li className="font-semibold">Updated Game Lines:</li>
                <li>- Live moneylines</li>
                <li>- Live spreads</li>
                <li>- Live totals</li>
                <li className="pt-2 border-t mt-2 font-semibold">Next Occurrence:</li>
                <li>- Next team to score</li>
                <li>- Next turnover</li>
                <li>- Result of current drive</li>
                <li className="pt-2 border-t mt-2 font-semibold">Period/Quarter Bets:</li>
                <li>- Next quarter winner</li>
                <li>- Half-time result</li>
                <li>- Race to X points</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Advantages of Live Betting</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>React to game developments in real-time</li>
              <li>Capitalize on momentum shifts</li>
              <li>Find better odds than pre-game</li>
              <li>Hedge pre-game positions</li>
              <li>More betting opportunities</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Key Factors to Watch</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Game flow and momentum</li>
              <li>Injuries and substitutions</li>
              <li>Weather changes (outdoor sports)</li>
              <li>Team strategies and adjustments</li>
              <li>Time remaining and score situation</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Tips for Live Betting</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Watch the game live when possible</li>
              <li>Have multiple outs for quick execution</li>
              <li>Don't chase losses with panic bets</li>
              <li>Look for steam moves and sharp action</li>
              <li>Consider correlation with pre-game bets</li>
            </ul>

            <div className="bg-muted p-6 rounded-lg mt-8">
              <p className="font-semibold mb-2">Pro Tip:</p>
              <p>Live betting requires quick thinking and discipline. Set predetermined criteria for when you'll bet and stick to your strategy rather than making emotional decisions based on the action.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}