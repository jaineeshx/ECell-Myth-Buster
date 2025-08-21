"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { useContentManager } from "@/lib/content-manager"
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-600 font-medium">Loading...</p>
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
        <nav className="max-w-4xl mx-auto px-6 py-4">
          <div className={`flex items-center space-x-3 ${logoLoaded ? "logo-entrance" : "opacity-0"}`}>
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="font-serif font-bold text-xl text-gray-900">ECell</span>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-block mb-4">
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium uppercase tracking-wide">
              Wisdom Wednesday
            </span>
          </div>

          <h1 className="font-serif font-bold text-5xl md:text-6xl text-gray-900 mb-6 leading-tight">
            Startup
            <span className="block text-indigo-600">Myth Busters</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
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

        <div className="max-w-2xl mx-auto mb-12">
          <div className={`card p-8 smooth-transition hover-lift ${isFlipping ? "card-flip" : ""}`}>
            <div className="text-center">
              {/* Category and difficulty badges */}
              <div className="flex justify-center items-center space-x-3 mb-6">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                  {currentMyth.category}
                </span>
                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
                  {currentMyth.difficulty}
                </span>
              </div>

              {!showReality ? (
                <div className="space-y-6">
                  <h2 className="font-serif font-bold text-2xl md:text-3xl text-gray-900">
                    Myth #{currentMythIndex + 1}
                  </h2>

                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">"{currentMyth.myth}"</p>

                  <Button
                    onClick={handleMythBust}
                    disabled={isFlipping}
                    className="btn-primary smooth-transition hover-scale"
                  >
                    {isFlipping ? "Revealing..." : "Bust This Myth"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6 scale-in">
                  <h2 className="font-serif font-bold text-2xl md:text-3xl text-green-600">Reality Check</h2>

                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">{currentMyth.reality}</p>

                  <div className="flex gap-4 justify-center flex-wrap">
                    <Button onClick={nextMyth} className="btn-primary smooth-transition">
                      Next Myth →
                    </Button>
                    <Button onClick={prevMyth} className="btn-secondary smooth-transition">
                      ← Previous
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-2 mb-8">
          {myths.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setShowReality(false)
                setCurrentMythIndex(index)
              }}
              className={`w-3 h-3 rounded-full smooth-transition ${
                index === currentMythIndex ? "bg-indigo-600" : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        <div className="text-center mb-16">
          <p className="text-gray-500 text-sm">
            Myth {currentMythIndex + 1} of {myths.length}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="card p-6 scale-in">
            <div className="text-3xl font-bold text-indigo-600 mb-2">{myths.length}</div>
            <div className="text-gray-600">Myths Busted</div>
          </div>
          <div className="card p-6 scale-in">
            <div className="text-3xl font-bold text-indigo-600 mb-2">10K+</div>
            <div className="text-gray-600">Entrepreneurs Educated</div>
          </div>
          <div className="card p-6 scale-in">
            <div className="text-3xl font-bold text-indigo-600 mb-2">100%</div>
            <div className="text-gray-600">Fact-Based Content</div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">E</span>
            </div>
            <span className="font-serif font-bold text-lg text-gray-900">ECell</span>
          </div>
          <p className="text-gray-600">
            Empowering the next generation of entrepreneurs through education and community.
          </p>
        </div>
      </footer>
    </div>
  )
}
