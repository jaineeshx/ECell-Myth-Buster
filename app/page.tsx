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
  const [burst, setBurst] = useState(false)

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

    setBurst(true);
    setTimeout(() => setBurst(false), 1000); // Reset burst after animation

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
            <div className="w-[280px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[100px] sm:h-[150px] md:h-[180px] lg:h-[200px] relative">
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
        <nav className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className={`flex flex-col lg:flex-row items-center justify-between w-full space-y-4 lg:space-y-0 ${logoLoaded ? "logo-entrance" : "opacity-0"}`}>
            <div className="w-full lg:w-auto flex justify-center lg:justify-start">
              <div className="scale-100 sm:scale-110 lg:scale-120">
                <AnimatedLogo />
              </div>
            </div>
            <div className="w-full lg:w-auto flex justify-center lg:justify-end">
              <h1 className="font-serif font-bold text-md sm:text-lg md:text-xl lg:text-2xl text-gray-900 text-center lg:text-right">
                Myth<br />
                Busters
              </h1>
            </div>
          </div>
        </nav>
      </header>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="mb-12 sm:mb-16 fade-in-up flex flex-col items-center text-center">
          <div className="mb-6">
            <span className="bg-[#EEF1FF] text-[#6366F1] px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium">
              WISDOM WEDNESDAY
            </span>
          </div>

          <div className="mb-8 sm:mb-12">
            <h1 className="hero-title font-serif font-bold text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-0 leading-tight">
              Startup
            </h1>
            <div className="hero-title text-[#6366F1] font-serif font-bold text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
              Myth Busters
            </div>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed mx-auto px-4">
            Separating startup facts from fiction. Interactive myth-busting for the next generation of entrepreneurs.
          </p>

          {currentWeekInfo && isCurrentWeekMyth && (
            <div className="mt-8 scale-in">
              <div className="inline-block bg-green-50 text-green-700 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium">
                This Week's Featured Myth
              </div>
            </div>
          )}
        </div>

        <div className="max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className={`bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 smooth-transition hover-lift ${isFlipping ? "card-flip" : ""}`}>
            <div className="text-center">
              {/* Category and difficulty badges */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                <span className="bg-gray-100 text-gray-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                  {currentMyth.category}
                </span>
                <span className="bg-indigo-100 text-indigo-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                  {currentMyth.difficulty}
                </span>
              </div>

              {!showReality ? (
                <div className="space-y-6 sm:space-y-8 text-center">
                  <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900">
                    Myth #{currentMythIndex + 1}
                  </h2>

                  <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-2xl mx-auto px-2">"{currentMyth.myth}"</p>

                  <div>
                    <Button
                      onClick={handleMythBust}
                      disabled={isFlipping}
                      className="bg-black hover:bg-gray-800 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-base sm:text-lg font-medium transition-all"
                    >
                      {isFlipping ? "Revealing..." : "Bust This Myth"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-100 scale-in text-center">
                  <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-4 sm:mb-6">Reality</h2>

                  <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto px-2">{currentMyth.reality}</p>

                  <div className="flex gap-3 sm:gap-4 justify-center flex-wrap">
                    <Button onClick={nextMyth} className="bg-black hover:bg-gray-800 text-white px-4 sm:px-6 py-2 rounded-full transition-all text-sm sm:text-base">
                      Next Myth →
                    </Button>
                    <Button onClick={prevMyth} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 sm:px-6 py-2 rounded-full transition-all text-sm sm:text-base">
                      ← Previous
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Responsive Tab Navigation */}
        <div className="text-center space-y-4 mb-12 sm:mb-16">
          <div className="flex justify-center px-4">
            {myths.length <= 12 ? (
              // Dot navigation for smaller sets - responsive wrapping
              <div className="flex flex-wrap gap-2 sm:gap-3 max-w-full justify-center">
                {myths.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setShowReality(false)
                      setCurrentMythIndex(index)
                    }}
                    className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all flex-shrink-0 ${
                      index === currentMythIndex 
                        ? "bg-indigo-600 scale-110 ring-2 ring-indigo-200" 
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                    aria-label={`Go to myth ${index + 1}`}
                  />
                ))}
              </div>
            ) : (
              // Horizontal scroll for larger sets
              <div className="w-full max-w-md mx-auto">
                <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-2" style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}>
                  {myths.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setShowReality(false)
                        setCurrentMythIndex(index)
                      }}
                      className={`min-w-[28px] sm:min-w-[32px] h-7 sm:h-8 rounded-full transition-all flex-shrink-0 text-xs sm:text-sm font-medium ${
                        index === currentMythIndex 
                          ? "bg-indigo-600 text-white ring-2 ring-indigo-200" 
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                      aria-label={`Go to myth ${index + 1}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Progress indicator for mobile with many myths */}
          {myths.length > 12 && (
            <div className="block sm:hidden">
              <div className="w-full max-w-xs mx-auto bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentMythIndex + 1) / myths.length) * 100}%` }}
                />
              </div>
            </div>
          )}
          
          <p className="text-gray-600 text-xs sm:text-sm font-medium px-4">
            Myth {currentMythIndex + 1} of {myths.length}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-center max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 scale-in">
            <div className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-2">{myths.length}</div>
            <div className="text-gray-600 text-sm sm:text-base">Myths Busted</div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 scale-in">
            <div className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-2">100%</div>
            <div className="text-gray-600 text-sm sm:text-base">Fact-Based Content</div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16 sm:mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <div className="flex flex-col items-center justify-center gap-6 sm:gap-8">
            <AnimatedLogo />
            <p className="text-gray-600 text-lg sm:text-xl max-w-2xl px-4">
                 Powered by Purpose, Driven by Vision
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Extra small screens */
        @media (max-width: 475px) {
          .xs\\:text-4xl {
            font-size: 2.25rem;
            line-height: 2.5rem;
          }
        }
        
        /* Ensure proper spacing on very small screens */
        @media (max-width: 380px) {
          .hero-title {
            font-size: 2rem !important;
            line-height: 2.25rem !important;
          }
        }

        @keyframes burst {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .burst-animation {
          animation: burst 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}