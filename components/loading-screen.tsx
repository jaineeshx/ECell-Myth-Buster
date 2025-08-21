"use client"

import { useEffect, useState } from "react"

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing Myth Busters...")

  useEffect(() => {
    const texts = [
      "Initializing Myth Busters...",
      "Loading startup wisdom...",
      "Preparing reality checks...",
      "Busting myths in progress...",
      "Almost ready to debunk!",
    ]

    let currentTextIndex = 0
    let currentProgress = 0

    const progressInterval = setInterval(() => {
      currentProgress += Math.random() * 15 + 5
      if (currentProgress >= 100) {
        currentProgress = 100
        clearInterval(progressInterval)
        setTimeout(onComplete, 500)
      }
      setProgress(currentProgress)
    }, 200)

    const textInterval = setInterval(() => {
      currentTextIndex = (currentTextIndex + 1) % texts.length
      setLoadingText(texts[currentTextIndex])
    }, 800)

    return () => {
      clearInterval(progressInterval)
      clearInterval(textInterval)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-red-50 via-white to-amber-50 flex items-center justify-center z-50">
      <div className="text-center space-y-8 max-w-md mx-auto px-6">
        <div className="logo-entrance">
          <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-2xl mx-auto mb-6">
            E
          </div>
          <h1 className="font-montserrat font-black text-3xl text-gray-900 mb-2">ECell</h1>
          <p className="font-montserrat font-bold text-lg bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent">
            Myth Busters
          </p>
        </div>

        <div className="space-y-4">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-600 to-amber-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-gray-600 font-open-sans animate-pulse">{loadingText}</p>

          <div className="flex justify-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-red-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
