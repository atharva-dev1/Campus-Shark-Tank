import { PitchForm } from "@/components/pitch/pitch-form"
import { Button } from "@/components/ui/button"
import { Lightbulb, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewPitchPage() {
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

      <PitchForm />
    </div>
  )
}
