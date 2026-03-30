import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const MAX_SIZE = 10 * 1024 * 1024 // 10 MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const category = (formData.get("category") as string) || "general"
    const expirationDate = (formData.get("expiration_date") as string) || null

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 })
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Le fichier dépasse la limite de 10 Mo" },
        { status: 413 }
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const document = await prisma.document.create({
      data: {
        filename: file.name,
        originalName: file.name,
        data: buffer,
        contentType: file.type,
        size: file.size,
        category,
        expirationDate: expirationDate ? new Date(expirationDate) : null,
      },
    })

    return NextResponse.json({ success: true, document })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: "Echec de l'upload", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
