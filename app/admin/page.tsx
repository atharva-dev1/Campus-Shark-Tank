import { AdminOverview } from "@/components/admin/admin-overview"
import { PitchManagement } from "@/components/admin/pitch-management"
import { UserManagement } from "@/components/admin/user-management"
import { FinancialOverview } from "@/components/admin/financial-overview"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Lightbulb, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock data - in real app this would come from API
const mockStats = {
  totalUsers: 5, // Updated to reflect actual user count
  activeUsers: 5,
  totalPitches: 1, // Updated to reflect actual pitch count
  pendingPitches: 1,
  totalFunding: 0, // No funding yet
  totalTransactions: 0,
  feedbackCount: 0,
  reportedContent: 0,
}

const mockPitches = [
  {
    id: "1",
    title: "Smart Campus Energy Management System",
    author: {
      name: "Arjun Patel",
      email: "student@gecrajkot.ac.in",
      university: "Government Engineering College (GEC) Rajkot",
      avatar: "/diverse-student-portraits.png",
    },
    category: "Environmental Tech",
    status: "pending" as const,
    fundingGoal: 249000,
    currentFunding: 0,
    submittedAt: "2024-01-18T10:00:00Z",
    votes: 0,
    reportCount: 0,
    assignedAdmin: "admin1@gecrajkot.ac.in", // Assigned to first admin from same college
  },
]

const mockUsers = [
  {
    id: "1",
    name: "Arjun Patel",
    email: "student@gecrajkot.ac.in",
    university: "Government Engineering College (GEC) Rajkot",
    major: "Computer Engineering",
    avatar: "/diverse-student-portraits.png",
    status: "active" as const,
    role: "student" as const,
    joinedAt: "2024-01-01T00:00:00Z",
    lastActive: "2024-01-18T15:30:00Z",
    pitchCount: 1,
    investmentCount: 0,
    totalInvested: 0,
    reportCount: 0,
  },
  {
    id: "2",
    name: "Dr. Rajesh Patel",
    email: "admin1@gecrajkot.ac.in",
    university: "Government Engineering College (GEC) Rajkot",
    major: "Administration",
    status: "active" as const,
    role: "admin" as const,
    joinedAt: "2023-11-01T00:00:00Z",
    lastActive: "2024-01-18T16:00:00Z",
    pitchCount: 0,
    investmentCount: 0,
    totalInvested: 0,
    reportCount: 0,
  },
  {
    id: "3",
    name: "Prof. Meera Shah",
    email: "admin2@gecrajkot.ac.in",
    university: "Government Engineering College (GEC) Rajkot",
    major: "Administration",
    status: "active" as const,
    role: "admin" as const,
    joinedAt: "2023-11-01T00:00:00Z",
    lastActive: "2024-01-18T15:45:00Z",
    pitchCount: 0,
    investmentCount: 0,
    totalInvested: 0,
    reportCount: 0,
  },
  {
    id: "4",
    name: "Dr. Kiran Modi",
    email: "admin3@gecrajkot.ac.in",
    university: "Government Engineering College (GEC) Rajkot",
    major: "Administration",
    status: "active" as const,
    role: "admin" as const,
    joinedAt: "2023-11-01T00:00:00Z",
    lastActive: "2024-01-18T14:20:00Z",
    pitchCount: 0,
    investmentCount: 0,
    totalInvested: 0,
    reportCount: 0,
  },
  {
    id: "5",
    name: "Prof. Amit Joshi",
    email: "admin4@gecrajkot.ac.in",
    university: "Government Engineering College (GEC) Rajkot",
    major: "Administration",
    status: "active" as const,
    role: "admin" as const,
    joinedAt: "2023-11-01T00:00:00Z",
    lastActive: "2024-01-18T13:10:00Z",
    pitchCount: 0,
    investmentCount: 0,
    totalInvested: 0,
    reportCount: 0,
  },
]

const mockFinancialData = {
  totalVolume: 10375000,
  platformFees: 207500,
  activeInvestments: 45,
  completedTransactions: 234,
  pendingWithdrawals: 8,
  monthlyGrowth: 12.5,
  topCategories: [
    { category: "EdTech", amount: 3735000, percentage: 36 },
    { category: "Environmental Tech", amount: 2656000, percentage: 26 },
    { category: "FinTech", amount: 2075000, percentage: 20 },
    { category: "HealthTech", amount: 1245000, percentage: 12 },
    { category: "Social Impact", amount: 664000, percentage: 6 },
  ],
  recentTransactions: [
    {
      id: "1",
      type: "investment" as const,
      amount: 4150,
      user: "Alex Johnson",
      pitch: "EcoTrack App",
      date: "2024-01-18T14:30:00Z",
      status: "completed" as const,
    },
    {
      id: "2",
      type: "withdrawal" as const,
      amount: 16600,
      user: "Sarah Chen",
      date: "2024-01-18T12:15:00Z",
      status: "pending" as const,
    },
    {
      id: "3",
      type: "fee" as const,
      amount: 83,
      user: "Platform",
      date: "2024-01-18T14:30:00Z",
      status: "completed" as const,
    },
  ],
}

export default function AdminPage() {
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
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Admin Panel - GEC Rajkot</span>
            </div>
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <ArrowLeft className="w-4 h-4" />
                Back to Site
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-balance">Admin Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Manage and monitor pitches from Government Engineering College (GEC) Rajkot
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pitches">Pitches</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <AdminOverview stats={mockStats} />
          </TabsContent>

          <TabsContent value="pitches" className="space-y-6">
            <PitchManagement pitches={mockPitches} />
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <UserManagement users={mockUsers} />
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            <FinancialOverview data={mockFinancialData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
