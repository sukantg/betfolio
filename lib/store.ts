import { create } from "zustand"
import type { BetLeg, Market } from "./types"

interface BetStore {
  legs: BetLeg[]
  addLeg: (market: Market) => void
  removeLeg: (marketId: string) => void
  updateWeight: (marketId: string, weight: number) => void
  clearLegs: () => void
  applyAIWeights: (weights: number[]) => void
}

export const useBetStore = create<BetStore>((set) => ({
  legs: [],
  addLeg: (market) =>
    set((state) => {
      // Check if market already exists
      if (state.legs.some((leg) => leg.market.id === market.id)) {
        return state
      }
      // Add with equal weight distribution
      const newLegs = [...state.legs, { market, weight: 0 }]
      const equalWeight = 100 / newLegs.length
      return {
        legs: newLegs.map((leg) => ({ ...leg, weight: equalWeight })),
      }
    }),
  removeLeg: (marketId) =>
    set((state) => {
      const newLegs = state.legs.filter((leg) => leg.market.id !== marketId)
      if (newLegs.length === 0) return { legs: [] }
      // Redistribute weights equally
      const equalWeight = 100 / newLegs.length
      return {
        legs: newLegs.map((leg) => ({ ...leg, weight: equalWeight })),
      }
    }),
  updateWeight: (marketId, weight) =>
    set((state) => ({
      legs: state.legs.map((leg) => (leg.market.id === marketId ? { ...leg, weight } : leg)),
    })),
  clearLegs: () => set({ legs: [] }),
  applyAIWeights: (weights) =>
    set((state) => ({
      legs: state.legs.map((leg, index) => ({
        ...leg,
        weight: weights[index] || leg.weight,
      })),
    })),
}))
