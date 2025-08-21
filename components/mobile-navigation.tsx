"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface MobileNavigationProps {
  currentIndex: number
  totalMyths: number
  onPrevious: () => void
  onNext: () => void
  onMythSelect: (index: number) => void
}

export function MobileNavigation({
  currentIndex,
  totalMyths,
  onPrevious,
  onNext,
  onMythSelect,
}: MobileNavigationProps) {
  const [showMythSelector, setShowMythSelector] = useState(false)

  return (
    <div className="md:hidden">
      {/* Mobile Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 z-40">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevious}
            className="tap-feedback flex-1 mr-2 bg-white/80"
            disabled={currentIndex === 0}
          >
            ← Previous
          </Button>

          <button
            onClick={() => setShowMythSelector(!showMythSelector)}
            className="tap-feedback px-4 py-2 bg-red-100 text-red-600 rounded-lg font-medium text-sm"
          >
            {currentIndex + 1} / {totalMyths}
          </button>

          <Button
            variant="outline"
            size="sm"
            onClick={onNext}
            className="tap-feedback flex-1 ml-2 bg-white/80"
            disabled={currentIndex === totalMyths - 1}
          >
            Next →
          </Button>
        </div>
      </div>

      {/* Myth Selector Overlay */}
      {showMythSelector && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
          <div className="w-full bg-white rounded-t-2xl p-6 mobile-slide-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-montserrat font-bold text-lg">Select Myth</h3>
              <Button variant="outline" size="sm" onClick={() => setShowMythSelector(false)}>
                ✕
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-3 max-h-60 overflow-y-auto">
              {[...Array(totalMyths)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onMythSelect(index)
                    setShowMythSelector(false)
                  }}
                  className={`tap-feedback aspect-square rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
                    index === currentIndex
                      ? "bg-red-600 text-white scale-110"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
