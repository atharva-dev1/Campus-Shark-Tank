"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { IndianRupee, TrendingUp, Users, Target } from "lucide-react"

interface InvestmentModalProps {
  isOpen: boolean
  onClose: () => void
  pitch: {
    id: string
    title: string
    author: { name: string; university: string }
    fundingGoal: number
    currentFunding: number
    category: string
    investors?: any[]
  }
  userBalance: number
  onInvestmentComplete?: (amount: number, message?: string) => void
}

export function InvestmentModal({ isOpen, onClose, pitch, userBalance, onInvestmentComplete }: InvestmentModalProps) {
  const [amount, setAmount] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const fundingPercentage = (pitch.currentFunding / pitch.fundingGoal) * 100
  const remainingFunding = pitch.fundingGoal - pitch.currentFunding
  const investmentAmount = Number.parseFloat(amount) || 0

  const handleInvest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (investmentAmount <= 0 || investmentAmount > userBalance) return

    setIsLoading(true)

    const investmentData = {
      id: Date.now().toString(),
      pitchId: pitch.id,
      amount: investmentAmount,
      message,
      investorName: "Current User", // TODO: Get from auth context
      investorEmail: "investor@gecrajkot.ac.in",
      createdAt: new Date().toISOString(),
      status: "completed",
    }

    console.log("[v0] Investment completed:", investmentData)

    // Save investment to localStorage
    const existingInvestments = JSON.parse(localStorage.getItem("investments") || "[]")
    existingInvestments.push(investmentData)
    localStorage.setItem("investments", JSON.stringify(existingInvestments))

    // Update pitch funding
    const pitches = JSON.parse(localStorage.getItem("pitches") || "[]")
    const updatedPitches = pitches.map((p: any) => {
      if (p.id === pitch.id) {
        return {
          ...p,
          currentFunding: p.currentFunding + investmentAmount,
          investors: [...(p.investors || []), investmentData],
        }
      }
      return p
    })
    localStorage.setItem("pitches", JSON.stringify(updatedPitches))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    onInvestmentComplete?.(investmentAmount, message)
    setIsLoading(false)
    onClose()
    setAmount("")
    setMessage("")

    alert(`Investment of ₹${investmentAmount.toLocaleString("en-IN")} completed successfully!`)
  }

  const quickAmounts = [830, 2075, 4150, 8300].filter((amt) => amt <= userBalance && amt <= remainingFunding)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Invest in {pitch.title}</DialogTitle>
          <DialogDescription>Support this innovative idea and help bring it to life</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Pitch Summary */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-balance">{pitch.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    by {pitch.author.name} • {pitch.author.university}
                  </p>
                </div>
                <Badge variant="outline">{pitch.category}</Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Funding Progress</span>
                  <span className="font-semibold">
                    ₹{pitch.currentFunding.toLocaleString("en-IN")} / ₹{pitch.fundingGoal.toLocaleString("en-IN")}
                  </span>
                </div>
                <Progress value={fundingPercentage} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{Math.round(fundingPercentage)}% funded</span>
                  <span>₹{remainingFunding.toLocaleString("en-IN")} remaining</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investment Form */}
          <form onSubmit={handleInvest} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="amount">Investment Amount</Label>
                <span className="text-sm text-muted-foreground">Balance: ₹{userBalance.toLocaleString("en-IN")}</span>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-10"
                    min="1"
                    max={Math.min(userBalance, remainingFunding)}
                    step="0.01"
                    required
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {quickAmounts.map((quickAmount) => (
                    <Button
                      key={quickAmount}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount(quickAmount.toString())}
                    >
                      ₹{quickAmount.toLocaleString("en-IN")}
                    </Button>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(Math.min(userBalance, remainingFunding).toString())}
                  >
                    Max
                  </Button>
                </div>
              </div>

              {investmentAmount > 0 && (
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Investment Amount:</span>
                    <span className="font-semibold">₹{investmentAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Platform Fee (2%):</span>
                    <span className="font-semibold">₹{(investmentAmount * 0.02).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-semibold border-t pt-2">
                    <span>Total:</span>
                    <span>₹{(investmentAmount * 1.02).toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message to Entrepreneur (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Share your thoughts, encouragement, or advice..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                className="flex-1"
                disabled={isLoading || investmentAmount <= 0 || investmentAmount > userBalance}
              >
                {isLoading ? "Processing..." : `Invest ₹${investmentAmount.toLocaleString("en-IN")}`}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>

          {/* Investment Benefits */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-base">Why Invest?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>Support innovative student entrepreneurs</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Users className="w-4 h-4 text-primary" />
                <span>Get updates on project progress</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Target className="w-4 h-4 text-primary" />
                <span>Potential returns when projects succeed</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
