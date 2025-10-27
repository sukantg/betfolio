// Solana-specific window extensions (if needed in future)
interface Window {
  solana?: {
    isPhantom?: boolean
    publicKey?: unknown
    isConnected?: boolean
    signTransaction?: (transaction: unknown) => Promise<unknown>
    signAllTransactions?: (transactions: unknown[]) => Promise<unknown[]>
    connect?: (args?: unknown) => Promise<unknown>
    disconnect?: () => Promise<void>
  }
}
