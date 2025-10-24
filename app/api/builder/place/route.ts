import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { selections, betAmount, combinedOdds, potentialPayout } = body

    // Validate input
    if (!selections || selections.length === 0) {
      return NextResponse.json({ error: "No selections provided" }, { status: 400 })
    }

    if (!betAmount || betAmount <= 0) {
      return NextResponse.json({ error: "Invalid bet amount" }, { status: 400 })
    }

    // In production, this would:
    // 1. Verify wallet connection and balance
    // 2. Create smart contract transaction for the parlay
    // 3. Submit to blockchain
    // 4. Store parlay data in database

    // Mock response for development
    const parlayId = `parlay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const parlay = {
      id: parlayId,
      selections,
      betAmount,
      combinedOdds,
      potentialPayout,
      status: "active",
      createdAt: new Date().toISOString(),
    }

    // Store in localStorage for demo purposes
    // In production, this would be stored in a database
    if (typeof window !== "undefined") {
      const existingParlays = JSON.parse(localStorage.getItem("userParlays") || "[]")
      existingParlays.push(parlay)
      localStorage.setItem("userParlays", JSON.stringify(existingParlays))
    }

    return NextResponse.json({
      success: true,
      parlay,
    })
  } catch (error) {
    console.error("[v0] Error placing parlay:", error)
    return NextResponse.json({ error: "Failed to place parlay" }, { status: 500 })
  }
}
