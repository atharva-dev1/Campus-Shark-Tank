"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, CheckCircle, XCircle, Eye, Flag, MoreHorizontal } from "lucide-react"

interface Pitch {
  id: string
  title: string
  author: {
    name: string
    email: string
    university: string
    avatar?: string
  }
  category: string
  status: "pending" | "approved" | "rejected" | "flagged"
  fundingGoal: number
  currentFunding: number
  submittedAt: string
  votes: number
  reportCount: number
  assignedAdmin?: string // Added field to track which admin the pitch is assigned to
}

interface PitchManagementProps {
  pitches: Pitch[]
}

export function PitchManagement({ pitches }: PitchManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPitches, setSelectedPitches] = useState<string[]>([])
  const [localPitches, setLocalPitches] = useState<Pitch[]>(pitches)
  const [currentAdmin, setCurrentAdmin] = useState<any>(null) // Track current admin user

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      const adminUser = JSON.parse(user)
      setCurrentAdmin(adminUser)

      // Filter pitches to show only those from the same college as the admin
      const collegePitches = pitches.filter((pitch) => pitch.author.university === adminUser.college)
      setLocalPitches(collegePitches)
    } else {
      setLocalPitches(pitches)
    }
  }, [pitches])

  const filteredPitches = localPitches.filter((pitch) => {
    const matchesSearch =
      pitch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pitch.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || pitch.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = async (pitchId: string, newStatus: "approved" | "rejected") => {
    console.log("[v0] Pitch status changed:", { pitchId, newStatus, adminEmail: currentAdmin?.email })

    if (newStatus === "rejected") {
      setLocalPitches((prevPitches) => prevPitches.filter((pitch) => pitch.id !== pitchId))
      console.log("[v0] Pitch deleted from website:", pitchId)
    } else {
      setLocalPitches((prevPitches) =>
        prevPitches.map((pitch) => (pitch.id === pitchId ? { ...pitch, status: newStatus } : pitch)),
      )
      console.log("[v0] Pitch approved and available for investment:", pitchId)
    }
  }

  const handleBulkAction = async (action: "approve" | "reject") => {
    const newStatus = action === "approve" ? "approved" : "rejected"
    console.log("[v0] Bulk action:", { action, pitchIds: selectedPitches, adminEmail: currentAdmin?.email })

    if (action === "reject") {
      setLocalPitches((prevPitches) => prevPitches.filter((pitch) => !selectedPitches.includes(pitch.id)))
      console.log("[v0] Bulk rejected pitches deleted from website:", selectedPitches)
    } else {
      setLocalPitches((prevPitches) =>
        prevPitches.map((pitch) => (selectedPitches.includes(pitch.id) ? { ...pitch, status: newStatus } : pitch)),
      )
      console.log("[v0] Bulk approved pitches available for investment:", selectedPitches)
    }
    setSelectedPitches([])
  }

  const getStatusBadge = (status: Pitch["status"]) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-accent text-accent-foreground">Approved</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "flagged":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-700">
            Flagged
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Pitch Management</h2>
          <p className="text-muted-foreground">
            Review and moderate student pitches from {currentAdmin?.college || "your college"}
          </p>
        </div>
        {selectedPitches.length > 0 && (
          <div className="flex gap-2">
            <Button onClick={() => handleBulkAction("approve")} size="sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve ({selectedPitches.length})
            </Button>
            <Button onClick={() => handleBulkAction("reject")} variant="destructive" size="sm">
              <XCircle className="w-4 h-4 mr-2" />
              Reject ({selectedPitches.length})
            </Button>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search pitches or authors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="flagged">Flagged</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Pitch List */}
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="cards">Card View</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {filteredPitches.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No pitches found from your college.</p>
                  {pitches.length === 0 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Students from {currentAdmin?.college || "your college"} haven't submitted any pitches yet.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredPitches.map((pitch) => {
              const authorInitials = pitch.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")

              return (
                <Card key={pitch.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={selectedPitches.includes(pitch.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPitches([...selectedPitches, pitch.id])
                          } else {
                            setSelectedPitches(selectedPitches.filter((id) => id !== pitch.id))
                          }
                        }}
                        className="mt-1"
                      />

                      <Avatar className="w-12 h-12">
                        <AvatarImage src={pitch.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{authorInitials}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg text-balance">{pitch.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              by {pitch.author.name} • {pitch.author.university}
                            </p>
                            <p className="text-xs text-muted-foreground">{pitch.author.email}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(pitch.status)}
                            <Badge variant="outline">{pitch.category}</Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Funding Goal</p>
                            <p className="font-semibold">₹{pitch.fundingGoal.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Current Funding</p>
                            <p className="font-semibold">₹{pitch.currentFunding.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Votes</p>
                            <p className="font-semibold">{pitch.votes}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Submitted</p>
                            <p className="font-semibold">{new Date(pitch.submittedAt).toLocaleDateString()}</p>
                          </div>
                        </div>

                        {pitch.reportCount > 0 && (
                          <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded border border-yellow-200">
                            <Flag className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm text-yellow-800">
                              {pitch.reportCount} report{pitch.reportCount > 1 ? "s" : ""} received
                            </span>
                          </div>
                        )}

                        <div className="flex items-center gap-2 pt-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                          {pitch.status === "pending" && (
                            <>
                              <Button size="sm" onClick={() => handleStatusChange(pitch.id, "approved")}>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Approve & Promote
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleStatusChange(pitch.id, "rejected")}
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Reject & Delete
                              </Button>
                            </>
                          )}
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </TabsContent>

        <TabsContent value="cards">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPitches.length === 0 ? (
              <div className="col-span-full">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No pitches found from your college.</p>
                      {pitches.length === 0 && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Students from {currentAdmin?.college || "your college"} haven't submitted any pitches yet.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              filteredPitches.map((pitch) => {
                const authorInitials = pitch.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")

                return (
                  <Card key={pitch.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <input
                          type="checkbox"
                          checked={selectedPitches.includes(pitch.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedPitches([...selectedPitches, pitch.id])
                            } else {
                              setSelectedPitches(selectedPitches.filter((id) => id !== pitch.id))
                            }
                          }}
                        />
                        {getStatusBadge(pitch.status)}
                      </div>
                      <CardTitle className="text-lg text-balance">{pitch.title}</CardTitle>
                      <CardDescription>{pitch.category}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={pitch.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">{authorInitials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{pitch.author.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{pitch.author.university}</p>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Goal:</span>
                          <span className="font-semibold">₹{pitch.fundingGoal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Votes:</span>
                          <span className="font-semibold">{pitch.votes}</span>
                        </div>
                      </div>

                      {pitch.status === "pending" && (
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1" onClick={() => handleStatusChange(pitch.id, "approved")}>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleStatusChange(pitch.id, "rejected")}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
