"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { AdminSignupForm } from "@/components/auth/admin-signup-form"
import { Button } from "@/components/ui/button"
import { Lightbulb, TrendingUp, Users } from "lucide-react"

export default function AuthPage() {
  const [authMode, setAuthMode] = useState<"signin" | "student-signup" | "admin-signup">("signin")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary text-primary-foreground p-12 flex-col justify-center">
        <div className="max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold">Campus Shark Tank</h1>
          </div>

          <h2 className="text-4xl font-bold mb-6 text-balance">Where Student Ideas Meet Opportunity</h2>

          <p className="text-xl mb-8 text-primary-foreground/90 leading-relaxed">
            Pitch your innovative ideas, get peer feedback, and secure micro-funding to turn your vision into reality.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Pitch Your Ideas</h3>
                <p className="text-primary-foreground/80">Share your innovative concepts with the community</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Get Peer Feedback</h3>
                <p className="text-primary-foreground/80">Receive valuable insights from fellow students</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Secure Funding</h3>
                <p className="text-primary-foreground/80">Get micro-funding to bring your ideas to life</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Forms */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold">Campus Shark Tank</h1>
            </div>
          </div>

          <div className="mb-6 flex justify-center">
            <div className="bg-muted p-1 rounded-lg flex">
              <Button
                variant={authMode === "signin" ? "default" : "ghost"}
                size="sm"
                onClick={() => setAuthMode("signin")}
                className="px-4 text-sm"
              >
                Sign In
              </Button>
              <Button
                variant={authMode === "student-signup" ? "default" : "ghost"}
                size="sm"
                onClick={() => setAuthMode("student-signup")}
                className="px-4 text-sm"
              >
                Student Sign Up
              </Button>
              <Button
                variant={authMode === "admin-signup" ? "default" : "ghost"}
                size="sm"
                onClick={() => setAuthMode("admin-signup")}
                className="px-4 text-sm"
              >
                Admin Sign Up
              </Button>
            </div>
          </div>

          {authMode === "signin" && <LoginForm />}
          {authMode === "student-signup" && <SignupForm />}
          {authMode === "admin-signup" && <AdminSignupForm />}
        </div>
      </div>
    </div>
  )
}
