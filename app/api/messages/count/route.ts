import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  try {
    const count = await prisma.message.count({
      where: { isTreated: false },
    })
    
    return NextResponse.json({ count })
  } catch (error) {
    console.error("Error fetching count:", error)
    return NextResponse.json({ count: 0 })
  }
}
