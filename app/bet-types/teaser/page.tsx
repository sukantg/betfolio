import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function TeaserBetPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h1 className="text-4xl font-bold">Teaser Betting</h1>
            <Button asChild size="lg" className="gap-2">
              <Link href="/markets">
                Start Betting <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-xl mb-8">
              A type of parlay bet that allows you to adjust the point spread or total in your favor for better odds of winning.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">How Teaser Betting Works</h2>
            <p>
              Teasers are similar to parlays but give you the ability to adjust the point spread or total in your favor.
              While this increases your chances of winning, it comes with lower payouts compared to standard parlays.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Common Teaser Options</h2>
            <div className="bg-muted p-6 rounded-lg">
              <p className="font-semibold mb-2">Basketball Teasers:</p>
              <ul className="list-none space-y-2">
                <li>4-point teaser</li>
                <li>4.5-point teaser</li>
                <li>5-point teaser</li>
                <li className="pt-2 border-t mt-2 font-semibold">Football Teasers:</li>
                <li>6-point teaser</li>
                <li>6.5-point teaser</li>
                <li>7-point teaser</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Example of a Teaser</h2>
            <div className="bg-muted p-6 rounded-lg">
              <p className="font-semibold mb-2">Original Lines:</p>
              <ul className="list-none space-y-2">
                <li>Team A -7</li>
                <li>Team B +2</li>
                <li className="pt-2 border-t mt-2">
                  <span className="font-semibold">6-point Teaser:</span>
                </li>
                <li>Team A -1</li>
                <li>Team B +8</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Types of Teasers</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Regular Teasers (2-3 teams)</li>
              <li>Super Teasers (3+ teams, more points)</li>
              <li>Monster Teasers (4+ teams, maximum points)</li>
              <li>Special Teasers (sport-specific options)</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Advantages of Teaser Betting</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Better chances of winning than standard parlays</li>
              <li>Flexibility in adjusting point spreads</li>
              <li>Great for key number strategies</li>
              <li>Lower risk than traditional parlays</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Tips for Teaser Betting</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Focus on crossing key numbers (3, 7 in football)</li>
              <li>Avoid teasing totals when possible</li>
              <li>Consider the correlation between games</li>
              <li>Don't overvalue the extra points</li>
            </ul>

            <div className="bg-muted p-6 rounded-lg mt-8">
              <p className="font-semibold mb-2">Pro Tip:</p>
              <p>The most valuable teasers are those that cross multiple key numbers in football (3 and 7). Look for opportunities to tease favorites down from -7.5 to -1.5 or underdogs up from +1.5 to +7.5.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}