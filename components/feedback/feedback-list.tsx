"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { VoteButton } from "@/components/voting/vote-button"
import { Reply, Flag, MoreHorizontal } from "lucide-react"

interface Feedback {
  id: string
  content: string
  category?: string
  isAnonymous: boolean
  createdAt: string
  author?: {
    name: string
    avatar?: string
    university?: string
  }
  votes: number
  userVote?: "up" | "down" | null
  replies?: Feedback[]
}

interface FeedbackListProps {
  feedback: Feedback[]
  onFeedbackUpdate?: (feedbackId: string, updates: Partial<Feedback>) => void
}

export function FeedbackList({ feedback, onFeedbackUpdate }: FeedbackListProps) {
  const [sortBy, setSortBy] = useState<"recent" | "popular">("recent")

  const sortedFeedback = [...feedback].sort((a, b) => {
    if (sortBy === "popular") {
      return b.votes - a.votes
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const handleVote = (feedbackId: string, voteType: "up" | "down" | null, newTotal: number) => {
    onFeedbackUpdate?.(feedbackId, { votes: newTotal, userVote: voteType })
  }

  if (feedback.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">No feedback yet. Be the first to share your thoughts!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Community Feedback ({feedback.length})</h3>
        <div className="flex gap-2">
          <Button variant={sortBy === "recent" ? "default" : "outline"} size="sm" onClick={() => setSortBy("recent")}>
            Recent
          </Button>
          <Button variant={sortBy === "popular" ? "default" : "outline"} size="sm" onClick={() => setSortBy("popular")}>
            Popular
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {sortedFeedback.map((item) => (
          <FeedbackItem
            key={item.id}
            feedback={item}
            onVote={(voteType, newTotal) => handleVote(item.id, voteType, newTotal)}
          />
        ))}
      </div>
    </div>
  )
}

function FeedbackItem({
  feedback,
  onVote,
}: {
  feedback: Feedback
  onVote: (voteType: "up" | "down" | null, newTotal: number) => void
}) {
  const [showReplyForm, setShowReplyForm] = useState(false)

  const authorInitials =
    feedback.author?.name
      .split(" ")
      .map((n) => n[0])
      .join("") || "A"

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <VoteButton
              initialVotes={feedback.votes}
              initialUserVote={feedback.userVote}
              variant="arrows"
              onVote={onVote}
            />
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {feedback.isAnonymous ? (
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium">?</span>
                  </div>
                ) : (
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={feedback.author?.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">{authorInitials}</AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <p className="text-sm font-medium">{feedback.isAnonymous ? "Anonymous" : feedback.author?.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{new Date(feedback.createdAt).toLocaleDateString()}</span>
                    {feedback.category && (
                      <Badge variant="secondary" className="text-xs">
                        {feedback.category}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-sm leading-relaxed">{feedback.content}</p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="h-auto p-0 text-xs hover:text-foreground"
              >
                <Reply className="w-3 h-3 mr-1" />
                Reply
              </Button>
              <Button variant="ghost" size="sm" className="h-auto p-0 text-xs hover:text-foreground">
                <Flag className="w-3 h-3 mr-1" />
                Report
              </Button>
            </div>

            {showReplyForm && (
              <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-2">Reply functionality coming soon...</p>
              </div>
            )}

            {feedback.replies && feedback.replies.length > 0 && (
              <div className="ml-4 space-y-3 border-l-2 border-muted pl-4">
                {feedback.replies.map((reply) => (
                  <FeedbackItem
                    key={reply.id}
                    feedback={reply}
                    onVote={() => {}} // Replies don't have voting for now
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
