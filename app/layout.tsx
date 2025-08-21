import type React from "react"
import type { Metadata } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import "../styles/animations.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "ECell Wisdom Wednesday: Startup Myth Busters",
  description: "Interactive myth-busting experience for entrepreneurs and startup enthusiasts",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable} antialiased`}>
      <body className="font-sans">
        {children}
        <footer className="bg-black text-white py-4 text-center">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl">
            ❤️With love from <span className="font-bold">ECell, RV University</span>
          </p>
          

          <div className="mt-4">
            <p className="text-xs sm:text-sm mb-2">Get connected with us on social networks:</p>
            <div className="flex justify-center gap-4">
              <a href="https://www.linkedin.com/company/entrepreneurship-cell-rv-university/" target="_blank" rel="noopener noreferrer" className="text-gold">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://www.instagram.com/ecell_rvu?igsh=ZTh1NHlwcnRzcGluhttps://www.instagram.com/ecell_rvu?igsh=ZTh1NHlwcnRzcGlu" target="_blank" rel="noopener noreferrer" className="text-gold">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://chat.whatsapp.com/J0MfKUwIZ6J8WfemIBbdlJ" target="_blank" rel="noopener noreferrer" className="text-gold">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="https://medium.com/@club_ecell" target="_blank" rel="noopener noreferrer" className="text-gold text-lg sm:text-xl">
                <i className="fab fa-medium"></i>
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
