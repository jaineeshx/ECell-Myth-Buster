"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { useContentManager } from "@/lib/content-manager"
import { AnimatedLogo } from "@/components/animated-logo"
import type { Myth } from "@/lib/types"

export default function MythBustersPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [logoLoaded, setLogoLoaded] = useState(false)
  const [currentMythIndex, setCurrentMythIndex] = useState(0)
  const [showReality, setShowReality] = useState(false)
  const [isFlipping, setIsFlipping] = useState(false)
  const [myths, setMyths] = useState<Myth[]>([])
  const [currentWeekInfo, setCurrentWeekInfo] = useState<{ myth: Myth; week: any } | null>(null)

  const contentManager = useContentManager()

  useEffect(() => {
    // Simple loading simulation
    const timer = setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => setLogoLoaded(true), 100)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Load content from content manager
    const allMyths = contentManager.getAllMyths()
    const currentWeek = contentManager.getCurrentWeekMyth()

    setMyths(allMyths)
    setCurrentWeekInfo(currentWeek)

    // If there's a current week myth, start with that
    if (currentWeek) {
      const currentWeekIndex = allMyths.findIndex((m) => m.id === currentWeek.myth.id)
      if (currentWeekIndex !== -1) {
        setCurrentMythIndex(currentWeekIndex)
      }
    }
  }, [])

  const handleMythBust = useCallback(() => {
    if (isFlipping) return

    setIsFlipping(true)

    setTimeout(() => {
      setShowReality(true)
      setIsFlipping(false)
    }, 300)
  }, [isFlipping])

  const nextMyth = useCallback(() => {
    setShowReality(false)
    setCurrentMythIndex((prev) => (prev + 1) % myths.length)
  }, [myths.length])

  const prevMyth = useCallback(() => {
    setShowReality(false)
    setCurrentMythIndex((prev) => (prev - 1 + myths.length) % myths.length)
  }, [myths.length])

  if (isLoading) {
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

  if (myths.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-600 font-medium">Loading myths...</p>
        </div>
      </div>
    )
  }

  const currentMyth = myths[currentMythIndex]
  const isCurrentWeekMyth = currentWeekInfo?.myth.id === currentMyth.id

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <nav className="max-w-6xl mx-auto px-6 py-4">
          <div className={`flex items-center justify-between w-full gap-4 ${logoLoaded ? "logo-entrance" : "opacity-0"}`}>
            <AnimatedLogo />
            <h1 className="font-serif font-bold text-4xl text-gray-900">
              Myth<br/>
              Busters
            </h1>
          </div>
        </nav>
      </header>      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-16 fade-in-up flex flex-col items-center text-center">
          <div className="mb-6">
            <span className="bg-[#EEF1FF] text-[#6366F1] px-4 py-2 rounded-full text-sm font-medium">
              WISDOM WEDNESDAY
            </span>
          </div>

          <div className="mb-12">
            <h1 className="font-serif font-bold text-6xl md:text-7xl mb-0">
              Startup
            </h1>
            <div className="text-[#6366F1] font-serif font-bold text-6xl md:text-7xl">
              Myth Busters
            </div>
          </div>

          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed mx-auto">
            Separating startup facts from fiction. Interactive myth-busting for the next generation of entrepreneurs.
          </p>

          {currentWeekInfo && isCurrentWeekMyth && (
            <div className="mt-8 scale-in">
              <div className="inline-block bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-medium">
                This Week's Featured Myth
              </div>
            </div>
          )}
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <div className={`bg-white rounded-2xl shadow-lg p-8 sm:p-10 smooth-transition hover-lift ${isFlipping ? "card-flip" : ""}`}>
            <div className="text-center">
              {/* Category and difficulty badges */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium">
                  {currentMyth.category}
                </span>
                <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
                  {currentMyth.difficulty}
                </span>
              </div>

              {!showReality ? (
                <div className="space-y-8 text-center">
                  <h2 className="font-serif font-bold text-5xl sm:text-6xl text-gray-900">
                    Myth #{currentMythIndex + 1}
                  </h2>

                  <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed max-w-2xl mx-auto">"{currentMyth.myth}"</p>

                  <div>
                    <Button
                      onClick={handleMythBust}
                      disabled={isFlipping}
                      className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full text-lg font-medium transition-all"
                    >
                      {isFlipping ? "Revealing..." : "Bust This Myth"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-8 pt-8 border-t border-gray-100 scale-in text-center">
                  <h2 className="font-serif font-bold text-4xl sm:text-5xl text-gray-900 mb-6">Reality</h2>

                  <p className="text-xl text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto">{currentMyth.reality}</p>

                  <div className="flex gap-4 justify-center flex-wrap">
                    <Button onClick={nextMyth} className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full transition-all">
                      Next Myth →
                    </Button>
                    <Button onClick={prevMyth} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-full transition-all">
                      ← Previous
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="text-center space-y-4 mb-16">
          <div className="flex justify-center gap-3">
            {myths.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setShowReality(false)
                  setCurrentMythIndex(index)
                }}
                className={`w-4 h-4 rounded-full transition-all ${
                  index === currentMythIndex ? "bg-indigo-600 scale-110" : "bg-gray-200 hover:bg-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-gray-600 text-sm font-medium">
            Myth {currentMythIndex + 1} of {myths.length}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-center max-w-2xl mx-auto">
          <div className="card p-6 scale-in">
            <div className="text-3xl font-bold text-indigo-600 mb-2">{myths.length}</div>
            <div className="text-gray-600">Myths Busted</div>
          </div>
          <div className="card p-6 scale-in">
            <div className="text-3xl font-bold text-indigo-600 mb-2">100%</div>
            <div className="text-gray-600">Fact-Based Content</div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <div className="flex flex-col items-center justify-center gap-8">
            <AnimatedLogo />
            <p className="text-gray-600 text-xl max-w-2xl">
              Empowering the next generation of entrepreneurs through education and community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
