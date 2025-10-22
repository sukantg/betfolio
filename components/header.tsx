"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { WalletConnect } from "@/components/wallet-connect"

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
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center font-bold text-accent-foreground">
              B
            </div>
            <span className="font-bold text-lg">Betfolio</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/markets" className="text-sm font-medium hover:text-accent transition-colors">
              Markets
            </Link>
            <Link
              href="/parlay"
              className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-2"
            >
              Parlay builder
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
            <Link
              href="/markets"
              className="block text-sm font-medium hover:text-accent transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Markets
            </Link>
            <Link
              href="/parlay"
              className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Parlay builder
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
