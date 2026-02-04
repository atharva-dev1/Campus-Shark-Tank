"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Shield, ShieldOff, Ban, MoreHorizontal, UserCheck, AlertTriangle } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  university: string
  major: string
  avatar?: string
  status: "active" | "suspended" | "banned"
  role: "student" | "admin" | "moderator"
  joinedAt: string
  lastActive: string
  pitchCount: number
  investmentCount: number
  totalInvested: number
  reportCount: number
}

interface UserManagementProps {
  users: User[]
}

export function UserManagement({ users }: UserManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.university.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesStatus && matchesRole
  })

  const handleUserAction = async (userId: string, action: "suspend" | "ban" | "activate" | "promote" | "demote") => {
    // TODO: Implement actual API call
    console.log("[v0] User action:", { userId, action })
  }

  const getStatusBadge = (status: User["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-accent text-accent-foreground">Active</Badge>
      case "suspended":
        return <Badge variant="secondary">Suspended</Badge>
      case "banned":
        return <Badge variant="destructive">Banned</Badge>
      default:
        return null
    }
  }

  const getRoleBadge = (role: User["role"]) => {
    switch (role) {
      case "admin":
        return (
          <Badge variant="outline" className="border-primary text-primary">
            Admin
          </Badge>
        )
      case "moderator":
        return <Badge variant="outline">Moderator</Badge>
      case "student":
        return <Badge variant="secondary">Student</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-muted-foreground">Manage platform users and permissions</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search users..."
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
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="banned">Banned</SelectItem>
          </SelectContent>
        </Select>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="student">Students</SelectItem>
            <SelectItem value="moderator">Moderators</SelectItem>
            <SelectItem value="admin">Admins</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* User List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => {
          const authorInitials = user.name
            .split(" ")
            .map((n) => n[0])
            .join("")

          return (
            <Card key={user.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{authorInitials}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.major} • {user.university}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(user.status)}
                        {getRoleBadge(user.role)}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Joined</p>
                        <p className="font-semibold">{new Date(user.joinedAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Active</p>
                        <p className="font-semibold">{new Date(user.lastActive).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Pitches</p>
                        <p className="font-semibold">{user.pitchCount}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Investments</p>
                        <p className="font-semibold">{user.investmentCount}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Total Invested</p>
                        <p className="font-semibold">₹{user.totalInvested.toLocaleString()}</p>
                      </div>
                    </div>

                    {user.reportCount > 0 && (
                      <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded border border-yellow-200">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm text-yellow-800">
                          {user.reportCount} report{user.reportCount > 1 ? "s" : ""} received
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 pt-2">
                      {user.role !== "admin" && (
                        <>
                          {user.status === "active" && (
                            <Button variant="outline" size="sm" onClick={() => handleUserAction(user.id, "suspend")}>
                              <ShieldOff className="w-4 h-4 mr-2" />
                              Suspend
                            </Button>
                          )}

                          <Button variant="destructive" size="sm" onClick={() => handleUserAction(user.id, "ban")}>
                            <Ban className="w-4 h-4 mr-2" />
                            Ban
                          </Button>
                        </>
                      )}

                      {user.status !== "active" && (
                        <Button size="sm" onClick={() => handleUserAction(user.id, "activate")}>
                          <UserCheck className="w-4 h-4 mr-2" />
                          Activate
                        </Button>
                      )}

                      {user.role === "student" && (
                        <Button variant="outline" size="sm" onClick={() => handleUserAction(user.id, "promote")}>
                          <Shield className="w-4 h-4 mr-2" />
                          Promote
                        </Button>
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
        })}
      </div>
    </div>
  )
}
