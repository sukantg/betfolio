import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowRight, BookOpen, Target, Shield, Lightbulb } from "lucide-react"
import Link from "next/link"

interface RecommendationsProps {
  searchParams: { id: string }
}

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function RecommendationsPage({ searchParams }: RecommendationsProps) {
  // Handle missing ID
  if (!searchParams.id) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold mb-4">No Recommendations Found</h1>
            <p className="text-muted-foreground mb-8">Please go back and complete the onboarding process.</p>
            <Button asChild size="lg" className="gap-2">
              <Link href="/onboarding">Complete Onboarding</Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  // Build the URL properly
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  
  try {
    const response = await fetch(`${baseUrl}/api/analyze-preferences/${searchParams.id}`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch recommendations')
    }
    
    const recommendations = await response.json()

    return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">
              Your Personalized Recommendations
            </h1>
            <p className="text-muted-foreground text-lg">
              Based on your preferences, here are our suggestions to get you started
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <Target className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Recommended Bet Types</CardTitle>
                <CardDescription>Best betting options for your style</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recommendations.recommendedBetTypes.map((type: string, i: number) => (
                    <li key={i} className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-primary" />
                      {type}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Lightbulb className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Suggested Markets</CardTitle>
                <CardDescription>Markets that match your interests</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recommendations.recommendedMarkets.map((market: string, i: number) => (
                    <li key={i} className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-primary" />
                      {market}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Risk Management Tips</CardTitle>
                <CardDescription>Stay safe while betting</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recommendations.riskManagementTips.map((tip: string, i: number) => (
                    <li key={i} className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-primary" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Learning Resources</CardTitle>
                <CardDescription>Improve your betting knowledge</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recommendations.learningResources.map((resource: string, i: number) => (
                    <li key={i} className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-primary" />
                      {resource}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center pt-8">
            <Button asChild size="lg" className="gap-2">
              <Link href="/markets">
                Explore Markets
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
    )
  } catch (error) {
    console.error('Error loading recommendations:', error)
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold mb-4">Error Loading Recommendations</h1>
            <p className="text-muted-foreground mb-8">Something went wrong. Please try again.</p>
            <Button asChild size="lg" className="gap-2">
              <Link href="/onboarding">Try Again</Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }
}