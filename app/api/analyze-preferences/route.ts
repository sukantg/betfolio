import { OpenAIStream } from 'ai'
import OpenAI from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  const { experience, riskTolerance, preferredSports, preferredBetTypes, timeCommitment } = await req.json()

  const prompt = `As a betting expert, analyze the following user preferences and provide personalized recommendations:
Experience Level: ${experience}
Risk Tolerance: ${riskTolerance}
Preferred Sports: ${preferredSports.join(', ')}
Preferred Bet Types: ${preferredBetTypes.join(', ')}
Time Commitment: ${timeCommitment}

Provide recommendations in the following JSON format:
{
  "recommendedBetTypes": ["type1", "type2", "type3"],
  "recommendedMarkets": ["market1", "market2", "market3"],
  "riskManagementTips": ["tip1", "tip2", "tip3"],
  "learningResources": ["resource1", "resource2", "resource3"]
}`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a sports betting expert providing personalized recommendations based on user preferences."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    })

    const recommendationId = Math.random().toString(36).substring(7)
    const recommendations = JSON.parse(completion.choices[0].message.content)
    
    // In a real app, you'd store this in a database
    const response = {
      recommendationId,
      ...recommendations
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error generating recommendations:', error)
    return NextResponse.error()
  }
}