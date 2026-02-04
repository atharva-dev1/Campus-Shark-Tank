import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { VoteButton } from "@/components/voting/vote-button"
import { IndianRupee, Calendar, Users, MessageCircle } from "lucide-react"
import Link from "next/link"

interface PitchCardProps {
  pitch: {
    id: string
    title: string
    tagline: string
    author: {
      name: string
      avatar?: string
      university: string
    }
    category: string
    description: string
    fundingGoal: number
    currentFunding: number
    votes: number
    createdAt: string
    tags: string[]
    feedbackCount?: number
  }
}

export function PitchCard({ pitch }: PitchCardProps) {
  const fundingPercentage = (pitch.currentFunding / pitch.fundingGoal) * 100
  const authorInitials = pitch.author.name
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="outline">{pitch.category}</Badge>
          <VoteButton initialVotes={pitch.votes} variant="star" size="sm" />
        </div>
        <CardTitle className="text-lg text-balance leading-tight">{pitch.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{pitch.tagline}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="w-8 h-8">
            <AvatarImage src={pitch.author.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-xs">{authorInitials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{pitch.author.name}</p>
            <p className="text-xs text-muted-foreground truncate">{pitch.author.university}</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3 flex-1">{pitch.description}</p>

        <div className="space-y-3 mt-auto">
          <div className="flex flex-wrap gap-1">
            {pitch.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {pitch.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{pitch.tags.length - 3}
              </Badge>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <IndianRupee className="w-3 h-3" />
                <span>Funding Progress</span>
              </div>
              <span className="font-semibold">
                ₹{pitch.currentFunding.toLocaleString("en-IN")} / ₹{pitch.fundingGoal.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(pitch.createdAt).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {pitch.votes} votes
              </div>
              {pitch.feedbackCount !== undefined && (
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  {pitch.feedbackCount} feedback
                </div>
              )}
            </div>
          </div>

          <Link href={`/pitch/${pitch.id}`}>
            <Button variant="outline" className="w-full bg-transparent">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
