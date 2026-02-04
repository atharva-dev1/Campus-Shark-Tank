import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, TrendingUp, Users, Star, DollarSign } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header
        className="border-b backdrop-blur-sm sticky top-0 z-50"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold" style={{ color: "#000000" }}>
              Campus Shark Tank
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#pitches" className="text-muted-foreground hover:text-foreground transition-colors">
              Browse Pitches
            </Link>
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link href="#community" className="text-muted-foreground hover:text-foreground transition-colors">
              Community
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/auth">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="py-20 px-4 relative"
        style={{
          backgroundColor: "#1a1a1a",
          position: "relative",
        }}
      >
        <div className="container mx-auto text-center max-w-4xl relative z-20">
          <Badge variant="secondary" className="mb-6 bg-white/90 text-black">
            🚀 Now Live at Universities Nationwide
          </Badge>
          <div
            className="text-5xl md:text-6xl font-bold mb-6 text-balance"
            style={{ color: "#ffffff", position: "relative", zIndex: 30 }}
          >
            Where Student Ideas Meet <span style={{ color: "#10b981" }}>Opportunity</span>
          </div>
          <p className="text-xl mb-8 leading-relaxed max-w-2xl mx-auto" style={{ color: "#e5e7eb" }}>
            Pitch your innovative ideas, get peer feedback, and secure micro-funding to turn your vision into reality.
            Join the next generation of student entrepreneurs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button size="lg" className="text-lg px-8 bg-emerald-600 hover:bg-emerald-700">
                Start Pitching Today
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 border-white/50 hover:bg-black/60 bg-transparent"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", color: "#ffffff" }}
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Pitches */}
      <section id="pitches" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Student Pitches</h2>
            <p className="text-muted-foreground text-lg">Discover innovative ideas from students across the country</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "EcoTrack - Campus Sustainability App",
                author: "Sarah Chen",
                university: "Stanford University",
                category: "Environmental Tech",
                funding: "₹1,99,200",
                goal: "₹4,15,000",
                votes: 127,
                description: "Track and gamify sustainable practices across campus with real-time impact metrics.",
              },
              {
                title: "StudyBuddy AI Tutor",
                author: "Marcus Johnson",
                university: "MIT",
                category: "EdTech",
                funding: "₹2,65,600",
                goal: "₹6,64,000",
                votes: 89,
                description: "AI-powered personalized tutoring system that adapts to individual learning styles.",
              },
              {
                title: "CampusEats Food Sharing",
                author: "Priya Patel",
                university: "UC Berkeley",
                category: "Social Impact",
                funding: "₹1,49,400",
                goal: "₹3,32,000",
                votes: 156,
                description: "Reduce food waste by connecting students with excess meal credits to those in need.",
              },
            ].map((pitch, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge variant="outline">{pitch.category}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 fill-current text-yellow-500" />
                      {pitch.votes}
                    </div>
                  </div>
                  <CardTitle className="text-lg text-balance">{pitch.title}</CardTitle>
                  <CardDescription>
                    by {pitch.author} • {pitch.university}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{pitch.description}</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Funding Progress</span>
                      <span className="font-semibold">
                        {pitch.funding} / {pitch.goal}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{
                          width: `${(Number.parseInt(pitch.funding.replace("₹", "").replace(/,/g, "")) / Number.parseInt(pitch.goal.replace("₹", "").replace(/,/g, ""))) * 100}%`,
                        }}
                      />
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      View Pitch
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">From idea to funding in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Lightbulb,
                title: "1. Pitch Your Idea",
                description:
                  "Create a compelling pitch with your innovative concept, target market, and business model.",
              },
              {
                icon: Users,
                title: "2. Get Community Feedback",
                description:
                  "Receive valuable insights, votes, and constructive feedback from fellow students and mentors.",
              },
              {
                icon: TrendingUp,
                title: "3. Secure Micro-Funding",
                description:
                  "Raise funds from the community to bring your idea to life and start building your startup.",
              },
            ].map((step, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4" style={{ backgroundColor: "#059669" }}>
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, label: "Active Students", value: "2,500+" },
              { icon: Lightbulb, label: "Ideas Pitched", value: "850+" },
              { icon: DollarSign, label: "Funds Raised", value: "₹1.04Cr+" },
              { icon: TrendingUp, label: "Success Rate", value: "68%" },
            ].map((stat, index) => (
              <div key={index}>
                <stat.icon className="w-8 h-8 mx-auto mb-3" style={{ color: "rgba(255, 255, 255, 0.9)" }} />
                <div className="text-3xl font-bold mb-1" style={{ color: "#ffffff" }}>
                  {stat.value}
                </div>
                <div style={{ color: "rgba(255, 255, 255, 0.8)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-4xl font-bold mb-6 text-balance">Ready to Turn Your Idea Into Reality?</h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Join thousands of student entrepreneurs who are already building the future.
          </p>
          <Link href="/auth">
            <Button size="lg" className="text-lg px-8">
              Start Your Journey Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold">Campus Shark Tank</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2026 Campus Shark Tank. Empowering student entrepreneurs.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
