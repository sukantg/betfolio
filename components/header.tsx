"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { WalletConnect } from "@/components/wallet-connect"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [parlayCount, setParlayCount] = useState(0)

  useEffect(() => {
    const updateParlayCount = () => {
      const parlay = JSON.parse(localStorage.getItem("parlay") || "[]")
      setParlayCount(parlay.length)
    }

    // Initial load
    updateParlayCount()

    // Listen for custom parlay update events
    window.addEventListener("parlayUpdated", updateParlayCount)

    // Also listen for storage events (for cross-tab updates)
    window.addEventListener("storage", updateParlayCount)

    return () => {
      window.removeEventListener("parlayUpdated", updateParlayCount)
      window.removeEventListener("storage", updateParlayCount)
    }
  }, [])

  return (
  <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="font-bold text-lg">Betfolio</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-accent transition-colors">
                Bet Types <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/bet-types/parlay">Parlay</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bet-types/moneyline">Moneyline</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bet-types/point-spread">Point Spread</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bet-types/over-under">Over/Under</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bet-types/teaser">Teaser</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bet-types/prop">Prop Bet</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bet-types/futures">Futures</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bet-types/live">Live Betting</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bet-types/round-robin">Round Robin</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/markets" className="text-sm font-medium hover:text-accent transition-colors">
              Markets
            </Link>
            <Link
              href="/builder"
              className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-2"
            >
              Bet builder
              {parlayCount > 0 && (
                <Badge variant="default" className="h-5 min-w-5 flex items-center justify-center px-1.5">
                  {parlayCount}
                </Badge>
              )}
            </Link>
            <Link href="/dashboard" className="text-sm font-medium hover:text-accent transition-colors">
              Dashboard
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <WalletConnect />
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-border">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-accent transition-colors py-2">
                Bet Types <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/bet-types/parlay" onClick={() => setMobileMenuOpen(false)}>Parlay</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bet-types/moneyline" onClick={() => setMobileMenuOpen(false)}>Moneyline</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bet-types/point-spread" onClick={() => setMobileMenuOpen(false)}>Point Spread</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bet-types/over-under" onClick={() => setMobileMenuOpen(false)}>Over/Under</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bet-types/teaser" onClick={() => setMobileMenuOpen(false)}>Teaser</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bet-types/prop" onClick={() => setMobileMenuOpen(false)}>Prop Bet</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bet-types/futures" onClick={() => setMobileMenuOpen(false)}>Futures</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bet-types/live" onClick={() => setMobileMenuOpen(false)}>Live Betting</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bet-types/round-robin" onClick={() => setMobileMenuOpen(false)}>Round Robin</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href="/markets"
              className="block text-sm font-medium hover:text-accent transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Markets
            </Link>
            <Link
              href="/builder"
              className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Bet builder
              {parlayCount > 0 && (
                <Badge variant="default" className="h-5 min-w-5 flex items-center justify-center px-1.5">
                  {parlayCount}
                </Badge>
              )}
            </Link>
            <Link
              href="/dashboard"
              className="block text-sm font-medium hover:text-accent transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <div className="pt-2">
              <WalletConnect />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
