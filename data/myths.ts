import type { Myth } from "@/lib/types"

export const mythsDatabase: Myth[] = [
  {
    id: 1,
    myth: "You need a lot of money to start a business?",
    reality:
      "Nope, many successful startups began with less capital. Freelancing, and lean startup methods can help launch a business on a tight budget",
    icon: "💡",
    category: "Innovation",
    difficulty: "Beginner",
    dateAdded: "2024-01-15",
    weekNumber: 1,
    tags: ["innovation", "ideas", "competition"],
    sources: ["Harvard Business Review", "Startup Genome Report"],
  },
  {
    id: 2,
    myth: "Startups are overnight successes.",
    reality:
      " Most overnight successes take minimum 5-10 years to become successful",
    icon: "⚡",
    category: "Execution",
    difficulty: "Intermediate",
    dateAdded: "2024-01-22",
    weekNumber: 2,
    tags: ["execution", "strategy", "implementation"],
    sources: ["Forbes", "Inc. Magazine"],
  },
  {
    id: 3,
    myth: "Starting your own business means you’ll have more free time and total freedom.",
    reality:
      "While you start having control, the early years of entrepreneurship often demand more hours and higher stress than a traditional job. Real freedom comes later.",
    icon: "🤝",
    category: "Team Building",
    difficulty: "Advanced",
    dateAdded: "2024-01-29",
    weekNumber: 3,
    tags: ["teamwork", "collaboration", "partnerships"],
    sources: ["Y Combinator", "First Round Review"],
  },
]

export const weeklySchedule = [
  {
    weekNumber: 1,
    startDate: "2024-01-15",
    endDate: "2024-01-21",
    featuredMyth: 1,
    theme: "Innovation & Ideas",
    description: "Understanding what makes a startup idea truly valuable",
  },
  {
    weekNumber: 2,
    startDate: "2024-01-22",
    endDate: "2024-01-28",
    featuredMyth: 2,
    theme: "Execution Over Ideas",
    description: "Why execution beats brilliant ideas every time",
  },
  {
    weekNumber: 3,
    startDate: "2024-01-29",
    endDate: "2024-02-04",
    featuredMyth: 3,
    theme: "Team Building",
    description: "Building the right team for startup success",
  },
]
