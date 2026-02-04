"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Shield, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { indianColleges } from "@/data/indian-colleges"

export function AdminSignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    university: "",
    position: "",
    department: "",
    password: "",
    confirmPassword: "",
    reason: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    console.log("[v0] Admin signup request:", formData)

    try {
      const response = await fetch("/api/admin/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        console.log("[v0] Real email sent to campussharktanka@gmail.com with approval options")
        setSubmitted(true)
      } else {
        console.error("[v0] Failed to send approval email:", result.error)
        // Handle error - could show error message to user
      }
    } catch (error) {
      console.error("[v0] Error submitting admin request:", error)
      // Handle error - could show error message to user
    }

    setIsLoading(false)
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (submitted) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-balance">Request Submitted</CardTitle>
          <CardDescription className="text-muted-foreground">
            Your admin access request has been sent for approval
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Your request has been sent to <strong>campussharktanka@gmail.com</strong> for review. You will receive a
              temporary password via email once approved.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-6 h-6 text-emerald-600" />
        </div>
        <CardTitle className="text-2xl font-bold text-balance">Admin Access Request</CardTitle>
        <CardDescription className="text-muted-foreground">
          Request administrative access to Campus Shark Tank
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => updateFormData("firstName", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => updateFormData("lastName", e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Official Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@university.edu"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="university">University/Institution</Label>
            <Select onValueChange={(value) => updateFormData("university", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your institution" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {indianColleges.map((college, index) => (
                  <SelectItem key={index} value={college.name}>
                    {college.name} ({college.type})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Position/Role</Label>
            <Select onValueChange={(value) => updateFormData("position", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professor">Professor</SelectItem>
                <SelectItem value="associate-professor">Associate Professor</SelectItem>
                <SelectItem value="assistant-professor">Assistant Professor</SelectItem>
                <SelectItem value="dean">Dean</SelectItem>
                <SelectItem value="hod">Head of Department</SelectItem>
                <SelectItem value="coordinator">Program Coordinator</SelectItem>
                <SelectItem value="admin-staff">Administrative Staff</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              placeholder="Computer Science, Business, etc."
              value={formData.department}
              onChange={(e) => updateFormData("department", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Admin Access</Label>
            <Input
              id="reason"
              placeholder="Managing student entrepreneurship program..."
              value={formData.reason}
              onChange={(e) => updateFormData("reason", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => updateFormData("password", e.target.value)}
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
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Submitting Request..." : "Request Admin Access"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
