import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Identifiant manquant" }, { status: 400 })
    }

    const doc = await prisma.document.findUnique({
      where: { id: parseInt(id) },
    })

    if (!doc) {
      return new NextResponse("Fichier introuvable", { status: 404 })
    }

    return new NextResponse(doc.data, {
      headers: {
        "Content-Type": doc.contentType,
        "Content-Disposition": `inline; filename="${doc.originalName}"`,
        "Cache-Control": "private, no-cache",
      },
    })
  } catch (error) {
    console.error("Error serving file:", error)
    return NextResponse.json({ error: "Impossible de servir le fichier" }, { status: 500 })
  }
}
