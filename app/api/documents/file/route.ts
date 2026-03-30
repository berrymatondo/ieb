import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 })
    }

    const doc = await prisma.document.findUnique({
      where: { id: parseInt(id) },
    })

    if (!doc) {
      return new NextResponse("Not found", { status: 404 })
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
    return NextResponse.json({ error: "Failed to serve file" }, { status: 500 })
  }
}
