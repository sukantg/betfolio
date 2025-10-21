"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface MarketFiltersProps {
  onSearchChange: (search: string) => void
  onCategoryChange: (category: string) => void
  selectedCategory: string
}

const categories = [
  { id: "all", label: "All Markets" },
  { id: "politics", label: "Politics" },
  { id: "crypto", label: "Crypto" },
  { id: "macro", label: "Macro" },
  { id: "sports", label: "Sports" },
]

export function MarketFilters({ onSearchChange, onCategoryChange, selectedCategory }: MarketFiltersProps) {
  const [search, setSearch] = useState("")

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onSearchChange(value)
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search markets..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
          >
            {category.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
