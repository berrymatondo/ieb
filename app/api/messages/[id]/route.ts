import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { treated } = body

    if (typeof treated !== "boolean") {
      return NextResponse.json(
        { error: "Le champ 'treated' est requis" },
        { status: 400 }
      )
    }

    await prisma.message.update({
      where: { id: parseInt(id) },
      data: { isTreated: treated },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating message:", error)
    return NextResponse.json(
      { error: "Erreur lors de la mise a jour du message" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.message.delete({
      where: { id: parseInt(id) },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting message:", error)
    return NextResponse.json(
      { error: "Erreur lors de la suppression du message" },
      { status: 500 }
    )
  }
}
