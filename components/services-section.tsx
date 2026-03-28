"use client"

import Image from "next/image"
import { Building2, FileText, Pickaxe, Sparkles } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

const services = [
  {
    icon: Sparkles,
    title: "Promotion commerciale",
    description: "Fournitures de bureau, imprimerie, habillement, cosmetique, production et distribution. Manutention et transit pour vos marchandises.",
    image: "/images/service-admin.jpg",
  },
  {
    icon: FileText,
    title: "Transport et logistique",
    description: "Location de vehicules, transport de marchandises et de voyageurs. Achat et vente de vehicules pour repondre a tous vos besoins.",
    image: "/images/service-mining.jpg",
  },
  {
    icon: Pickaxe,
    title: "Sous-traitance de service",
    description: "Entreprise certifiee ARSP pour accompagner les societes dans leurs operations. Prestations de services et partenariats strategiques.",
    image: "/images/service-cleaning.jpg",
  },
]

export function ServicesSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="max-w-2xl mb-10 sm:mb-16">
          <p className="text-xs sm:text-sm font-medium text-primary mb-2 tracking-wider uppercase">
            Ce que nous faisons
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground text-balance">
            Une approche globale pour un modele d&apos;avenir
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Notre collection de services couvre tous les besoins de transformation et de facilitation pour les entreprises et particuliers.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <AnimatedSection key={service.title} delay={index * 150}>
              <div className="group h-full relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-500">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                </div>
                <div className="relative p-6 -mt-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Additional service card */}
        <AnimatedSection delay={450} className="mt-6 sm:mt-8">
          <div className="p-5 sm:p-8 rounded-xl sm:rounded-2xl bg-muted border border-border md:col-span-2 lg:col-span-3 hover:shadow-lg transition-all duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-accent text-accent-foreground shrink-0 transition-transform duration-300 hover:scale-110">
                <Building2 className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                  Immobilier, Agriculture et Energie
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Gestion immobiliere, location et vente de batiments. Agriculture, peche et elevage. Promotion de l&apos;energie solaire et renouvelable. Tourisme et assainissement environnemental.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
