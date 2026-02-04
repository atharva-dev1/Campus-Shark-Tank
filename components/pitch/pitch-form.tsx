"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Plus } from "lucide-react"

export function PitchForm() {
  const [formData, setFormData] = useState({
    title: "",
    tagline: "",
    category: "",
    description: "",
    problem: "",
    solution: "",
    targetMarket: "",
    businessModel: "",
    fundingGoal: "",
    timeline: "",
    teamSize: "",
  })
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [attachments, setAttachments] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const pitchData = {
      id: Date.now().toString(),
      ...formData,
      tags,
      attachments: attachments.map((file) => file.name),
      status: "pending",
      createdAt: new Date().toISOString(),
      author: {
        name: "Current Student", // TODO: Get from auth context
        email: "student@gecrajkot.ac.in",
        university: "Government Engineering College, Rajkot",
      },
      currentFunding: 0,
      investors: [],
      feedback: [],
    }

    console.log("[v0] Pitch submission:", pitchData)

    // Save to localStorage for demo purposes
    const existingPitches = JSON.parse(localStorage.getItem("pitches") || "[]")
    existingPitches.push(pitchData)
    localStorage.setItem("pitches", JSON.stringify(existingPitches))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert("Pitch submitted successfully! It will be reviewed by admins from your college.")

    // Reset form
    setFormData({
      title: "",
      tagline: "",
      category: "",
      description: "",
      problem: "",
      solution: "",
      targetMarket: "",
      businessModel: "",
      fundingGoal: "",
      timeline: "",
      teamSize: "",
    })
    setTags([])
    setAttachments([])
    setIsLoading(false)
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setAttachments([...attachments, ...files])
  }

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-balance">Submit Your Pitch</h1>
        <p className="text-muted-foreground text-lg">Share your innovative idea with the Campus Shark Tank community</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Tell us about your idea in a nutshell</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Pitch Title *</Label>
              <Input
                id="title"
                placeholder="e.g., EcoTrack - Campus Sustainability App"
                value={formData.title}
                onChange={(e) => updateFormData("title", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline *</Label>
              <Input
                id="tagline"
                placeholder="A compelling one-liner that captures your idea"
                value={formData.tagline}
                onChange={(e) => updateFormData("tagline", e.target.value)}
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select onValueChange={(value) => updateFormData("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="edtech">EdTech</SelectItem>
                    <SelectItem value="fintech">FinTech</SelectItem>
                    <SelectItem value="healthtech">HealthTech</SelectItem>
                    <SelectItem value="environmental">Environmental Tech</SelectItem>
                    <SelectItem value="social-impact">Social Impact</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="productivity">Productivity</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fundingGoal">Funding Goal (₹) *</Label>
                <Input
                  id="fundingGoal"
                  type="number"
                  placeholder="415000"
                  value={formData.fundingGoal}
                  onChange={(e) => updateFormData("fundingGoal", e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Description */}
        <Card>
          <CardHeader>
            <CardTitle>Pitch Details</CardTitle>
            <CardDescription>Provide comprehensive details about your idea</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Overview *</Label>
              <Textarea
                id="description"
                placeholder="Provide a detailed overview of your idea, what it does, and why it matters..."
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
                rows={4}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="problem">Problem Statement *</Label>
              <Textarea
                id="problem"
                placeholder="What specific problem does your idea solve? Why is this problem important?"
                value={formData.problem}
                onChange={(e) => updateFormData("problem", e.target.value)}
                rows={3}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="solution">Solution *</Label>
              <Textarea
                id="solution"
                placeholder="How does your idea solve the problem? What makes your solution unique?"
                value={formData.solution}
                onChange={(e) => updateFormData("solution", e.target.value)}
                rows={3}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Market & Business Model */}
        <Card>
          <CardHeader>
            <CardTitle>Market & Business</CardTitle>
            <CardDescription>Help us understand your target market and business approach</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="targetMarket">Target Market *</Label>
              <Textarea
                id="targetMarket"
                placeholder="Who are your target users? What's the market size and opportunity?"
                value={formData.targetMarket}
                onChange={(e) => updateFormData("targetMarket", e.target.value)}
                rows={3}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessModel">Business Model</Label>
              <Textarea
                id="businessModel"
                placeholder="How will you make money? What's your revenue strategy?"
                value={formData.businessModel}
                onChange={(e) => updateFormData("businessModel", e.target.value)}
                rows={3}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timeline">Development Timeline</Label>
                <Input
                  id="timeline"
                  placeholder="e.g., 6 months to MVP"
                  value={formData.timeline}
                  onChange={(e) => updateFormData("timeline", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teamSize">Team Size</Label>
                <Input
                  id="teamSize"
                  placeholder="e.g., 3 co-founders"
                  value={formData.teamSize}
                  onChange={(e) => updateFormData("teamSize", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
            <CardDescription>Add relevant tags to help people discover your pitch</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline" size="icon">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Attachments */}
        <Card>
          <CardHeader>
            <CardTitle>Attachments</CardTitle>
            <CardDescription>Upload pitch deck, mockups, or other supporting materials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">Drag and drop files here, or click to browse</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.ppt,.pptx,.doc,.docx,.jpg,.jpeg,.png,.gif"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Button type="button" variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                  Choose Files
                </Button>
              </div>
              {attachments.length > 0 && (
                <div className="space-y-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{file.name}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeAttachment(index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit" disabled={isLoading} className="px-8">
            {isLoading ? "Submitting..." : "Submit Pitch"}
          </Button>
        </div>
      </form>
    </div>
  )
}
