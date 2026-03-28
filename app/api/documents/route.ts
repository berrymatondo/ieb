import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  try {
    const documents = await prisma.document.findMany({
      orderBy: { createdAt: "desc" },
    })

    const mapped = documents.map((doc) => ({
      id: doc.id,
      filename: doc.filename,
      original_name: doc.originalName,
      blob_url: doc.blobUrl,
      content_type: doc.contentType,
      size: doc.size,
      category: doc.category,
      expiration_date: doc.expirationDate?.toISOString() ?? null,
      created_at: doc.createdAt.toISOString(),
    }))

    return NextResponse.json({ documents: mapped })
  } catch (error) {
    console.error("Error listing documents:", error)
    return NextResponse.json({ error: "Erreur lors de la recuperation des documents" }, { status: 500 })
  }
}
