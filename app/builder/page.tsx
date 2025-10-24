import { ParlayBuilder } from "@/components/parlay-builder"
import { Header } from "@/components/header"

export default function ParlayPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Build Your Bet</h1>
        </div>
        <ParlayBuilder />
      </main>
    </div>
  )
}
