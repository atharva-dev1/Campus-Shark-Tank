"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Shield } from "lucide-react"

const MOCK_USERS = [
  {
    email: "admin1@gecrajkot.ac.in",
    password: "admin123",
    role: "admin",
    name: "Dr. Rajesh Patel",
    college: "Government Engineering College (GEC) Rajkot",
  },
  {
    email: "admin2@gecrajkot.ac.in",
    password: "admin123",
    role: "admin",
    name: "Prof. Meera Shah",
    college: "Government Engineering College (GEC) Rajkot",
  },
  {
    email: "admin3@gecrajkot.ac.in",
    password: "admin123",
    role: "admin",
    name: "Dr. Kiran Modi",
    college: "Government Engineering College (GEC) Rajkot",
  },
  {
    email: "admin4@gecrajkot.ac.in",
    password: "admin123",
    role: "admin",
    name: "Prof. Amit Joshi",
    college: "Government Engineering College (GEC) Rajkot",
  },
  {
    email: "student@gecrajkot.ac.in",
    password: "student123",
    role: "student",
    name: "Arjun Patel",
    college: "Government Engineering College (GEC) Rajkot",
  },
]

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    console.log("[v0] Login attempt:", { email })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check credentials against mock database
    const user = MOCK_USERS.find((u) => u.email === email && u.password === password)

    if (user) {
      console.log("[v0] Login successful:", { email: user.email, role: user.role })

      // Store user info in localStorage (in real app, use proper auth tokens)
      localStorage.setItem("user", JSON.stringify(user))

      // Redirect based on role
      if (user.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/pitches")
      }
    } else {
      setError("Invalid email or password")
    }

    setIsLoading(false)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-balance">Welcome Back</CardTitle>
        <CardDescription className="text-muted-foreground">Sign in to your Campus Shark Tank account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">{error}</div>}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Demo Credentials - GEC Rajkot
          </h4>
          <div className="space-y-2 text-xs text-gray-600">
            <div>
              <strong>Admin 1:</strong> admin1@gecrajkot.ac.in / admin123
            </div>
            <div>
              <strong>Admin 2:</strong> admin2@gecrajkot.ac.in / admin123
            </div>
            <div>
              <strong>Admin 3:</strong> admin3@gecrajkot.ac.in / admin123
            </div>
            <div>
              <strong>Admin 4:</strong> admin4@gecrajkot.ac.in / admin123
            </div>
            <div>
              <strong>Student:</strong> student@gecrajkot.ac.in / student123
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <Button variant="link" className="p-0 h-auto font-semibold">
            Sign up
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
