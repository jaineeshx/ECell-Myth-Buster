"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface GlassmorphismCardProps {
  children: React.ReactNode
  className?: string
  intensity?: "light" | "medium" | "strong"
}

export function GlassmorphismCard({ children, className, intensity = "medium" }: GlassmorphismCardProps) {
  const intensityClasses = {
    light: "bg-white/20 backdrop-blur-sm border-white/20",
    medium: "bg-white/30 backdrop-blur-md border-white/30",
    strong: "bg-white/40 backdrop-blur-lg border-white/40",
  }

  return <Card className={cn("border shadow-2xl", intensityClasses[intensity], className)}>{children}</Card>
}
