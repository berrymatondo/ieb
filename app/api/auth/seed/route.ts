import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  return createAdminUser()
}

export async function POST() {
  return createAdminUser()
}

async function createAdminUser() {
  try {
    // Check if admin already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: "admin@admin.com" },
    })

    if (existingUser) {
      return NextResponse.json({ 
        message: "L'utilisateur administrateur existe déjà",
        email: "admin@admin.com" 
      })
    }

    // Create admin user using better-auth API
    const response = await auth.api.signUpEmail({
      body: {
        name: "Administrateur",
        email: "admin@admin.com",
        password: "iebadmin123",
      },
    })

    if (!response) {
      return NextResponse.json(
        { error: "Impossible de créer l'utilisateur administrateur" },
        { status: 500 }
      )
    }

    // Update user role to admin
    await prisma.user.update({
      where: { email: "admin@admin.com" },
      data: { role: "admin" },
    })

    return NextResponse.json({ 
      success: true, 
      message: "Utilisateur administrateur créé avec succès",
      email: "admin@admin.com",
      password: "iebadmin123"
    })
  } catch (error) {
    console.error("Error seeding admin:", error)
    return NextResponse.json(
      { error: "Impossible de créer l'utilisateur administrateur", details: error instanceof Error ? error.message : "Erreur inconnue" },
      { status: 500 }
    )
  }
}
