import { del } from "@vercel/blob"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { category, expiration_date } = body

    const document = await prisma.document.update({
      where: { id: parseInt(id) },
      data: {
        ...(category && { category }),
        expirationDate: expiration_date ? new Date(expiration_date) : null,
      },
    })

    return NextResponse.json({ success: true, document })
  } catch (error) {
    console.error("Update error:", error)
    return NextResponse.json({ error: "Erreur lors de la mise a jour" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Get document info
    const doc = await prisma.document.findUnique({
      where: { id: parseInt(id) },
    })

    if (!doc) {
      return NextResponse.json({ error: "Document non trouve" }, { status: 404 })
    }

    // Delete from Blob storage
    try {
      await del(doc.blobUrl)
    } catch (blobError) {
      console.error("Blob delete error:", blobError)
    }

    // Delete from database
    await prisma.document.delete({
      where: { id: parseInt(id) },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 })
  }
}
