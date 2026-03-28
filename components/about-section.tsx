"use client"

import Image from "next/image"
import { CheckCircle2 } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

const features = [
  "Entreprise certifiee et en regle",
  "Equipes qualifiees et experimentees",
  "Presence etablie a Lubumbashi",
  "Partenaire des societes minieres",
  "Services personnalises",
  "Reactivite et professionnalisme",
]

export function AboutSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-muted overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          <AnimatedSection direction="left">
            <p className="text-xs sm:text-sm font-medium text-primary mb-2 tracking-wider uppercase">
              A propos de nous
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground text-balance">
              Une entreprise multiservices agile au service de votre reussite
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Basee au 55, Avenue Lac Kipopo a Lubumbashi, Infinity Express Business SARLU est une entreprise de services polyvalente creee en septembre 2025. Notre vision : une ouverture d&apos;esprit sans limites pour repondre a tous vos besoins en RDC et a l&apos;etranger.
            </p>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Sous la direction de Madame BOLEKOLA MBOKA Gadielle, notre equipe s&apos;engage a fournir des services de qualite superieure dans la promotion commerciale, le transport, la sous-traitance, l&apos;immobilier, l&apos;agriculture et les energies renouvelables.
            </p>

            <ul className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {features.map((feature, index) => (
                <li 
                  key={feature} 
                  className="flex items-center gap-2 text-sm text-foreground transition-all duration-300 hover:translate-x-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={200} className="relative mt-4 lg:mt-0">
            <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl group">
              <Image
                src="/images/about-team.jpg"
                alt="Equipe Infinity Express Business"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Decorative elements - hidden on mobile */}
            <div className="hidden sm:block absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-pulse" />
            <div className="hidden sm:block absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
            {/* Stats overlay */}
            <div className="absolute -bottom-3 -left-3 sm:-bottom-6 sm:-left-6 bg-card p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-lg border border-border transition-transform duration-300 hover:scale-105">
              <p className="text-2xl sm:text-3xl font-bold text-primary">IEB</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Lubumbashi, RDC</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
