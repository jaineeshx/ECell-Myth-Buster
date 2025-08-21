export interface Myth {
  id: number
  myth: string
  reality: string
  icon: string
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  dateAdded: string
  weekNumber?: number
  isCurrentWeek?: boolean
  tags?: string[]
  sources?: string[]
}

export interface WeeklyContent {
  weekNumber: number
  startDate: string
  endDate: string
  featuredMyth: number
  theme?: string
  description?: string
}
