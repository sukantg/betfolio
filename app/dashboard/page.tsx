import { ParlayDashboard } from "@/components/parlay-dashboard"
import { Header } from "@/components/header"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Bets</h1>
          <p className="text-muted-foreground">Track your active bets and view your betting history.</p>
        </div>
        <ParlayDashboard />
      </main>
    </div>
  )
}
