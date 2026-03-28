import { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Contact | Infinity Express Business",
  description: "Contactez IEB SARLU pour vos besoins en promotion commerciale, transport, sous-traitance ou immobilier a Lubumbashi, RDC.",
}

const contactInfo = [
  {
    icon: Phone,
    label: "Telephone",
    value: "+243 816 638 807",
    href: "tel:+243816638807",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@ieb-rdc.com",
    href: "mailto:contact@ieb-rdc.com",
  },
  {
    icon: MapPin,
    label: "Siege social",
    value: "55, Av. Lac Kipopo, Q/Baudoin, Lubumbashi",
    href: null,
  },
  {
    icon: Clock,
    label: "Horaires",
    value: "Lun - Ven : 8h - 17h",
    href: null,
  },
]

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/contact-office.jpg"
              alt="Bureau IEB"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/80 to-foreground/60" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs sm:text-sm font-medium text-primary mb-3 sm:mb-4 tracking-wider uppercase">
                Contact
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-background leading-tight text-balance">
                Parlons de votre projet
              </h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-background/80">
                Vous avez des questions ou souhaitez obtenir un devis ? N&apos;hesitez pas a nous contacter. Notre equipe est a votre disposition pour vous accompagner dans tous vos projets.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              {/* Contact Info */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8">
                  Nos coordonnées
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-start gap-3 sm:gap-4">
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-primary/10 text-primary shrink-0">
                        <info.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-0.5 sm:mb-1">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-sm sm:text-base text-foreground font-medium hover:text-primary transition-colors break-all"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-sm sm:text-base text-foreground font-medium">
                            {info.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* WhatsApp CTA */}
                <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-muted rounded-lg sm:rounded-xl border border-border">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-green-600 text-white shrink-0">
                      <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-foreground">
                        Contactez-nous sur WhatsApp
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Réponse rapide garantie
                      </p>
                    </div>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white" asChild>
                    <a
                      href="https://wa.me/243816638807"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Ouvrir WhatsApp
                    </a>
                  </Button>
                </div>

                {/* Office Image */}
                <div className="mt-6 sm:mt-8 relative aspect-video rounded-lg sm:rounded-xl overflow-hidden">
                  <Image
                    src="/images/contact-office.jpg"
                    alt="Nos bureaux à Lubumbashi"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card p-5 sm:p-8 rounded-xl sm:rounded-2xl border border-border shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                  Envoyez-nous un message
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
                  Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
