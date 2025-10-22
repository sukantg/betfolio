import { ParlayBuilder } from "@/components/parlay-builder"
import { Header } from "@/components/header"

export default function ParlayPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Build Your Parlay</h1>
          <p className="text-muted-foreground">
            Select outcomes and see your combined odds. The more markets you add, the higher your potential payout.
          </p>
        </div>
        <ParlayBuilder />
      </main>
    </div>
  )
}
