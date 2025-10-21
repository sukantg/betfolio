"use client"

import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Target, BarChart3, PieChart, Calendar, Award } from "lucide-react"
import {
  Bar,
  BarChart,
  Pie,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Mock analytics data
const performanceData = [
  { month: "Jul", profit: 120, loss: -30 },
  { month: "Aug", profit: 250, loss: -80 },
  { month: "Sep", profit: 180, loss: -50 },
  { month: "Oct", profit: 320, loss: -100 },
  { month: "Nov", profit: 280, loss: -60 },
  { month: "Dec", profit: 410, loss: -90 },
]

const categoryData = [
  { name: "Crypto", value: 45, color: "hsl(var(--chart-1))" },
  { name: "Politics", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Sports", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Macro", value: 10, color: "hsl(var(--chart-4))" },
]

const recentResults = [
  {
    id: "1",
    date: "2024-12-15",
    legs: 3,
    result: "won",
    profit: 437.5,
    roi: 175,
  },
  {
    id: "2",
    date: "2024-12-10",
    legs: 2,
    result: "lost",
    profit: -150,
    roi: -100,
  },
  {
    id: "3",
    date: "2024-12-05",
    legs: 4,
    result: "won",
    profit: 280,
    roi: 140,
  },
  {
    id: "4",
    date: "2024-11-28",
    legs: 2,
    result: "won",
    profit: 95,
    roi: 95,
  },
  {
    id: "5",
    date: "2024-11-20",
    legs: 3,
    result: "lost",
    profit: -200,
    roi: -100,
  },
]

const topPerformingCategories = [
  { category: "Crypto", winRate: 72, avgROI: 145, totalBets: 18 },
  { category: "Politics", winRate: 65, avgROI: 120, totalBets: 12 },
  { category: "Sports", winRate: 58, avgROI: 95, totalBets: 10 },
  { category: "Macro", winRate: 50, avgROI: 80, totalBets: 6 },
]

export default function AnalyticsPage() {
  const totalProfit = 1240
  const totalBets = 46
  const winRate = 67.4
  const avgROI = 118.5

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Analytics & Results</h1>
          <p className="text-muted-foreground">Track your performance and optimize your betting strategy</p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Profit</p>
                <p className="text-2xl font-bold text-primary">+${totalProfit}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Win Rate</p>
                <p className="text-2xl font-bold text-foreground">{winRate}%</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg ROI</p>
                <p className="text-2xl font-bold text-foreground">+{avgROI}%</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Bets</p>
                <p className="text-2xl font-bold text-foreground">{totalBets}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Profit & Loss Over Time</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="profit" fill="hsl(var(--primary))" name="Profit" radius={[4, 4, 0, 0]} />
                <Bar dataKey="loss" fill="hsl(var(--destructive))" name="Loss" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <PieChart className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Bets by Category</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Top Performing Categories</h3>
            </div>
            <div className="space-y-4">
              {topPerformingCategories.map((cat) => (
                <div key={cat.category} className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-foreground">{cat.category}</h4>
                    <Badge variant="secondary">{cat.totalBets} bets</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Win Rate</p>
                      <p className="text-lg font-bold text-primary">{cat.winRate}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Avg ROI</p>
                      <p className="text-lg font-bold text-foreground">+{cat.avgROI}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Recent Results</h3>
            </div>
            <div className="space-y-3">
              {recentResults.map((result) => (
                <div key={result.id} className="flex items-center justify-between bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    {result.result === "won" ? (
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-primary" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-destructive/10 rounded-full flex items-center justify-center">
                        <TrendingDown className="w-4 h-4 text-destructive" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-foreground">{result.legs}-Bet Betfolio</p>
                      <p className="text-xs text-muted-foreground">{new Date(result.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${result.profit > 0 ? "text-primary" : "text-destructive"}`}>
                      {result.profit > 0 ? "+" : ""}${result.profit}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {result.roi > 0 ? "+" : ""}
                      {result.roi}% ROI
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
