"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { 
  Mail, 
  Bell, 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Filter, 
  Search,
  ArrowLeft,
  Phone,
  Calendar,
  User,
  RefreshCw,
  ChevronDown,
  Tag
} from "lucide-react"

const SERVICE_CATEGORIES: Record<string, string> = {
  "promotion-commerciale": "Promotion commerciale",
  "transport-logistique": "Transport et logistique",
  "sous-traitance": "Sous-traitance de service",
  "immobilier": "Immobilier et gestion",
  "agriculture": "Agriculture, peche et elevage",
  "energie-renouvelable": "Energie solaire et renouvelable",
  "tourisme": "Tourisme",
  "environnement": "Assainissement environnemental",
  "autre": "Autre demande",
}
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Message = {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string | null
  category: string | null
  subject: string
  message: string
  treated: boolean
  created_at: string
}

type FilterStatus = "all" | "treated" | "untreated"
type SortOrder = "newest" | "oldest"

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest")
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/messages")
      const data = await response.json()
      setMessages(data.messages || [])
    } catch (error) {
      console.error("Error fetching messages:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const filteredMessages = useMemo(() => {
    let result = [...messages]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (msg) =>
          msg.first_name.toLowerCase().includes(query) ||
          msg.last_name.toLowerCase().includes(query) ||
          msg.email.toLowerCase().includes(query) ||
          msg.subject.toLowerCase().includes(query) ||
          msg.message.toLowerCase().includes(query)
      )
    }

    if (filterStatus === "treated") {
      result = result.filter((msg) => msg.treated)
    } else if (filterStatus === "untreated") {
      result = result.filter((msg) => !msg.treated)
    }

    if (filterCategory !== "all") {
      result = result.filter((msg) => msg.category === filterCategory)
    }

    result.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB
    })

    return result
  }, [messages, searchQuery, filterStatus, filterCategory, sortOrder])

  const stats = useMemo(() => ({
    total: messages.length,
    untreated: messages.filter((m) => !m.treated).length,
    treated: messages.filter((m) => m.treated).length,
  }), [messages])

  const toggleTreated = async (id: string, currentValue: boolean) => {
    setUpdating(id)
    try {
      await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ treated: !currentValue }),
      })
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id ? { ...msg, treated: !currentValue } : msg
        )
      )
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, treated: !currentValue })
      }
    } catch (error) {
      console.error("Error updating message:", error)
    } finally {
      setUpdating(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Etes-vous sur de vouloir supprimer ce message ?")) return
    
    try {
      await fetch(`/api/messages/${id}`, { method: "DELETE" })
      setMessages((prev) => prev.filter((msg) => msg.id !== id))
      if (selectedMessage?.id === id) {
        setSelectedMessage(null)
      }
    } catch (error) {
      console.error("Error deleting message:", error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <h1 className="text-lg font-semibold text-foreground">Messages</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full">
                <Bell className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">
                  {stats.untreated} non traite{stats.untreated > 1 ? "s" : ""}
                </span>
              </div>
              <Button variant="outline" size="icon" onClick={fetchMessages} disabled={loading}>
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <p className="text-2xl font-bold text-red-500">{stats.untreated}</p>
            <p className="text-sm text-muted-foreground">Non traites</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <p className="text-2xl font-bold text-green-500">{stats.treated}</p>
            <p className="text-sm text-muted-foreground">Traites</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  {filterStatus === "all" && "Tous"}
                  {filterStatus === "treated" && "Traites"}
                  {filterStatus === "untreated" && "Non traites"}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                  Tous les messages
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("untreated")}>
                  Non traites uniquement
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("treated")}>
                  Traites uniquement
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Tag className="h-4 w-4" />
                  {filterCategory === "all" ? "Service" : SERVICE_CATEGORIES[filterCategory] || filterCategory}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterCategory("all")}>
                  Tous les services
                </DropdownMenuItem>
                {Object.entries(SERVICE_CATEGORIES).map(([value, label]) => (
                  <DropdownMenuItem key={value} onClick={() => setFilterCategory(value)}>
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  {sortOrder === "newest" ? "Recents" : "Anciens"}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortOrder("newest")}>
                  Plus recents
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder("oldest")}>
                  Plus anciens
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Messages List */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="font-semibold text-foreground">
                {filteredMessages.length} message{filteredMessages.length !== 1 ? "s" : ""}
              </h2>
            </div>
            
            {loading ? (
              <div className="p-8 text-center">
                <RefreshCw className="h-8 w-8 text-muted-foreground/50 mx-auto mb-4 animate-spin" />
                <p className="text-muted-foreground">Chargement...</p>
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="p-8 text-center">
                <Mail className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">Aucun message trouve</p>
              </div>
            ) : (
              <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
                {filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                      selectedMessage?.id === msg.id ? "bg-primary/5 border-l-4 border-l-primary" : ""
                    } ${!msg.treated ? "bg-blue-50/50" : ""}`}
                    onClick={() => setSelectedMessage(msg)}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={msg.treated}
                        disabled={updating === msg.id}
                        onCheckedChange={() => toggleTreated(msg.id, msg.treated)}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {!msg.treated && (
                            <span className="flex h-2 w-2 rounded-full bg-blue-500" />
                          )}
                          <p className="font-medium text-foreground truncate">
                            {msg.first_name} {msg.last_name}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-foreground truncate mb-1">
                          {msg.subject}
                        </p>
                        {msg.category && (
                          <span className="inline-block px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full mb-1">
                            {SERVICE_CATEGORIES[msg.category] || msg.category}
                          </span>
                        )}
                        <p className="text-xs text-muted-foreground truncate">
                          {msg.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatDate(msg.created_at)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 text-muted-foreground hover:text-red-500"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(msg.id)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Message Detail */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {selectedMessage ? (
              <>
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h2 className="font-semibold text-foreground">Detail du message</h2>
                  <div className="flex items-center gap-2">
                    {selectedMessage.treated ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                        <CheckCircle2 className="h-3 w-3" />
                        Traite
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                        <Circle className="h-3 w-3" />
                        Non traite
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">
                        {selectedMessage.first_name} {selectedMessage.last_name}
                      </p>
                      <a 
                        href={`mailto:${selectedMessage.email}`} 
                        className="text-sm text-primary hover:underline"
                      >
                        {selectedMessage.email}
                      </a>
                    </div>
                  </div>
                  
                  {selectedMessage.phone && (
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <a 
                        href={`tel:${selectedMessage.phone}`}
                        className="text-foreground hover:text-primary"
                      >
                        {selectedMessage.phone}
                      </a>
                    </div>
                  )}
                  
                  {selectedMessage.category && (
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Tag className="h-5 w-5 text-muted-foreground" />
                      <span className="text-foreground">
                        {SERVICE_CATEGORIES[selectedMessage.category] || selectedMessage.category}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span className="text-foreground">{formatDate(selectedMessage.created_at)}</span>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{selectedMessage.subject}</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                      {selectedMessage.message}
                    </p>
                  </div>
                  
                  <div className="flex gap-2 pt-4 border-t border-border">
                    <Button
                      variant={selectedMessage.treated ? "outline" : "default"}
                      className="flex-1"
                      onClick={() => toggleTreated(selectedMessage.id, selectedMessage.treated)}
                      disabled={updating === selectedMessage.id}
                    >
                      {selectedMessage.treated ? (
                        <>
                          <Circle className="mr-2 h-4 w-4" />
                          Marquer non traite
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Marquer traite
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                    >
                      <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}>
                        <Mail className="mr-2 h-4 w-4" />
                        Repondre
                      </a>
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-8 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
                <Mail className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">Selectionnez un message pour voir les details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
