import type { Myth } from "@/lib/types"

export const mythsDatabase: Myth[] = [
  {
    id: 1,
    myth: "You need a brand-new, groundbreaking idea.",
    reality:
      "Many successful startups simply improve, iterate, or present existing solutions better than others. Innovation isn't always about reinventing the wheel.",
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
    myth: "Success depends only on the idea.",
    reality:
      "Execution, adaptability, and relentless effort matter far more. A decent idea + great execution beats a brilliant idea with poor execution.",
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
    myth: "You can do everything alone.",
    reality:
      "Startups are a team sport. Smart hires, feedback, and partnerships are critical to scale and survive in a tough market.",
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
