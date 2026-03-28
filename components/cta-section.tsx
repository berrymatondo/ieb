"use client"

import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"

export function CTASection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-foreground px-5 py-12 sm:px-12 sm:py-20 lg:px-20 group hover:shadow-2xl transition-shadow duration-500">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 transition-transform duration-[3s] group-hover:scale-110" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>
            
            {/* Decorative gradient orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50 transition-transform duration-700 group-hover:scale-125" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl opacity-50 transition-transform duration-700 group-hover:scale-125" />
            
            <div className="relative max-w-2xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-background text-balance">
                Parlons de votre projet
              </h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-background/70 leading-relaxed">
                Que vous soyez une entreprise miniere, une PME ou un particulier, nous sommes prets a vous accompagner dans vos demarches.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg" asChild>
                  <Link href="/contact">
                    Nous contacter
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 hover:scale-105" asChild>
                  <a href="https://wa.me/243816638807" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
