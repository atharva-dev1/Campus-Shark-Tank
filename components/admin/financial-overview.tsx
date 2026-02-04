import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { IndianRupee, TrendingUp, CreditCard, Wallet, ArrowUpRight, ArrowDownLeft } from "lucide-react"

interface FinancialData {
  totalVolume: number
  platformFees: number
  activeInvestments: number
  completedTransactions: number
  pendingWithdrawals: number
  monthlyGrowth: number
  topCategories: Array<{
    category: string
    amount: number
    percentage: number
  }>
  recentTransactions: Array<{
    id: string
    type: "investment" | "withdrawal" | "fee"
    amount: number
    user: string
    pitch?: string
    date: string
    status: "completed" | "pending" | "failed"
  }>
}

interface FinancialOverviewProps {
  data: FinancialData
}

export function FinancialOverview({ data }: FinancialOverviewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Financial Overview</h2>
        <p className="text-muted-foreground">Platform financial metrics and transaction monitoring</p>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Volume</p>
                <p className="text-2xl font-bold">₹{data.totalVolume.toLocaleString("en-IN")}</p>
                <div className="flex items-center gap-1 text-xs">
                  <TrendingUp className="w-3 h-3 text-accent" />
                  <span className="text-accent">+{data.monthlyGrowth}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <Wallet className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Platform Fees</p>
                <p className="text-2xl font-bold">₹{data.platformFees.toLocaleString("en-IN")}</p>
                <p className="text-xs text-muted-foreground">2% of transactions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Investments</p>
                <p className="text-2xl font-bold">{data.activeInvestments}</p>
                <p className="text-xs text-muted-foreground">Currently funded</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <ArrowDownLeft className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Withdrawals</p>
                <p className="text-2xl font-bold">{data.pendingWithdrawals}</p>
                <p className="text-xs text-yellow-600">Needs processing</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Funding by Category</CardTitle>
          <CardDescription>Investment distribution across pitch categories</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.topCategories.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{category.category}</span>
                <span className="text-muted-foreground">
                  ₹{category.amount.toLocaleString("en-IN")} ({category.percentage}%)
                </span>
              </div>
              <Progress value={category.percentage} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest financial activity on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  {transaction.type === "investment" ? (
                    <ArrowUpRight className="w-4 h-4 text-primary" />
                  ) : transaction.type === "withdrawal" ? (
                    <ArrowDownLeft className="w-4 h-4 text-destructive" />
                  ) : (
                    <IndianRupee className="w-4 h-4 text-accent" />
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">
                      {transaction.type === "investment" && "Investment"}
                      {transaction.type === "withdrawal" && "Withdrawal"}
                      {transaction.type === "fee" && "Platform Fee"}
                    </p>
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-semibold ${
                          transaction.type === "withdrawal" ? "text-destructive" : "text-accent"
                        }`}
                      >
                        {transaction.type === "withdrawal" ? "-" : "+"}₹{transaction.amount.toLocaleString("en-IN")}
                      </span>
                      <Badge
                        variant={
                          transaction.status === "completed"
                            ? "secondary"
                            : transaction.status === "pending"
                              ? "outline"
                              : "destructive"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      {transaction.user}
                      {transaction.pitch && ` • ${transaction.pitch}`}
                    </span>
                    <span>{new Date(transaction.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
