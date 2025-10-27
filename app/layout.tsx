import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SolanaWalletProvider } from "@/lib/solana-wallet-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Betfolio - Your Complete Betting Platform",
  description: "Explore all types of betting on Solana - from moneylines and point spreads to parlays and prop bets. Fast, secure, and transparent betting on every market.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <SolanaWalletProvider>
          {children}
        </SolanaWalletProvider>
        <Analytics />
      </body>
    </html>
  )
}
