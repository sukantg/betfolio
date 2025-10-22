"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { Button } from "@/components/ui/button"
import { Wallet, LogOut, Copy, Check } from "lucide-react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useConnection } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"

export function WalletConnect() {
  const { publicKey, disconnect, connected } = useWallet()
  const { setVisible } = useWalletModal()
  const { connection } = useConnection()
  const [balance, setBalance] = useState<string>("0")
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (connected && publicKey) {
      // Add a small delay to ensure connection is fully established
      const timer = setTimeout(() => {
        fetchBalance()
      }, 500)
      
      // Notify other components that wallet is connected
      localStorage.setItem("walletAddress", publicKey.toString())
      window.dispatchEvent(new Event("walletConnected"))
      
      return () => clearTimeout(timer)
    } else {
      localStorage.removeItem("walletAddress")
      window.dispatchEvent(new Event("walletDisconnected"))
      setBalance("0")
    }
  }, [connected, publicKey])

  async function fetchBalance() {
    if (!publicKey) return

    try {
      const lamports = await connection.getBalance(publicKey)
      const sol = (lamports / LAMPORTS_PER_SOL).toFixed(4)
      setBalance(sol)
    } catch (error) {
      console.error("[Wallet] Error fetching balance:", error)
      // Set a placeholder instead of "0" to indicate balance unavailable
      setBalance("--")
      
      // Show a subtle toast about balance unavailable
      toast({
        title: "Balance Unavailable",
        description: "Unable to fetch wallet balance. Wallet is still connected.",
        variant: "default",
      })
    }
  }

  function handleConnect() {
    setVisible(true)
  }

  async function handleDisconnect() {
    try {
      await disconnect()
      setBalance("0")
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected.",
      })
    } catch (error) {
      console.error("[v0] Error disconnecting wallet:", error)
    }
  }

  function formatAddress(addr: string) {
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`
  }

  async function copyAddress() {
    if (publicKey) {
      await navigator.clipboard.writeText(publicKey.toString())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: "Copied",
        description: "Address copied to clipboard",
      })
    }
  }

  if (!connected || !publicKey) {
    return (
      <Button onClick={handleConnect} variant="outline" size="sm" className="gap-2 bg-transparent">
        <Wallet className="h-4 w-4" />
        Connect Wallet
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Wallet className="h-4 w-4" />
          <span className="hidden sm:inline">{formatAddress(publicKey.toString())}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="px-2 py-2 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Balance</span>
            <span className="text-sm font-semibold">
              {balance === "--" ? (
                <span className="text-muted-foreground">Unavailable</span>
              ) : (
                `${balance} SOL`
              )}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Address</span>
            <Button variant="ghost" size="sm" onClick={copyAddress} className="h-6 px-2 gap-1">
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              <span className="text-xs">{formatAddress(publicKey.toString())}</span>
            </Button>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDisconnect} className="text-destructive gap-2">
          <LogOut className="h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
