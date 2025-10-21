import Link from "next/link"
import { TrendingUp } from "lucide-react"
import { WalletButton } from "@/components/wallet-button"

export function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold">Betfolio</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Markets
          </Link>
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Link href="/builder" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Builder
          </Link>
          <Link href="/analytics" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Analytics
          </Link>
        </nav>

        <WalletButton />
      </div>
    </header>
  )
}
