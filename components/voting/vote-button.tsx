"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface VoteButtonProps {
  initialVotes: number
  initialUserVote?: "up" | "down" | null
  variant?: "arrows" | "star"
  size?: "sm" | "md" | "lg"
  onVote?: (voteType: "up" | "down" | null, newTotal: number) => void
}

export function VoteButton({
  initialVotes,
  initialUserVote = null,
  variant = "arrows",
  size = "md",
  onVote,
}: VoteButtonProps) {
  const [votes, setVotes] = useState(initialVotes)
  const [userVote, setUserVote] = useState<"up" | "down" | null>(initialUserVote)
  const [isLoading, setIsLoading] = useState(false)

  const handleVote = async (voteType: "up" | "down") => {
    if (isLoading) return

    setIsLoading(true)

    let newVote: "up" | "down" | null = voteType
    let newVotes = votes

    // If clicking the same vote, remove it
    if (userVote === voteType) {
      newVote = null
      newVotes = votes + (voteType === "up" ? -1 : 1)
    }
    // If switching votes
    else if (userVote) {
      newVotes = votes + (voteType === "up" ? 2 : -2)
    }
    // If no previous vote
    else {
      newVotes = votes + (voteType === "up" ? 1 : -1)
    }

    setUserVote(newVote)
    setVotes(newVotes)

    // TODO: Implement actual API call
    console.log("[v0] Vote submitted:", { voteType: newVote, newTotal: newVotes })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    onVote?.(newVote, newVotes)
    setIsLoading(false)
  }

  if (variant === "star") {
    return (
      <Button
        variant="outline"
        size={size}
        onClick={() => handleVote("up")}
        disabled={isLoading}
        className={cn(
          "flex items-center gap-2 bg-transparent",
          userVote === "up" && "bg-yellow-50 border-yellow-200 text-yellow-700",
        )}
      >
        <Star className={cn("w-4 h-4", userVote === "up" && "fill-current")} />
        {votes}
      </Button>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleVote("up")}
        disabled={isLoading}
        className={cn("h-8 w-8 p-0 hover:bg-primary/10", userVote === "up" && "bg-primary/10 text-primary")}
      >
        <ChevronUp className="w-4 h-4" />
      </Button>

      <span
        className={cn(
          "text-sm font-medium py-1 min-w-[2rem] text-center",
          userVote === "up" && "text-primary",
          userVote === "down" && "text-destructive",
        )}
      >
        {votes}
      </span>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleVote("down")}
        disabled={isLoading}
        className={cn(
          "h-8 w-8 p-0 hover:bg-destructive/10",
          userVote === "down" && "bg-destructive/10 text-destructive",
        )}
      >
        <ChevronDown className="w-4 h-4" />
      </Button>
    </div>
  )
}
