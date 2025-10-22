import { MarketBrowser } from "@/components/market-browser"
import { Header } from "@/components/header"

export default function MarketsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Browse Markets</h1>
          <p className="text-muted-foreground">
            Select markets to add to your parlay. Combine multiple predictions to multiply your odds.
          </p>
        </div>
        <MarketBrowser />
      </main>
    </div>
  )
}
