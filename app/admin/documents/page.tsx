"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Upload,
  FileText,
  Image as ImageIcon,
  File,
  Trash2,
  Download,
  Search,
  Filter,
  ArrowLeft,
  FolderOpen,
  ChevronDown,
  RefreshCw,
  X,
  FileImage,
  FileSpreadsheet,
  FileArchive,
  Calendar,
  Edit2,
  AlertTriangle
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { getConfig, getExpiringSoonDays } from "@/lib/config"
import { Settings } from "lucide-react"

type Document = {
  id: string
  filename: string
  original_name: string

  content_type: string
  size: number
  category: string
  expiration_date: string | null
  created_at: string
}

function getFileUrl(doc: Document) {
  return `/api/documents/file?id=${doc.id}`
}

const CATEGORIES = [
  { value: "general", label: "General" },
  { value: "contrats", label: "Contrats" },
  { value: "factures", label: "Factures" },
  { value: "rapports", label: "Rapports" },
  { value: "ressources-humaines", label: "Ressources Humaines" },
  { value: "marketing", label: "Marketing" },
  { value: "juridique", label: "Juridique" },
  { value: "autre", label: "Autre" },
]

function getFileIcon(contentType: string) {
  if (contentType.startsWith("image/")) return FileImage
  if (contentType.includes("pdf")) return FileText
  if (contentType.includes("spreadsheet") || contentType.includes("excel")) return FileSpreadsheet
  if (contentType.includes("zip") || contentType.includes("archive")) return FileArchive
  if (contentType.includes("word") || contentType.includes("document")) return FileText
  return File
}

function formatFileSize(bytes: number) {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [uploadCategory, setUploadCategory] = useState("general")
  const [dragActive, setDragActive] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploadExpirationDate, setUploadExpirationDate] = useState("")
  const [editingDoc, setEditingDoc] = useState<Document | null>(null)
  const [editCategory, setEditCategory] = useState("")
  const [editExpirationDate, setEditExpirationDate] = useState("")
  const [saving, setSaving] = useState(false)

  const fetchDocuments = useCallback(async () => {
    try {
      const response = await fetch("/api/documents")
      const data = await response.json()
      setDocuments(data.documents || [])
    } catch (error) {
      console.error("Error fetching documents:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDocuments()
  }, [fetchDocuments])

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setUploading(true)
    setUploadError(null)
    setUploadSuccess(false)

    for (const file of Array.from(files)) {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("category", uploadCategory)
      if (uploadExpirationDate) {
        formData.append("expiration_date", uploadExpirationDate)
      }

      try {
        const response = await fetch("/api/documents/upload", {
          method: "POST",
          body: formData,
        })

        const data = await response.json()

        if (!response.ok) {
          setUploadError(data.details || data.error || "Echec de l'upload")
          console.error("Upload error response:", data)
        } else {
          setUploadSuccess(true)
          setTimeout(() => setUploadSuccess(false), 3000)
        }
      } catch (error) {
        console.error("Upload error:", error)
        setUploadError(error instanceof Error ? error.message : "Erreur inconnue")
      }
    }

    setUploading(false)
    fetchDocuments()
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Etes-vous sur de vouloir supprimer ce document ?")) return

    setDeleting(id)
    try {
      const response = await fetch(`/api/documents/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setDocuments(documents.filter((doc) => doc.id !== id))
      }
    } catch (error) {
      console.error("Delete error:", error)
    } finally {
      setDeleting(null)
    }
  }

  const openEditDialog = (doc: Document) => {
    setEditingDoc(doc)
    setEditCategory(doc.category)
    setEditExpirationDate(doc.expiration_date ? doc.expiration_date.split("T")[0] : "")
  }

  const handleSaveEdit = async () => {
    if (!editingDoc) return

    setSaving(true)
    try {
      const response = await fetch(`/api/documents/${editingDoc.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: editCategory,
          expiration_date: editExpirationDate || null,
        }),
      })

      if (response.ok) {
        await response.json()
        setDocuments(documents.map((d) =>
          d.id === editingDoc.id ? { ...d, category: editCategory, expiration_date: editExpirationDate || null } : d
        ))
        setEditingDoc(null)
      }
    } catch (error) {
      console.error("Error updating document:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleUpload(e.dataTransfer.files)
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.original_name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "all" || doc.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const stats = {
    total: documents.length,
    images: documents.filter((d) => d.content_type.startsWith("image/")).length,
    pdfs: documents.filter((d) => d.content_type.includes("pdf")).length,
    others: documents.filter((d) => !d.content_type.startsWith("image/") && !d.content_type.includes("pdf")).length,
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Documents</h1>
                <p className="text-sm text-muted-foreground">Gerez vos fichiers et documents</p>
              </div>
            </div>
            <Button onClick={() => fetchDocuments()} variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Actualiser
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FolderOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
              </div>
            </div>
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <ImageIcon className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.images}</p>
                  <p className="text-xs text-muted-foreground">Images</p>
                </div>
              </div>
            </div>
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <FileText className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.pdfs}</p>
                  <p className="text-xs text-muted-foreground">PDFs</p>
                </div>
              </div>
            </div>
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <File className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.others}</p>
                  <p className="text-xs text-muted-foreground">Autres</p>
                </div>
              </div>
            </div>
            <div className="bg-card p-4 rounded-xl border border-orange-200 bg-orange-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">{getConfig().EXPIRING_SOON_WEEKS}</p>
                  <p className="text-xs text-muted-foreground">Semaines alerte</p>
                </div>
              </div>
            </div>
          </div>

          {/* Configuration Info */}
          <div className="mb-6 p-4 bg-muted/50 rounded-xl border border-border">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <Settings className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Configuration des alertes d&apos;expiration</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Les documents expirant dans les <span className="font-semibold text-orange-600">{getConfig().EXPIRING_SOON_WEEKS} semaines</span> ({getExpiringSoonDays()} jours) seront signales par une notification.
                  </p>
                </div>
              </div>
              <Link 
                href="/admin/parametres" 
                className="shrink-0 text-sm text-primary hover:underline"
              >
                Modifier
              </Link>
            </div>
          </div>

          {/* Upload Zone */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div>
                <Label htmlFor="category" className="text-sm mb-2 block">Categorie</Label>
                <Select value={uploadCategory} onValueChange={setUploadCategory}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="expiration" className="text-sm mb-2 block">Date d&apos;echeance (optionnel)</Label>
                <Input
                  id="expiration"
                  type="date"
                  value={uploadExpirationDate}
                  onChange={(e) => setUploadExpirationDate(e.target.value)}
                  className="w-full sm:w-48"
                />
              </div>
            </div>

            {/* Upload messages */}
            {uploadError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center justify-between">
                <span>{uploadError}</span>
                <button onClick={() => setUploadError(null)} className="text-red-500 hover:text-red-700">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            {uploadSuccess && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                Document uploade avec succes !
              </div>
            )}

            <div
              className={`relative border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-colors ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                multiple
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => handleUpload(e.target.files)}
                disabled={uploading}
              />
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-medium text-foreground">
                    {uploading ? "Upload en cours..." : "Glissez vos fichiers ici"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    ou cliquez pour selectionner des fichiers (PDF, images, documents...)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un document..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  {filterCategory === "all" 
                    ? "Toutes categories" 
                    : CATEGORIES.find((c) => c.value === filterCategory)?.label}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterCategory("all")}>
                  Toutes categories
                </DropdownMenuItem>
                {CATEGORIES.map((cat) => (
                  <DropdownMenuItem key={cat.value} onClick={() => setFilterCategory(cat.value)}>
                    {cat.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Documents Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredDocuments.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-xl border border-border">
              <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Aucun document</h3>
              <p className="text-sm text-muted-foreground">
                {searchQuery || filterCategory !== "all"
                  ? "Aucun document ne correspond a vos criteres"
                  : "Commencez par uploader vos premiers fichiers"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredDocuments.map((doc) => {
                const FileIcon = getFileIcon(doc.content_type)
                const isImage = doc.content_type.startsWith("image/")

                return (
                  <div
                    key={doc.id}
                    className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    {/* Preview */}
                    <div className="relative h-32 bg-muted flex items-center justify-center overflow-hidden">
                      {isImage ? (
                        <img
                          src={getFileUrl(doc)}
                          alt={doc.original_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FileIcon className="h-12 w-12 text-muted-foreground" />
                      )}
                      {/* Actions overlay */}
                      <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <a
                          href={getFileUrl(doc)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-background rounded-lg hover:bg-background/90 transition-colors"
                          title="Telecharger"
                        >
                          <Download className="h-4 w-4 text-foreground" />
                        </a>
                        <button
                          onClick={() => openEditDialog(doc)}
                          className="p-2 bg-background rounded-lg hover:bg-background/90 transition-colors"
                          title="Modifier"
                        >
                          <Edit2 className="h-4 w-4 text-foreground" />
                        </button>
                        <button
                          onClick={() => handleDelete(doc.id)}
                          disabled={deleting === doc.id}
                          className="p-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <p className="font-medium text-foreground truncate mb-1" title={doc.original_name}>
                        {doc.original_name}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>{formatFileSize(doc.size)}</span>
                        <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                          {CATEGORIES.find((c) => c.value === doc.category)?.label || doc.category}
                        </span>
                      </div>
                      {doc.expiration_date && (
                        <div className={`flex items-center gap-1 text-xs ${
                          new Date(doc.expiration_date) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                            ? "text-orange-600"
                            : "text-muted-foreground"
                        }`}>
                          <Calendar className="h-3 w-3" />
                          <span>Expire le {new Date(doc.expiration_date).toLocaleDateString("fr-FR")}</span>
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(doc.created_at)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Edit Dialog */}
      <Dialog open={!!editingDoc} onOpenChange={(open) => !open && setEditingDoc(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-sm mb-2 block">Nom du fichier</Label>
              <p className="text-sm text-muted-foreground">{editingDoc?.original_name}</p>
            </div>
            <div>
              <Label htmlFor="editCategory" className="text-sm mb-2 block">Categorie</Label>
              <Select value={editCategory} onValueChange={setEditCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="editExpiration" className="text-sm mb-2 block">Date d&apos;echeance</Label>
              <Input
                id="editExpiration"
                type="date"
                value={editExpirationDate}
                onChange={(e) => setEditExpirationDate(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Laissez vide si le document n&apos;a pas de date d&apos;echeance
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingDoc(null)}>
              Annuler
            </Button>
            <Button onClick={handleSaveEdit} disabled={saving}>
              {saving ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
