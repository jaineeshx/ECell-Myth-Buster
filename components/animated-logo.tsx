"use client"

import Image from "next/image"

export function AnimatedLogo() {
  return (
    <div className="relative w-[600px] h-[200px] cursor-pointer hover:scale-105 transition-transform animated-logo">
      <Image
        src="/e-cell-logo.png"
        alt="E-Cell RV University Logo"
        fill
        className="object-contain scale-in"
        priority
      />
    </div>
  )
}
