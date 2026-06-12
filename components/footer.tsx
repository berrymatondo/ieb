import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, ExternalLink, Instagram } from "lucide-react"

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Présentation", href: "/presentation" },
  { name: "Contact", href: "/contact" },
]

const services = [
  "Promotion commerciale",
  "Transport et logistique",
  "Sous-traitance de service",
  "Immobilier et gestion",
]

const ARSP_LINK = "https://arsp.cd/details-de-lentreprise/?viawaves/nzt/callspangold/token=9d51ecc3c1796c717e164b0102fd8a98"
const INSTAGRAM_LINK = "https://www.instagram.com/infinity_express_business?utm_source=qr"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 col-span-2 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="relative h-10 w-16 overflow-hidden rounded-md bg-white sm:w-20">
                <Image
                  src="/images/ieb-logo.jpeg"
                  alt="Infinity Express Business"
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </div>
              <span className="font-semibold text-sm sm:text-base">Infinity Express Business</span>
            </div>
            <p className="text-xs sm:text-sm text-background/70 leading-relaxed">
              Entreprise de services polyvalente simplifiant la vie administrative et opérationnelle en RDC.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4">Navigation</h3>
            <ul className="space-y-2 sm:space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-xs sm:text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4">Nos services</h3>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((service) => (
                <li key={service} className="text-xs sm:text-sm text-background/70">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4">Contact</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-center gap-2 text-xs sm:text-sm text-background/70">
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                <a href="tel:+243816638807" className="hover:text-background transition-colors">
                  +243 816 638 807
                </a>
              </li>
              <li className="flex items-center gap-2 text-xs sm:text-sm text-background/70">
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                <a href="mailto:contact@ieb-rdc.com" className="hover:text-background transition-colors break-all">
                  contact@ieb-rdc.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-xs sm:text-sm text-background/70">
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 mt-0.5" />
                <span>55, Av. Lac Kipopo, Q/Baudoin, Lubumbashi, RDC</span>
              </li>
              <li className="flex items-center gap-2 text-xs sm:text-sm text-background/70">
                <Instagram className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">
                  @infinity_express_business
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ARSP Badge */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 p-4 bg-background/5 rounded-xl">
          <div className="text-center sm:text-left">
            <p className="text-xs sm:text-sm font-medium text-background">Entreprise certifiée ARSP</p>
            <p className="text-xs text-background/60">Autorité de régulation de la sous-traitance dans le secteur privé</p>
          </div>
          <a
            href={ARSP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs sm:text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Voir sur ARSP
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-background/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-background/50">
              &copy; {new Date().getFullYear()} Infinity Express Business SARLU. Tous droits réservés.
            </p>
            <p className="text-xs text-background/40">
              RCCM : CD/LSH/RCCM/25-B-01750
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
