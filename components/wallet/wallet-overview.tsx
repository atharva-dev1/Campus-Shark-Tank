"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, Plus, TrendingUp, IndianRupee, CreditCard, ArrowUpRight } from "lucide-react"

interface WalletOverviewProps {
  balance: number
  totalInvested: number
  totalEarned: number
  activeInvestments: number
}

export function WalletOverview({ balance, totalInvested, totalEarned, activeInvestments }: WalletOverviewProps) {
  const [showAddFunds, setShowAddFunds] = useState(false)

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <Card className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              <CardTitle>Wallet Balance</CardTitle>
            </div>
            <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-4xl font-bold">₹{balance.toLocaleString("en-IN")}</div>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowAddFunds(true)}
                className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Funds
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Withdraw
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Invested</p>
                <p className="text-2xl font-bold">₹{totalInvested.toLocaleString("en-IN")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Earned</p>
                <p className="text-2xl font-bold text-accent">₹{totalEarned.toLocaleString("en-IN")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Investments</p>
                <p className="text-2xl font-bold">{activeInvestments}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Funds Modal Placeholder */}
      {showAddFunds && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Add Funds to Wallet</CardTitle>
            <CardDescription>Choose how much you'd like to add to your investment wallet</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[2000, 4000, 8000].map((amount) => (
                <Button key={amount} variant="outline" className="h-12 bg-transparent">
                  ₹{amount.toLocaleString("en-IN")}
                </Button>
              ))}
            </div>
            <div className="flex gap-3">
              <Button className="flex-1">Add Funds</Button>
              <Button variant="outline" onClick={() => setShowAddFunds(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
