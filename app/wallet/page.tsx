import { WalletOverview } from "@/components/wallet/wallet-overview"
import { TransactionHistory } from "@/components/wallet/transaction-history"
import { InvestmentPortfolio } from "@/components/wallet/investment-portfolio"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock data - in real app this would come from API
const mockWalletData = {
  balance: 20750,
  totalInvested: 37350,
  totalEarned: 6225,
  activeInvestments: 6,
}

const mockTransactions = [
  {
    id: "1",
    type: "investment" as const,
    amount: 4150,
    description: "Investment in EcoTrack - Campus Sustainability App",
    date: "2024-01-16T10:30:00Z",
    status: "completed" as const,
    relatedPitch: {
      id: "1",
      title: "EcoTrack - Campus Sustainability App",
      author: "Sarah Chen",
    },
  },
  {
    id: "2",
    type: "deposit" as const,
    amount: 8300,
    description: "Wallet deposit via credit card",
    date: "2024-01-15T14:20:00Z",
    status: "completed" as const,
  },
  {
    id: "3",
    type: "investment" as const,
    amount: 2075,
    description: "Investment in StudyBuddy AI Tutor",
    date: "2024-01-14T16:45:00Z",
    status: "completed" as const,
    relatedPitch: {
      id: "2",
      title: "StudyBuddy AI Tutor",
      author: "Marcus Johnson",
    },
  },
  {
    id: "4",
    type: "return" as const,
    amount: 1245,
    description: "Return from CampusEats Food Sharing",
    date: "2024-01-12T11:15:00Z",
    status: "completed" as const,
    relatedPitch: {
      id: "3",
      title: "CampusEats Food Sharing",
      author: "Priya Patel",
    },
  },
  {
    id: "5",
    type: "deposit" as const,
    amount: 16600,
    description: "Initial wallet setup",
    date: "2024-01-10T09:00:00Z",
    status: "completed" as const,
  },
]

const mockInvestments = [
  {
    id: "1",
    pitchId: "1",
    pitchTitle: "EcoTrack - Campus Sustainability App",
    pitchAuthor: {
      name: "Sarah Chen",
      university: "Stanford University",
    },
    category: "Environmental Tech",
    amountInvested: 4150,
    currentValue: 5395,
    investmentDate: "2024-01-16T10:30:00Z",
    status: "active" as const,
    fundingProgress: {
      current: 199200,
      goal: 415000,
    },
  },
  {
    id: "2",
    pitchId: "2",
    pitchTitle: "StudyBuddy AI Tutor",
    pitchAuthor: {
      name: "Marcus Johnson",
      university: "MIT",
    },
    category: "EdTech",
    amountInvested: 2075,
    currentValue: 2490,
    investmentDate: "2024-01-14T16:45:00Z",
    status: "active" as const,
    fundingProgress: {
      current: 265600,
      goal: 664000,
    },
  },
  {
    id: "3",
    pitchId: "4",
    pitchTitle: "VirtualLab - Remote Science Experiments",
    pitchAuthor: {
      name: "Alex Rodriguez",
      university: "Georgia Tech",
    },
    category: "EdTech",
    amountInvested: 6225,
    currentValue: 7055,
    investmentDate: "2024-01-13T12:20:00Z",
    status: "active" as const,
    fundingProgress: {
      current: 464800,
      goal: 996000,
    },
  },
  {
    id: "4",
    pitchId: "3",
    pitchTitle: "CampusEats Food Sharing",
    pitchAuthor: {
      name: "Priya Patel",
      university: "UC Berkeley",
    },
    category: "Social Impact",
    amountInvested: 3320,
    currentValue: 4565,
    investmentDate: "2024-01-11T15:30:00Z",
    status: "completed" as const,
    fundingProgress: {
      current: 332000,
      goal: 332000,
    },
  },
]

export default function WalletPage() {
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
          <Link href="/pitches">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <ArrowLeft className="w-4 h-4" />
              Back to Pitches
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-balance">Investment Wallet</h1>
          <p className="text-muted-foreground text-lg">Manage your funds and track your investments</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <WalletOverview
              balance={mockWalletData.balance}
              totalInvested={mockWalletData.totalInvested}
              totalEarned={mockWalletData.totalEarned}
              activeInvestments={mockWalletData.activeInvestments}
            />
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <InvestmentPortfolio investments={mockInvestments} />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <TransactionHistory transactions={mockTransactions} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
