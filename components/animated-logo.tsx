"use client"

import Image from "next/image"

export function AnimatedLogo() {
  return (
    <div className="relative w-[300px] xs:w-[350px] sm:w-[450px] md:w-[550px] lg:w-[650px] xl:w-[750px] h-[100px] xs:h-[120px] sm:h-[160px] md:h-[200px] lg:h-[240px] xl:h-[280px] cursor-pointer hover:scale-105 transition-transform animated-logo">
      <Image
        src="/e-cell-logo.png"
        alt="E-Cell RV University Logo"
        fill
        className="object-contain scale-in"
        priority
        sizes="(max-width: 475px) 300px, (max-width: 640px) 350px, (max-width: 768px) 450px, (max-width: 1024px) 550px, (max-width: 1280px) 650px, 750px"
      />
    </div>
  )
}