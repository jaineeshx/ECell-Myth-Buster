import { mythsDatabase, weeklySchedule } from "@/data/myths"
import type { Myth, WeeklyContent } from "@/lib/types"

export class ContentManager {
  private static instance: ContentManager
  private myths: Myth[]
  private schedule: WeeklyContent[]

  private constructor() {
    this.myths = [...mythsDatabase]
    this.schedule = [...weeklySchedule]
  }

  public static getInstance(): ContentManager {
    if (!ContentManager.instance) {
      ContentManager.instance = new ContentManager()
    }
    return ContentManager.instance
  }

  // Get current week's myth based on date
  getCurrentWeekMyth(): { myth: Myth; week: WeeklyContent } | null {
    const today = new Date()
    const currentWeek = this.schedule.find((week) => {
      const startDate = new Date(week.startDate)
      const endDate = new Date(week.endDate)
      return today >= startDate && today <= endDate
    })

    if (!currentWeek) return null

    const myth = this.myths.find((m) => m.id === currentWeek.featuredMyth)
    if (!myth) return null

    return { myth, week: currentWeek }
  }

  // Get all myths
  getAllMyths(): Myth[] {
    return [...this.myths]
  }

  // Get myths by category
  getMythsByCategory(category: string): Myth[] {
    return this.myths.filter((myth) => myth.category.toLowerCase() === category.toLowerCase())
  }

  // Get myths by difficulty
  getMythsByDifficulty(difficulty: "Beginner" | "Intermediate" | "Advanced"): Myth[] {
    return this.myths.filter((myth) => myth.difficulty === difficulty)
  }

  // Get past weeks
  getPastWeeks(): Array<{ myth: Myth; week: WeeklyContent }> {
    const today = new Date()
    return this.schedule
      .filter((week) => new Date(week.endDate) < today)
      .map((week) => {
        const myth = this.myths.find((m) => m.id === week.featuredMyth)
        return myth ? { myth, week } : null
      })
      .filter(Boolean) as Array<{ myth: Myth; week: WeeklyContent }>
  }

  // Get upcoming weeks
  getUpcomingWeeks(): Array<{ myth: Myth; week: WeeklyContent }> {
    const today = new Date()
    return this.schedule
      .filter((week) => new Date(week.startDate) > today)
      .map((week) => {
        const myth = this.myths.find((m) => m.id === week.featuredMyth)
        return myth ? { myth, week } : null
      })
      .filter(Boolean) as Array<{ myth: Myth; week: WeeklyContent }>
  }

  // Search myths
  searchMyths(query: string): Myth[] {
    const lowercaseQuery = query.toLowerCase()
    return this.myths.filter(
      (myth) =>
        myth.myth.toLowerCase().includes(lowercaseQuery) ||
        myth.reality.toLowerCase().includes(lowercaseQuery) ||
        myth.category.toLowerCase().includes(lowercaseQuery) ||
        myth.tags?.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
    )
  }

  // Add new myth (for admin functionality)
  addMyth(myth: Omit<Myth, "id">): Myth {
    const newId = Math.max(...this.myths.map((m) => m.id)) + 1
    const newMyth: Myth = { ...myth, id: newId }
    this.myths.push(newMyth)
    return newMyth
  }

  // Update myth
  updateMyth(id: number, updates: Partial<Myth>): Myth | null {
    const index = this.myths.findIndex((m) => m.id === id)
    if (index === -1) return null

    this.myths[index] = { ...this.myths[index], ...updates }
    return this.myths[index]
  }

  // Get myth by ID
  getMythById(id: number): Myth | null {
    return this.myths.find((m) => m.id === id) || null
  }

  // Get weekly statistics
  getStats() {
    return {
      totalMyths: this.myths.length,
      categories: [...new Set(this.myths.map((m) => m.category))].length,
      weeksActive: this.schedule.length,
      currentWeek: this.getCurrentWeekMyth()?.week.weekNumber || 0,
    }
  }
}

// Hook for React components
export function useContentManager() {
  return ContentManager.getInstance()
}
