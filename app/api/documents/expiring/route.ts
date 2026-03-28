import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"
export const revalidate = 0

const EXPIRING_SOON_DAYS = 30

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const days = parseInt(searchParams.get("days") || String(EXPIRING_SOON_DAYS))

    const now = new Date()
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + days)

    const documents = await prisma.document.findMany({
      where: {
        expirationDate: {
          not: null,
          gte: now,
          lte: futureDate,
        },
      },
      orderBy: { expirationDate: "asc" },
    })

    return NextResponse.json({ 
      documents,
      count: documents.length,
      days
    })
  } catch (error) {
    console.error("Error fetching expiring documents:", error)
    return NextResponse.json({ error: "Erreur", count: 0 }, { status: 500 })
  }
}
