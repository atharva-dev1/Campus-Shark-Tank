import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Lightbulb, IndianRupee, MessageCircle, AlertTriangle, CheckCircle, Clock } from "lucide-react"

interface AdminOverviewProps {
  stats: {
    totalUsers: number
    activeUsers: number
    totalPitches: number
    pendingPitches: number
    totalFunding: number
    totalTransactions: number
    feedbackCount: number
    reportedContent: number
  }
}

export function AdminOverview({ stats }: AdminOverviewProps) {
  const userGrowthRate = 12.5 // Mock growth rate
  const fundingGrowthRate = 8.3 // Mock growth rate

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-accent">+{userGrowthRate}% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Pitches</p>
                <p className="text-2xl font-bold">{stats.totalPitches}</p>
                <p className="text-xs text-muted-foreground">{stats.pendingPitches} pending</p>
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
                <p className="text-sm text-muted-foreground">Total Funding</p>
                <p className="text-2xl font-bold">₹{stats.totalFunding.toLocaleString("en-IN")}</p>
                <p className="text-xs text-accent">+{fundingGrowthRate}% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reports</p>
                <p className="text-2xl font-bold">{stats.reportedContent}</p>
                <p className="text-xs text-destructive">Needs attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Platform Activity</CardTitle>
            <CardDescription>Recent activity across the platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Active Users (24h)</span>
              </div>
              <span className="font-semibold">{stats.activeUsers}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">New Feedback</span>
              </div>
              <span className="font-semibold">{stats.feedbackCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Transactions (24h)</span>
              </div>
              <span className="font-semibold">{stats.totalTransactions}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Moderation</CardTitle>
            <CardDescription>Items requiring admin attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">Pending Pitches</span>
              </div>
              <Badge variant="secondary">{stats.pendingPitches}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <span className="text-sm">Reported Content</span>
              </div>
              <Badge variant="destructive">{stats.reportedContent}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span className="text-sm">Resolved Today</span>
              </div>
              <Badge variant="secondary">12</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Health */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Health</CardTitle>
          <CardDescription>Key performance indicators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>User Engagement Rate</span>
              <span className="font-semibold">78%</span>
            </div>
            <Progress value={78} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Pitch Success Rate</span>
              <span className="font-semibold">64%</span>
            </div>
            <Progress value={64} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Average Funding per Pitch</span>
              <span className="font-semibold">₹{(194000).toLocaleString("en-IN")}</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
