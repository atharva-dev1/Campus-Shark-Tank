import { PitchCard } from "@/components/pitch/pitch-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Plus, Lightbulb } from "lucide-react"
import Link from "next/link"

// Mock data - in real app this would come from API
const mockPitches = [
  {
    id: "1",
    title: "Smart Campus Energy Management System",
    tagline: "IoT-based energy monitoring and optimization system for college campuses",
    author: {
      name: "Arjun Patel",
      university: "Government Engineering College (GEC) Rajkot",
    },
    category: "Environmental Tech",
    description:
      "An intelligent energy management system that uses IoT sensors to monitor and optimize energy consumption across campus buildings. The system provides real-time analytics, automated controls, and predictive maintenance to reduce energy costs by up to 30%.",
    fundingGoal: 249000,
    currentFunding: 0,
    votes: 0,
    createdAt: "2024-01-18",
    tags: ["iot", "energy", "sustainability", "smart-campus"],
    status: "pending" as const,
  },
]

export default function PitchesPage() {
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
          <div className="flex items-center gap-3">
            <Link href="/pitch/new">
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Submit Pitch
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-balance">Discover Student Pitches</h1>
          <p className="text-muted-foreground text-lg">
            Explore innovative ideas from students across the country and support the next big thing
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search pitches..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="edtech">EdTech</SelectItem>
                <SelectItem value="fintech">FinTech</SelectItem>
                <SelectItem value="healthtech">HealthTech</SelectItem>
                <SelectItem value="environmental">Environmental Tech</SelectItem>
                <SelectItem value="social-impact">Social Impact</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="productivity">Productivity</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="funded">Most Funded</SelectItem>
                <SelectItem value="goal">Funding Goal</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          {/* Popular Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Popular tags:</span>
            {["ai", "sustainability", "education", "mobile-app", "social-impact", "blockchain"].map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card p-4 rounded-lg border">
            <div className="text-2xl font-bold text-primary">{mockPitches.length}</div>
            <div className="text-sm text-muted-foreground">Active Pitches</div>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="text-2xl font-bold text-primary">
              ₹{mockPitches.reduce((sum, pitch) => sum + pitch.currentFunding, 0).toLocaleString("en-IN")}
            </div>
            <div className="text-sm text-muted-foreground">Total Raised</div>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="text-2xl font-bold text-primary">
              {mockPitches.reduce((sum, pitch) => sum + pitch.votes, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Votes</div>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="text-2xl font-bold text-primary">1</div>
            <div className="text-sm text-muted-foreground">Universities</div>
          </div>
        </div>

        {/* Pitches Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPitches.map((pitch) => (
            <PitchCard key={pitch.id} pitch={pitch} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Pitches
          </Button>
        </div>
      </div>
    </div>
  )
}
