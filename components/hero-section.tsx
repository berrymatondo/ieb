"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-team.jpg"
          alt="Equipe IEB au travail"
          fill
          className="object-cover transition-transform duration-[2s] ease-out"
          style={{ transform: isLoaded ? "scale(1)" : "scale(1.1)" }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24 sm:py-32 lg:px-8">
        <div className="max-w-3xl">
          <p 
            className="text-xs sm:text-sm font-medium text-primary mb-3 sm:mb-4 tracking-wider uppercase transition-all duration-700 ease-out"
            style={{ 
              opacity: isLoaded ? 1 : 0, 
              transform: isLoaded ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "200ms"
            }}
          >
            Services multiservices en RDC
          </p>
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-background leading-tight text-balance transition-all duration-700 ease-out"
            style={{ 
              opacity: isLoaded ? 1 : 0, 
              transform: isLoaded ? "translateY(0)" : "translateY(30px)",
              transitionDelay: "400ms"
            }}
          >
            Simplifier votre vie administrative et operationnelle
          </h1>
          <p 
            className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-background/80 max-w-2xl transition-all duration-700 ease-out"
            style={{ 
              opacity: isLoaded ? 1 : 0, 
              transform: isLoaded ? "translateY(0)" : "translateY(30px)",
              transitionDelay: "600ms"
            }}
          >
            Infinity Express Business SARLU est votre partenaire de confiance pour la promotion commerciale, le transport, la sous-traitance de services, l&apos;immobilier et bien plus a Lubumbashi.
          </p>
          <div 
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 transition-all duration-700 ease-out"
            style={{ 
              opacity: isLoaded ? 1 : 0, 
              transform: isLoaded ? "translateY(0)" : "translateY(30px)",
              transitionDelay: "800ms"
            }}
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg" asChild>
              <Link href="/contact">
                Nous contacter
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="ghost" className="border border-background/40 bg-transparent text-background hover:bg-background/10 hover:text-background transition-all duration-300 hover:scale-105" asChild>
              <Link href="/presentation">
                Decouvrir nos services
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Animated decorative element */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent transition-opacity duration-1000"
        style={{ opacity: isLoaded ? 1 : 0, transitionDelay: "1000ms" }}
      />
    </section>
  )
}
