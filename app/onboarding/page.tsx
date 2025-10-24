import { Header } from "@/components/header"
import { OnboardingQuestionnaire } from "@/components/onboarding-questionnaire"

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl mx-auto">
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Welcome to Betfolio
              </h1>
              <p className="text-xl text-muted-foreground">
                Let&apos;s find the perfect betting options for you
              </p>
            </div>
            <OnboardingQuestionnaire />
          </div>
        </div>
      </main>
    </div>
  )
}