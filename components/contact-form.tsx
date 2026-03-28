"use client"

import { useState } from "react"
import { Send, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SERVICE_CATEGORIES = [
  { value: "promotion-commerciale", label: "Promotion commerciale" },
  { value: "transport-logistique", label: "Transport et logistique" },
  { value: "sous-traitance", label: "Sous-traitance de service" },
  { value: "immobilier", label: "Immobilier et gestion" },
  { value: "agriculture", label: "Agriculture, peche et elevage" },
  { value: "energie-renouvelable", label: "Energie solaire et renouvelable" },
  { value: "tourisme", label: "Tourisme" },
  { value: "environnement", label: "Assainissement environnemental" },
  { value: "autre", label: "Autre demande" },
]

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      category: category,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erreur lors de l'envoi")
      }

      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-8 sm:py-12">
        <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mx-auto mb-4 sm:mb-6">
          <CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
          Message envoyé !
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
          Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
        </p>
        <Button
          variant="outline"
          onClick={() => setIsSubmitted(false)}
        >
          Envoyer un autre message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="firstName" className="text-sm">Prénom</Label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="Votre prénom"
            required
            className="h-10 sm:h-11"
          />
        </div>
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="lastName" className="text-sm">Nom</Label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Votre nom"
            required
            className="h-10 sm:h-11"
          />
        </div>
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="email" className="text-sm">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="votre@email.com"
          required
          className="h-10 sm:h-11"
        />
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="phone" className="text-sm">Téléphone (optionnel)</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+243 ..."
          className="h-10 sm:h-11"
        />
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="category" className="text-sm">Service concerne</Label>
        <Select value={category} onValueChange={setCategory} required>
          <SelectTrigger className="h-10 sm:h-11">
            <SelectValue placeholder="Selectionnez un service" />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="subject" className="text-sm">Sujet</Label>
        <Input
          id="subject"
          name="subject"
          placeholder="Objet de votre message"
          required
          className="h-10 sm:h-11"
        />
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="message" className="text-sm">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Décrivez votre demande..."
          rows={4}
          required
          className="min-h-[100px] sm:min-h-[120px]"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Envoyer le message
          </>
        )}
      </Button>
    </form>
  )
}
