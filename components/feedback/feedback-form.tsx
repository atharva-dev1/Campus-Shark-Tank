"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle, Send } from "lucide-react"

interface FeedbackFormProps {
  pitchId: string
  onFeedbackSubmitted?: (feedback: any) => void
}

export function FeedbackForm({ pitchId, onFeedbackSubmitted }: FeedbackFormProps) {
  const [feedback, setFeedback] = useState("")
  const [category, setCategory] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!feedback.trim()) return

    setIsLoading(true)

    const newFeedback = {
      id: Date.now().toString(),
      content: feedback,
      category,
      isAnonymous,
      pitchId,
      createdAt: new Date().toISOString(),
      author: isAnonymous
        ? null
        : {
            name: "Current User", // TODO: Get from auth context
            avatar: "/placeholder.svg",
            email: "user@gecrajkot.ac.in",
          },
    }

    console.log("[v0] Feedback submitted:", newFeedback)

    const existingFeedback = JSON.parse(localStorage.getItem("feedback") || "[]")
    existingFeedback.push(newFeedback)
    localStorage.setItem("feedback", JSON.stringify(existingFeedback))

    // Update pitch with new feedback
    const pitches = JSON.parse(localStorage.getItem("pitches") || "[]")
    const updatedPitches = pitches.map((p: any) => {
      if (p.id === pitchId) {
        return {
          ...p,
          feedback: [...(p.feedback || []), newFeedback],
        }
      }
      return p
    })
    localStorage.setItem("pitches", JSON.stringify(updatedPitches))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onFeedbackSubmitted?.(newFeedback)
    setFeedback("")
    setCategory("")
    setIsLoading(false)

    alert("Feedback submitted successfully!")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Leave Feedback
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Select onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Feedback category (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Feedback</SelectItem>
                <SelectItem value="business-model">Business Model</SelectItem>
                <SelectItem value="market-fit">Market Fit</SelectItem>
                <SelectItem value="technical">Technical Approach</SelectItem>
                <SelectItem value="presentation">Presentation</SelectItem>
                <SelectItem value="team">Team & Execution</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Textarea
            placeholder="Share your thoughts, suggestions, or questions about this pitch..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={4}
            required
          />

          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAnonymous(!isAnonymous)}
              className={isAnonymous ? "bg-muted" : "bg-transparent"}
            >
              {isAnonymous ? "Anonymous" : "Public"}
            </Button>

            <Button type="submit" disabled={isLoading || !feedback.trim()}>
              {isLoading ? (
                "Posting..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Post Feedback
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
