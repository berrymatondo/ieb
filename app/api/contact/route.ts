import { NextResponse } from "next/server"
import { Resend } from "resend"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, category, subject, message } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent etre remplis" },
        { status: 400 }
      )
    }

    // Save message to database
    await prisma.message.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone || null,
        category: category || null,
        subject,
        message,
        isTreated: false,
      },
    })

    // Send email using Resend
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: "IEB Contact <onboarding@resend.dev>",
        to: ["berrymatondo@gmail.com"],
        replyTo: email,
        subject: `[IEB Contact] ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
              Nouveau message de contact - IEB
            </h2>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #334155; margin-top: 0;">Informations du contact</h3>
              <p><strong>Nom complet:</strong> ${firstName} ${lastName}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Telephone:</strong> ${phone || "Non fourni"}</p>
              <p><strong>Service:</strong> ${category || "Non specifie"}</p>
            </div>
            
            <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e40af; margin-top: 0;">Sujet: ${subject}</h3>
              <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
            
            <p style="color: #64748b; font-size: 12px;">
              Ce message a ete envoye depuis le formulaire de contact du site web Infinity Express Business.
            </p>
          </div>
        `,
      })
    } catch (emailError) {
      // Email failed but message is saved in DB
      console.error("Resend error:", emailError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}
