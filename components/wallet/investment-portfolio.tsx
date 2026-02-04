import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TrendingUp, TrendingDown, IndianRupee } from "lucide-react"
import Link from "next/link"

interface Investment {
  id: string
  pitchId: string
  pitchTitle: string
  pitchAuthor: {
    name: string
    avatar?: string
    university: string
  }
  category: string
  amountInvested: number
  currentValue: number
  investmentDate: string
  status: "active" | "completed" | "failed"
  fundingProgress: {
    current: number
    goal: number
  }
}

interface InvestmentPortfolioProps {
  investments: Investment[]
}

export function InvestmentPortfolio({ investments }: InvestmentPortfolioProps) {
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amountInvested, 0)
  const totalCurrentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0)
  const totalReturn = totalCurrentValue - totalInvested
  const returnPercentage = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0

  if (investments.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground mb-4">You haven't made any investments yet.</p>
          <Link href="/pitches">
            <Button>Browse Pitches</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IndianRupee className="w-5 h-5" />
            Investment Portfolio
          </CardTitle>
          <CardDescription>Track your investments and returns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Invested</p>
              <p className="text-2xl font-bold">₹{totalInvested.toLocaleString("en-IN")}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Current Value</p>
              <p className="text-2xl font-bold">₹{totalCurrentValue.toLocaleString("en-IN")}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Return</p>
              <div className="flex items-center justify-center gap-1">
                <p className={`text-2xl font-bold ${totalReturn >= 0 ? "text-accent" : "text-destructive"}`}>
                  {totalReturn >= 0 ? "+" : ""}₹{totalReturn.toLocaleString("en-IN")}
                </p>
                {totalReturn >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-accent" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-destructive" />
                )}
              </div>
              <p className={`text-sm ${returnPercentage >= 0 ? "text-accent" : "text-destructive"}`}>
                {returnPercentage >= 0 ? "+" : ""}
                {returnPercentage.toFixed(1)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Investments */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Your Investments ({investments.length})</h3>
        <div className="space-y-4">
          {investments.map((investment) => {
            const returnAmount = investment.currentValue - investment.amountInvested
            const returnPercentage = (returnAmount / investment.amountInvested) * 100
            const fundingPercentage = (investment.fundingProgress.current / investment.fundingProgress.goal) * 100
            const authorInitials = investment.pitchAuthor.name
              .split(" ")
              .map((n) => n[0])
              .join("")

            return (
              <Card key={investment.id}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={investment.pitchAuthor.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">{authorInitials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-balance">{investment.pitchTitle}</h4>
                          <p className="text-sm text-muted-foreground">
                            by {investment.pitchAuthor.name} • {investment.pitchAuthor.university}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{investment.category}</Badge>
                        <Badge
                          variant={
                            investment.status === "active"
                              ? "secondary"
                              : investment.status === "completed"
                                ? "default"
                                : "destructive"
                          }
                        >
                          {investment.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Invested</p>
                        <p className="font-semibold">₹{investment.amountInvested.toLocaleString("en-IN")}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Current Value</p>
                        <p className="font-semibold">₹{investment.currentValue.toLocaleString("en-IN")}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Return</p>
                        <p className={`font-semibold ${returnAmount >= 0 ? "text-accent" : "text-destructive"}`}>
                          {returnAmount >= 0 ? "+" : ""}₹{returnAmount.toLocaleString("en-IN")} (
                          {returnPercentage.toFixed(1)}%)
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Date</p>
                        <p className="font-semibold">{new Date(investment.investmentDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Funding Progress</span>
                        <span className="font-semibold">
                          ₹{investment.fundingProgress.current.toLocaleString("en-IN")} / ₹
                          {investment.fundingProgress.goal.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <Progress value={fundingPercentage} className="h-2" />
                    </div>

                    <div className="flex justify-end">
                      <Link href={`/pitch/${investment.pitchId}`}>
                        <Button variant="outline" size="sm">
                          View Pitch
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
