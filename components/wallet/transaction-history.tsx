import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownLeft, Plus, Minus } from "lucide-react"

interface Transaction {
  id: string
  type: "investment" | "deposit" | "withdrawal" | "return"
  amount: number
  description: string
  date: string
  status: "completed" | "pending" | "failed"
  relatedPitch?: {
    id: string
    title: string
    author: string
  }
}

interface TransactionHistoryProps {
  transactions: Transaction[]
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const getTransactionIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "investment":
        return <ArrowUpRight className="w-4 h-4 text-primary" />
      case "deposit":
        return <Plus className="w-4 h-4 text-accent" />
      case "withdrawal":
        return <Minus className="w-4 h-4 text-destructive" />
      case "return":
        return <ArrowDownLeft className="w-4 h-4 text-accent" />
      default:
        return <ArrowUpRight className="w-4 h-4" />
    }
  }

  const getTransactionColor = (type: Transaction["type"]) => {
    switch (type) {
      case "investment":
      case "withdrawal":
        return "text-destructive"
      case "deposit":
      case "return":
        return "text-accent"
      default:
        return "text-foreground"
    }
  }

  const getStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="secondary" className="bg-accent/10 text-accent">
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        )
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return null
    }
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">No transactions yet. Start investing to see your activity here!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>Your recent wallet activity and investments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                {getTransactionIcon(transaction.type)}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{transaction.description}</p>
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                      {transaction.type === "deposit" || transaction.type === "return" ? "+" : "-"}$
                      {transaction.amount.toLocaleString()}
                    </span>
                    {getStatusBadge(transaction.status)}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{new Date(transaction.date).toLocaleDateString()}</span>
                  {transaction.relatedPitch && (
                    <span className="text-xs">
                      Related to: {transaction.relatedPitch.title} by {transaction.relatedPitch.author}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
