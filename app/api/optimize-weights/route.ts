export async function POST(request: Request) {
  try {
    const { legs } = await request.json()

    if (!legs || legs.length < 2) {
      return Response.json({ error: "At least 2 bets required" }, { status: 400 })
    }

    // Check for OpenAI API key
    const openaiApiKey = process.env.OPENAI_API_KEY
    if (!openaiApiKey) {
      return Response.json({ error: "OpenAI API key not configured" }, { status: 500 })
    }

    const prompt = `You are an expert prediction market analyst. Analyze these prediction markets and suggest optimal weight allocation for a betfolio.

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
- Risk management and portfolio theory
- Market efficiency and information asymmetry

Respond with ONLY a JSON object in this exact format:
{
  "weights": [weight1, weight2, ...],
  "expectedEV": number (percentage),
  "confidence": number (0-1),
  "reasoning": "brief explanation of the allocation strategy"
}

Weights must sum to exactly 100. Each weight should be a number between 0 and 100.`

    // Call OpenAI API directly
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert prediction market analyst specializing in portfolio optimization and risk management.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('OpenAI API error:', errorData)
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    const aiResponse = data.choices[0]?.message?.content

    if (!aiResponse) {
      throw new Error('No response from OpenAI')
    }

    console.log("[OpenAI] AI response:", aiResponse)

    // Parse the AI response
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Invalid AI response format")
    }

    const result = JSON.parse(jsonMatch[0])

    // Validate and normalize weights
    if (!result.weights || !Array.isArray(result.weights)) {
      throw new Error("Invalid weights format")
    }

    // Ensure weights sum to 100
    const sum = result.weights.reduce((a: number, b: number) => a + b, 0)
    if (Math.abs(sum - 100) > 0.1) {
      // Normalize weights to sum to 100
      result.weights = result.weights.map((w: number) => (w / sum) * 100)
    }

    // Ensure all weights are valid numbers
    result.weights = result.weights.map((w: number) => Math.max(0, Math.min(100, w)))

    // Add metadata
    result.metadata = {
      model: 'gpt-4o-mini',
      timestamp: new Date().toISOString(),
      totalMarkets: legs.length
    }

    return Response.json(result)
  } catch (error) {
    console.error("[OpenAI] Optimization error:", error)
    return Response.json({ 
      error: "Failed to optimize weights", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
