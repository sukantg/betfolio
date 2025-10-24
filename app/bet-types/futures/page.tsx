import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function FuturesBetPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h1 className="text-4xl font-bold">Futures Betting</h1>
            <Button asChild size="lg" className="gap-2">
              <Link href="/markets">
                Start Betting <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-xl mb-8">
              Place long-term bets on season-long outcomes or major events well in advance of their conclusion.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">How Futures Betting Works</h2>
            <p>
              Futures bets are wagers placed on events that will be decided in the future, often at the end of a season
              or after a major tournament. These bets typically offer higher odds due to their long-term nature and difficulty in prediction.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Popular Futures Markets</h2>
            <div className="bg-muted p-6 rounded-lg">
              <p className="font-semibold mb-2">Common Types:</p>
              <ul className="list-none space-y-2">
                <li className="font-semibold">Championship Winners:</li>
                <li>- Super Bowl Champion</li>
                <li>- World Series Winner</li>
                <li>- NBA Championship</li>
                <li className="pt-2 border-t mt-2 font-semibold">Individual Awards:</li>
                <li>- MVP</li>
                <li>- Rookie of the Year</li>
                <li>- Scoring Title</li>
                <li className="pt-2 border-t mt-2 font-semibold">Team Performance:</li>
                <li>- Regular Season Win Totals</li>
                <li>- Division/Conference Winners</li>
                <li>- Make/Miss Playoffs</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Advantages of Futures Betting</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Higher potential payouts</li>
              <li>Season-long entertainment value</li>
              <li>Multiple hedging opportunities</li>
              <li>Great for team/sport expertise</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Strategy Considerations</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Timing of bets (odds fluctuate throughout season)</li>
              <li>Bankroll management for long-term holds</li>
              <li>Impact of injuries/trades/schedule</li>
              <li>Hedging opportunities as season progresses</li>
            </ul>

            <div className="bg-muted p-6 rounded-lg mt-8">
              <p className="font-semibold mb-2">Pro Tip:</p>
              <p>Consider placing multiple smaller bets on different outcomes rather than one large bet. This strategy allows you to cover more possibilities and potentially hedge later in the season.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}