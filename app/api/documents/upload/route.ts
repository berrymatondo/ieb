import { put } from "@vercel/blob"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const category = formData.get("category") as string || "general"
    const expirationDate = formData.get("expiration_date") as string || null

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 })
    }

    // Upload to Vercel Blob (private store)
    let blob
    try {
      blob = await put(`documents/${Date.now()}-${file.name}`, file, {
        access: "private",
      })
    } catch (blobError) {
      console.error("Blob upload error:", blobError)
      return NextResponse.json({ 
        error: "Echec de l'upload vers le stockage", 
        details: blobError instanceof Error ? blobError.message : "Blob error" 
      }, { status: 500 })
    }

    // Save metadata to database
    try {
      const document = await prisma.document.create({
        data: {
          filename: blob.pathname,
          originalName: file.name,
          blobUrl: blob.url,
          contentType: file.type,
          size: file.size,
          category,
          expirationDate: expirationDate ? new Date(expirationDate) : null,
        },
      })

      return NextResponse.json({ 
        success: true, 
        document
      })
    } catch (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json({ 
        error: "Echec de la sauvegarde en base", 
        details: dbError instanceof Error ? dbError.message : "Database error" 
      }, { status: 500 })
    }
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ 
      error: "Echec de l'upload", 
      details: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 })
  }
}
