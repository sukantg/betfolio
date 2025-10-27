import Link from "next/link"
// import { TrendingUp } from 'lucide-react' // Removed unused import

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2"></div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/markets" className="text-muted-foreground hover:text-foreground transition-colors">
                  Markets
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/github" className="text-muted-foreground hover:text-foreground transition-colors">
                  GitHub
                </Link>
              </li>
              <li>
                <Link href="/discord" className="text-muted-foreground hover:text-foreground transition-colors">
                  Discord
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p>Built for the Solana Cyperpunk Hackathon. Not financial advice. Bet responsibly.</p>
        </div>
      </div>
    </footer>
  )
}
