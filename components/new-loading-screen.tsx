"use client"

import { useEffect } from "react"
import { AnimatedLogo } from "./animated-logo"

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  useEffect(() => {
    // Wait for animations to complete
    const timer = setTimeout(onComplete, 2000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center">
        <div className="scale-in-bounce mb-8">
          <div className="w-[600px] h-[200px] relative">
            <AnimatedLogo />
          </div>
        </div>
        <div className="loading-dots opacity-70">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </div>
  )
}
