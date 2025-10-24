"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function OnboardingQuestionnaire() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({
    experience: "",
    riskTolerance: "",
    preferredSports: "",
    preferredBetTypes: "",
    timeCommitment: "",
  })

  const handleAnswerChange = (field: string, value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = async () => {
    if (step < 5) {
      setStep(step + 1)
    } else {
      // Send answers to API for processing
      try {
        const response = await fetch("/api/analyze-preferences", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(answers),
        })
        
        if (!response.ok) throw new Error("Failed to process preferences")
        
        const data = await response.json()
        
        // Redirect to personalized recommendations
        router.push(`/recommendations?id=${data.recommendationId}`)
      } catch (error) {
        console.error("Error processing preferences:", error)
        // Handle error appropriately
      }
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="space-y-10">
      <div className="bg-card rounded-xl border p-8 shadow-sm">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Betting Experience</h2>
            <RadioGroup
              defaultValue={answers.experience}
              onValueChange={(value) => handleAnswerChange("experience", value)}
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 hover:bg-accent/50 rounded-lg transition-colors">
                  <RadioGroupItem value="beginner" id="beginner" />
                  <Label htmlFor="beginner" className="flex-1 cursor-pointer">
                    <div className="font-medium">I&apos;m new to betting</div>
                    <div className="text-sm text-muted-foreground">Perfect for those just starting their betting journey</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 hover:bg-accent/50 rounded-lg transition-colors">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <Label htmlFor="intermediate" className="flex-1 cursor-pointer">
                    <div className="font-medium">I have some betting experience</div>
                    <div className="text-sm text-muted-foreground">Familiar with basic betting concepts and strategies</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 hover:bg-accent/50 rounded-lg transition-colors">
                  <RadioGroupItem value="advanced" id="advanced" />
                  <Label htmlFor="advanced" className="flex-1 cursor-pointer">
                    <div className="font-medium">I&apos;m an experienced bettor</div>
                    <div className="text-sm text-muted-foreground">Well-versed in various betting types and complex strategies</div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Risk Tolerance</h2>
            <RadioGroup
              defaultValue={answers.riskTolerance}
              onValueChange={(value) => handleAnswerChange("riskTolerance", value)}
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 hover:bg-accent/50 rounded-lg transition-colors">
                  <RadioGroupItem value="conservative" id="conservative" />
                  <Label htmlFor="conservative" className="flex-1 cursor-pointer">
                    <div className="font-medium">Conservative</div>
                    <div className="text-sm text-muted-foreground">Lower risk, steady returns</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 hover:bg-accent/50 rounded-lg transition-colors">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate" className="flex-1 cursor-pointer">
                    <div className="font-medium">Moderate</div>
                    <div className="text-sm text-muted-foreground">Balanced risk and reward</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 hover:bg-accent/50 rounded-lg transition-colors">
                  <RadioGroupItem value="aggressive" id="aggressive" />
                  <Label htmlFor="aggressive" className="flex-1 cursor-pointer">
                    <div className="font-medium">Aggressive</div>
                    <div className="text-sm text-muted-foreground">Higher risk, higher potential returns</div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Preferred Sports</h2>
            <Select
              value={answers.preferredSports}
              onValueChange={(value) => handleAnswerChange("preferredSports", value)}
            >
              <SelectTrigger className="w-full p-3">
                <SelectValue placeholder="Select your favorite sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="football">Football (NFL)</SelectItem>
                <SelectItem value="basketball">Basketball (NBA)</SelectItem>
                <SelectItem value="baseball">Baseball (MLB)</SelectItem>
                <SelectItem value="hockey">Hockey (NHL)</SelectItem>
                <SelectItem value="soccer">Soccer</SelectItem>
                <SelectItem value="mma">MMA/UFC</SelectItem>
                <SelectItem value="esports">Esports</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Preferred Bet Types</h2>
            <RadioGroup
              defaultValue={answers.preferredBetTypes}
              onValueChange={(value) => handleAnswerChange("preferredBetTypes", value)}
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 hover:bg-accent/50 rounded-lg transition-colors">
                  <RadioGroupItem value="simple" id="simple" />
                  <Label htmlFor="simple" className="flex-1 cursor-pointer">
                    <div className="font-medium">Simple bets</div>
                    <div className="text-sm text-muted-foreground">Moneyline and Over/Under</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 hover:bg-accent/50 rounded-lg transition-colors">
                  <RadioGroupItem value="moderate" id="moderate-bets" />
                  <Label htmlFor="moderate-bets" className="flex-1 cursor-pointer">
                    <div className="font-medium">Moderate bets</div>
                    <div className="text-sm text-muted-foreground">Point Spreads and Props</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 hover:bg-accent/50 rounded-lg transition-colors">
                  <RadioGroupItem value="complex" id="complex" />
                  <Label htmlFor="complex" className="flex-1 cursor-pointer">
                    <div className="font-medium">Complex bets</div>
                    <div className="text-sm text-muted-foreground">Parlays, Teasers, and Live betting</div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Time Commitment</h2>
            <RadioGroup
              defaultValue={answers.timeCommitment}
              onValueChange={(value) => handleAnswerChange("timeCommitment", value)}
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 hover:bg-accent/50 rounded-lg transition-colors">
                  <RadioGroupItem value="casual" id="casual" />
                  <Label htmlFor="casual" className="flex-1 cursor-pointer">
                    <div className="font-medium">Casual</div>
                    <div className="text-sm text-muted-foreground">Few bets per month</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 hover:bg-accent/50 rounded-lg transition-colors">
                  <RadioGroupItem value="regular" id="regular" />
                  <Label htmlFor="regular" className="flex-1 cursor-pointer">
                    <div className="font-medium">Regular</div>
                    <div className="text-sm text-muted-foreground">Weekly betting</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 hover:bg-accent/50 rounded-lg transition-colors">
                  <RadioGroupItem value="active" id="active" />
                  <Label htmlFor="active" className="flex-1 cursor-pointer">
                    <div className="font-medium">Active</div>
                    <div className="text-sm text-muted-foreground">Daily betting</div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={step === 1}
          size="lg"
          className="w-28"
        >
          Back
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="text-muted-foreground"
          asChild
        >
          <Link href="/markets">Skip to markets</Link>
        </Button>
        <Button
          onClick={handleNext}
          className="gap-2 w-28"
          size="lg"
        >
          {step === 5 ? "Finish" : "Next"}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div>
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Question {step} of 5</span>
          <span>{Math.round((step / 5) * 100)}% Complete</span>
        </div>
        <div className="h-2 w-full rounded-full bg-muted">
          <div
            className="h-2 rounded-full bg-primary transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}