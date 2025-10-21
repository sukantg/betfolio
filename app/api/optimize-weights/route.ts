import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { legs } = await request.json()

    if (!legs || legs.length < 2) {
      return Response.json({ error: "At least 2 bets required" }, { status: 400 })
    }

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt: `You are an expert prediction market analyst. Analyze these prediction markets and suggest optimal weight allocation for a betfolio.

Markets:
${legs
  .map(
    (leg: any, i: number) => `${i + 1}. ${leg.title}
   - Odds: ${leg.odds}x
   - Liquidity: $${(leg.liquidity / 1000000).toFixed(1)}M
   - Category: ${leg.category}`,
  )
  .join("\n")}

Consider:
- Higher odds = higher risk, should get lower weight
- Higher liquidity = more market confidence
- Diversification across categories
- Kelly Criterion principles for optimal bet sizing

Respond with ONLY a JSON object in this exact format:
{
  "weights": [weight1, weight2, ...],
  "expectedEV": number (percentage),
  "confidence": number (0-1),
  "reasoning": "brief explanation"
}

Weights must sum to exactly 100.`,
    })

    console.log("[v0] AI response:", text)

    // Parse the AI response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Invalid AI response format")
    }

    const result = JSON.parse(jsonMatch[0])

    // Validate weights sum to 100
    const sum = result.weights.reduce((a: number, b: number) => a + b, 0)
    if (Math.abs(sum - 100) > 0.1) {
      // Normalize weights to sum to 100
      result.weights = result.weights.map((w: number) => (w / sum) * 100)
    }

    return Response.json(result)
  } catch (error) {
    console.error("[v0] Optimization error:", error)
    return Response.json({ error: "Failed to optimize weights" }, { status: 500 })
  }
}
