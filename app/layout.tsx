import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Manrope } from "next/font/google"

import { Suspense } from "react"
import "./globals.css"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "Campus Shark Tank - Where Student Ideas Meet Opportunity",
  description:
    "Join India's premier student entrepreneurship platform. Pitch your ideas, get peer feedback, secure micro-funding, and turn your vision into reality.",

  keywords:
    "student entrepreneurship, startup platform, pitch competition, micro-funding, campus innovation, student ideas",
  authors: [{ name: "Campus Shark Tank" }],
  creator: "Campus Shark Tank Platform",
  publisher: "Campus Shark Tank",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://campussharktank.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Campus Shark Tank - Where Student Ideas Meet Opportunity",
    description:
      "Join India's premier student entrepreneurship platform. Pitch your ideas, get peer feedback, secure micro-funding, and turn your vision into reality.",
    url: "https://campussharktank.com",
    siteName: "Campus Shark Tank",
    images: [
      {
        url: "/diverse-student-portraits.png",
        width: 1200,
        height: 630,
        alt: "Campus Shark Tank - Student Entrepreneurship Platform",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Campus Shark Tank - Where Student Ideas Meet Opportunity",
    description:
      "Join India's premier student entrepreneurship platform. Pitch your ideas, get peer feedback, secure micro-funding, and turn your vision into reality.",
    images: ["/diverse-student-portraits.png"],
    creator: "@campussharktank",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${manrope.variable} relative`}>
        <div className="fixed inset-0 bg-black/30 pointer-events-none z-0"></div>
        <div className="relative z-10">
          <Suspense fallback={null}>{children}</Suspense>
        </div>
      </body>
    </html>
  )
}
