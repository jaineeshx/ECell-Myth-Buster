"use client"

import { useEffect, useState } from "react"

export function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient mesh background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(220, 38, 38, 0.15) 0%, transparent 50%),
            radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, rgba(245, 158, 11, 0.15) 0%, transparent 50%),
            linear-gradient(135deg, rgba(220, 38, 38, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%)
          `,
        }}
      />

      {/* Floating geometric shapes */}
      <div className="floating-blob absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-red-200 to-red-300 rounded-full opacity-60 blur-sm"></div>
      <div
        className="floating-blob absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-amber-200 to-amber-300 rounded-full opacity-50 blur-sm"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="floating-blob absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-red-100 to-amber-100 rounded-full opacity-40 blur-sm"
        style={{ animationDelay: "4s" }}
      ></div>
      <div
        className="floating-blob absolute top-1/2 right-1/4 w-20 h-20 bg-gradient-to-r from-red-300 to-amber-200 rounded-full opacity-30 blur-sm"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Dynamic SVG patterns */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(220, 38, 38, 0.3)" strokeWidth="1" />
          </pattern>
          <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="2" fill="rgba(245, 158, 11, 0.4)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" className="animate-pulse" />
        <rect width="100%" height="100%" fill="url(#dots)" className="floating-blob" />
      </svg>

      {/* Neon glow orbs */}
      <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-red-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-amber-500 rounded-full opacity-15 blur-3xl animate-pulse"
        style={{ animationDelay: "1.5s" }}
      ></div>

      {/* Parallax layers */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          transform: `translateX(${mousePosition.x * 0.02}px) translateY(${mousePosition.y * 0.02}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="absolute top-10 left-10 w-6 h-6 bg-red-400 rounded-full opacity-60"></div>
        <div className="absolute top-32 right-32 w-4 h-4 bg-amber-400 rounded-full opacity-50"></div>
        <div className="absolute bottom-20 left-20 w-8 h-8 bg-red-300 rounded-full opacity-40"></div>
        <div className="absolute bottom-40 right-10 w-5 h-5 bg-amber-300 rounded-full opacity-45"></div>
      </div>

      <div
        className="absolute inset-0 opacity-15"
        style={{
          transform: `translateX(${mousePosition.x * -0.01}px) translateY(${mousePosition.y * -0.01}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="absolute top-40 left-40 w-3 h-3 bg-red-500 rounded-full opacity-70"></div>
        <div className="absolute top-60 right-60 w-2 h-2 bg-amber-500 rounded-full opacity-60"></div>
        <div className="absolute bottom-60 left-60 w-4 h-4 bg-red-400 rounded-full opacity-50"></div>
      </div>
    </div>
  )
}
