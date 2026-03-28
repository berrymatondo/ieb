import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { Button } from "@/components/ui/button"
import { 
  Target, 
  Eye, 
  Heart, 
  Sparkles, 
  FileText, 
  Pickaxe, 
  Truck,
  Building2,
  Leaf,
  Sun,
  CheckCircle2,
  ExternalLink,
  Users
} from "lucide-react"

export const metadata: Metadata = {
  title: "Presentation | Infinity Express Business",
  description: "Decouvrez IEB SARLU, entreprise de services polyvalente a Lubumbashi. Notre mission, vision, valeurs et domaines d'activite selon nos statuts officiels.",
}

const ARSP_LINK = "https://arsp.cd/details-de-lentreprise/?viawaves/nzt/callspangold/token=9d51ecc3c1796c717e164b0102fd8a98"

const values = [
  {
    icon: Target,
    title: "Ouverture d'esprit",
    description: "Une vision sans limites pour repondre a tous vos besoins, quelle que soit leur nature.",
  },
  {
    icon: Eye,
    title: "Flexibilite",
    description: "Adaptation constante aux exigences du marche et aux besoins specifiques de chaque client.",
  },
  {
    icon: Heart,
    title: "Excellence",
    description: "Engagement envers la qualite et le professionnalisme dans chaque service rendu.",
  },
]

const domains = [
  {
    icon: Sparkles,
    title: "Promotion commerciale",
    image: "/images/service-admin.jpg",
    items: ["Fournitures de bureau et imprimerie", "Habillement et cosmetique", "Production et distribution", "Manutention et transit"],
  },
  {
    icon: Truck,
    title: "Transport et logistique",
    image: "/images/service-mining.jpg",
    items: ["Location de vehicules", "Transport de marchandises", "Transport de voyageurs", "Achat et vente de vehicules"],
  },
  {
    icon: Pickaxe,
    title: "Sous-traitance de service",
    image: "/images/service-cleaning.jpg",
    items: ["Certification ARSP", "Partenariats strategiques", "Prestations de services", "Accompagnement operationnel"],
  },
  {
    icon: Building2,
    title: "Immobilier",
    image: "/images/contact-office.jpg",
    items: ["Gestion immobiliere", "Location de batiments", "Achat et vente", "Administration de biens"],
  },
  {
    icon: Leaf,
    title: "Agriculture et elevage",
    image: "/images/hero-team.jpg",
    items: ["Agriculture", "Peche", "Elevage", "Agroalimentaire"],
  },
  {
    icon: Sun,
    title: "Environnement et energie",
    image: "/images/about-team.jpg",
    items: ["Tourisme", "Assainissement", "Energie solaire", "Energies renouvelables"],
  },
]

const companyInfo = {
  name: "INFINITY EXPRESS BUSINESS",
  acronym: "IEB SARLU",
  form: "Societe a Responsabilite Limitee Unipersonnelle",
  rccm: "CD/LSH/RCCM/25-B-01750",
  capital: "3 000 USD",
  duration: "99 ans",
  address: "55, Avenue Lac Kipopo, Q/Baudoin, C/Lubumbashi, V/Lubumbashi",
  manager: "Madame BOLEKOLA MBOKA Gadielle",
  founded: "Septembre 2025"
}

export default function PresentationPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/about-team.jpg"
              alt="Equipe IEB"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/80 to-foreground/60" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs sm:text-sm font-medium text-primary mb-3 sm:mb-4 tracking-wider uppercase">
                Qui sommes-nous
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-background leading-tight text-balance">
                Infinity Express Business
              </h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-background/80">
                Basee a Lubumbashi, en Republique Democratique du Congo, IEB SARLU est une entreprise de services polyvalente avec une vision large. Nous simplifions la vie administrative et operationnelle des particuliers et entreprises.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="default">
                  <a href={ARSP_LINK} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Voir sur ARSP
                  </a>
                </Button>
                <Button asChild variant="outline" className="bg-background/10 border-background/20 text-background hover:bg-background/20">
                  <Link href="/contact">
                    Nous contacter
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Company Info Card */}
        <section className="py-16 sm:py-20 lg:py-24 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-lg">
                  IEB
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">{companyInfo.name}</h2>
                  <p className="text-sm text-muted-foreground">{companyInfo.form}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-xs text-muted-foreground mb-1">RCCM</p>
                  <p className="text-sm font-semibold text-foreground">{companyInfo.rccm}</p>
                </div>
                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-xs text-muted-foreground mb-1">Capital social</p>
                  <p className="text-sm font-semibold text-foreground">{companyInfo.capital}</p>
                </div>
                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-xs text-muted-foreground mb-1">Duree</p>
                  <p className="text-sm font-semibold text-foreground">{companyInfo.duration}</p>
                </div>
                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-xs text-muted-foreground mb-1">Creee en</p>
                  <p className="text-sm font-semibold text-foreground">{companyInfo.founded}</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Gerante</p>
                      <p className="text-sm font-medium text-foreground">{companyInfo.manager}</p>
                    </div>
                  </div>
                  <div className="sm:ml-auto flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Siege social</p>
                      <p className="text-sm font-medium text-foreground">{companyInfo.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 sm:py-20 lg:py-24 bg-muted">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:gap-12 lg:grid-cols-2">
              <div className="p-5 sm:p-8 border border-border rounded-xl sm:rounded-2xl bg-card hover:shadow-lg transition-shadow">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-primary/10 text-primary mb-4 sm:mb-6">
                  <Target className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">Notre Mission</h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Fournir des services de qualite superieure qui simplifient et facilitent la vie quotidienne de nos clients. Nous nous engageons a etre le partenaire de confiance pour toutes les demarches administratives et operationnelles en RDC et a l&apos;etranger.
                </p>
              </div>
              <div className="p-5 sm:p-8 border border-border rounded-xl sm:rounded-2xl bg-card hover:shadow-lg transition-shadow">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-accent/10 text-accent mb-4 sm:mb-6">
                  <Eye className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">Notre Vision</h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Devenir le leader des services multiservices en RDC, reconnu pour notre excellence, notre fiabilite et notre capacite d&apos;adaptation. Nous aspirons a accompagner la croissance economique de notre pays.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 sm:py-20 lg:py-24 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
              <p className="text-xs sm:text-sm font-medium text-primary mb-2 tracking-wider uppercase">
                Ce qui nous definit
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                Nos Valeurs
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 md:grid-cols-3">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="text-center p-5 sm:p-8 bg-card rounded-xl sm:rounded-2xl border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto mb-4 sm:mb-6">
                    <value.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Domains - Based on Article 4 of Statutes */}
        <section className="py-16 sm:py-20 lg:py-24 bg-muted">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10 sm:mb-16">
              <p className="text-xs sm:text-sm font-medium text-primary mb-2 tracking-wider uppercase">
                Article 4 - Objet social
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground text-balance">
                Domaines d&apos;activite
              </h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                Conformement a nos statuts, IEB opere en Republique Democratique du Congo et a l&apos;etranger dans les domaines suivants :
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {domains.map((domain) => (
                <div
                  key={domain.title}
                  className="group overflow-hidden rounded-xl sm:rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
                >
                  <div className="relative h-32 sm:h-40 overflow-hidden">
                    <Image
                      src={domain.image}
                      alt={domain.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  </div>
                  <div className="p-4 sm:p-6 -mt-6 relative z-10">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-primary text-primary-foreground mb-3 sm:mb-4 shadow-lg">
                      <domain.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">
                      {domain.title}
                    </h3>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {domain.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                          <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ARSP Certification */}
        <section className="py-16 sm:py-20 lg:py-24 bg-primary">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-xs sm:text-sm font-medium text-primary-foreground/70 mb-2 tracking-wider uppercase">
                Certification officielle
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary-foreground mb-4">
                Entreprise enregistree aupres de l&apos;ARSP
              </h2>
              <p className="text-base sm:text-lg text-primary-foreground/80 leading-relaxed mb-8">
                Infinity Express Business est officiellement enregistree aupres de l&apos;Autorite de Regulation de la Sous-traitance dans le secteur Prive (ARSP) en Republique Democratique du Congo.
              </p>
              <Button asChild size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
                <a href={ARSP_LINK} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Consulter notre fiche ARSP
                </a>
              </Button>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  )
}
