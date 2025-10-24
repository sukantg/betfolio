import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function RoundRobinBetPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h1 className="text-4xl font-bold">Round Robin Betting</h1>
            <Button asChild size="lg" className="gap-2">
              <Link href="/markets">
                Start Betting <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-xl mb-8">
              Create multiple parlay combinations from a set of bets, increasing your chances of winning while managing risk.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">How Round Robin Betting Works</h2>
            <p>
              A round robin bet creates every possible parlay combination from your selected bets.
              This strategy allows you to win even if not all of your selections are correct, unlike a standard parlay.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Understanding Round Robin Structure</h2>
            <div className="bg-muted p-6 rounded-lg">
              <p className="font-semibold mb-2">Example with 4 Teams:</p>
              <ul className="list-none space-y-2">
                <li>Team A vs Team B</li>
                <li>Team C vs Team D</li>
                <li>Team E vs Team F</li>
                <li>Team G vs Team H</li>
                <li className="pt-2 border-t mt-2 font-semibold">2-Team Combinations (6 parlays):</li>
                <li>A-C, A-E, A-G, C-E, C-G, E-G</li>
                <li className="pt-2 border-t mt-2 font-semibold">3-Team Combinations (4 parlays):</li>
                <li>A-C-E, A-C-G, A-E-G, C-E-G</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Benefits of Round Robin Betting</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>More chances to win than single parlays</li>
              <li>Reduced risk compared to standard parlays</li>
              <li>Potential for multiple winning combinations</li>
              <li>Better bankroll management</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Types of Round Robin Bets</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>2-team combinations</li>
              <li>3-team combinations</li>
              <li>4-team combinations</li>
              <li>Mixed combination sizes</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Strategy Tips</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Choose selections with minimal correlation</li>
              <li>Consider odds and potential payouts</li>
              <li>Balance risk and reward with combination size</li>
              <li>Track performance of different combination types</li>
            </ul>

            <div className="bg-muted p-6 rounded-lg mt-8">
              <p className="font-semibold mb-2">Pro Tip:</p>
              <p>Start with 3-4 high-confidence selections and create 2-team round robin combinations. This approach provides a good balance between risk and potential reward while maintaining reasonable odds of winning.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}