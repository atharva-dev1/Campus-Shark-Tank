"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { VoteButton } from "@/components/voting/vote-button"
import { FeedbackForm } from "@/components/feedback/feedback-form"
import { FeedbackList } from "@/components/feedback/feedback-list"
import { InvestmentModal } from "@/components/wallet/investment-modal"
import {
  Star,
  DollarSign,
  Calendar,
  Users,
  Share2,
  Heart,
  MessageCircle,
  TrendingUp,
  Target,
  Lightbulb,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

const mockPitch = {
  id: "1",
  title: "Smart Campus Energy Management System",
  tagline: "IoT-based energy monitoring and optimization system for college campuses",
  author: {
    name: "Arjun Patel",
    university: "Government Engineering College (GEC) Rajkot",
    major: "Computer Engineering",
    avatar: "/diverse-student-portraits.png",
  },
  category: "Environmental Tech",
  description:
    "An intelligent energy management system that uses IoT sensors to monitor and optimize energy consumption across campus buildings. The system provides real-time analytics, automated controls, and predictive maintenance to reduce energy costs by up to 30%. This solution addresses the growing need for sustainable campus operations while providing significant cost savings.",
  problem:
    "College campuses consume enormous amounts of energy with little visibility into usage patterns. Most institutions lack real-time monitoring systems, leading to wasteful consumption, high utility bills, and missed opportunities for optimization. Manual monitoring is inefficient and reactive rather than proactive.",
  solution:
    "Our IoT-based system deploys smart sensors across campus buildings to monitor energy consumption in real-time. Machine learning algorithms analyze usage patterns and automatically optimize HVAC, lighting, and other systems. The platform provides actionable insights and predictive maintenance alerts to facility managers.",
  targetMarket:
    "Primary target is engineering colleges and universities in India with 1000+ students. With over 4000 engineering colleges nationwide and increasing focus on sustainability, the market opportunity is substantial. We'll start with Gujarat engineering colleges before expanding nationally.",
  businessModel:
    "Hardware + Software as a Service model. Initial setup cost of ₹2-5 lakhs per campus depending on size, followed by monthly subscription of ₹15,000-50,000 for software platform, analytics, and support. Revenue sharing model for energy savings achieved.",
  fundingGoal: 249000,
  currentFunding: 0,
  votes: 0,
  createdAt: "2024-01-18",
  timeline: "3 months for prototype, 8 months for pilot deployment",
  teamSize: "3 students + 1 faculty mentor",
  tags: ["iot", "energy", "sustainability", "smart-campus", "machine-learning"],
  attachments: [
    { name: "Energy_Management_Proposal.pdf", type: "pdf" },
    { name: "System_Architecture.png", type: "image" },
    { name: "Market_Analysis.docx", type: "document" },
  ],
  status: "pending" as const,
}

const mockFeedback: any[] = []

export default function PitchDetailPage() {
  const [showInvestmentModal, setShowInvestmentModal] = useState(false)
  const fundingPercentage = (mockPitch.currentFunding / mockPitch.fundingGoal) * 100
  const authorInitials = mockPitch.author.name
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold">Campus Shark Tank</h1>
          </Link>
          <Link href="/pitches">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <ArrowLeft className="w-4 h-4" />
              Back to Pitches
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="mb-2">
                    {mockPitch.category}
                  </Badge>
                  <VoteButton initialVotes={mockPitch.votes} variant="star" size="md" />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-3 text-balance">{mockPitch.title}</h1>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">{mockPitch.tagline}</p>

              <div className="flex flex-wrap gap-2">
                {mockPitch.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Author Info */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={mockPitch.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-lg">{authorInitials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{mockPitch.author.name}</h3>
                    <p className="text-muted-foreground">{mockPitch.author.major}</p>
                    <p className="text-sm text-muted-foreground">{mockPitch.author.university}</p>
                  </div>
                  <Button variant="outline">Follow</Button>
                </div>
              </CardContent>
            </Card>

            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{mockPitch.description}</p>
              </CardContent>
            </Card>

            {/* Problem & Solution */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Problem
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{mockPitch.problem}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Solution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{mockPitch.solution}</p>
                </CardContent>
              </Card>
            </div>

            {/* Market & Business Model */}
            <Card>
              <CardHeader>
                <CardTitle>Market & Business Model</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Target Market</h4>
                  <p className="text-muted-foreground leading-relaxed">{mockPitch.targetMarket}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Business Model</h4>
                  <p className="text-muted-foreground leading-relaxed">{mockPitch.businessModel}</p>
                </div>
              </CardContent>
            </Card>

            {/* Attachments */}
            <Card>
              <CardHeader>
                <CardTitle>Supporting Materials</CardTitle>
                <CardDescription>Download pitch deck and additional resources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockPitch.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">
                            {attachment.type === "pdf" ? "PDF" : attachment.type === "image" ? "IMG" : "DOC"}
                          </span>
                        </div>
                        <span className="text-sm font-medium">{attachment.name}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Feedback Section */}
            <div className="space-y-6">
              <FeedbackForm
                pitchId={mockPitch.id}
                onFeedbackSubmitted={(feedback) => {
                  console.log("[v0] New feedback:", feedback)
                }}
              />
              <FeedbackList
                feedback={mockFeedback}
                onFeedbackUpdate={(feedbackId, updates) => {
                  console.log("[v0] Feedback updated:", feedbackId, updates)
                }}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Funding Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Funding Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">${mockPitch.currentFunding.toLocaleString()}</div>
                  <div className="text-muted-foreground">raised of ₹{mockPitch.fundingGoal.toLocaleString()} goal</div>
                </div>
                <Progress value={fundingPercentage} className="h-3" />
                <div className="text-center text-sm text-muted-foreground">{Math.round(fundingPercentage)}% funded</div>
                <Button className="w-full" size="lg" onClick={() => setShowInvestmentModal(true)}>
                  Invest in This Pitch
                </Button>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Pitch Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Star className="w-4 h-4" />
                    Votes
                  </div>
                  <span className="font-semibold">{mockPitch.votes}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MessageCircle className="w-4 h-4" />
                    Feedback
                  </div>
                  <span className="font-semibold">{mockFeedback.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Posted
                  </div>
                  <span className="font-semibold">{new Date(mockPitch.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    Team Size
                  </div>
                  <span className="font-semibold">{mockPitch.teamSize}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <TrendingUp className="w-4 h-4" />
                    Timeline
                  </div>
                  <span className="font-semibold text-sm">{mockPitch.timeline}</span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Get Involved</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Leave Feedback
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share with Friends
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Users className="w-4 h-4 mr-2" />
                  Connect with Team
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Investment Modal */}
      <InvestmentModal
        isOpen={showInvestmentModal}
        onClose={() => setShowInvestmentModal(false)}
        pitch={mockPitch}
        userBalance={250} // TODO: Get from user context
        onInvestmentComplete={(amount, message) => {
          console.log("[v0] Investment completed:", { amount, message })
          // TODO: Update pitch funding and user balance
        }}
      />
    </div>
  )
}
