import Link from "next/link"
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react"

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

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 col-span-2 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-base sm:text-lg">
                IEB
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
            <h3 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4">Nos Services</h3>
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
            </ul>
          </div>
        </div>

        {/* ARSP Badge */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 p-4 bg-background/5 rounded-xl">
          <div className="text-center sm:text-left">
            <p className="text-xs sm:text-sm font-medium text-background">Entreprise certifiee ARSP</p>
            <p className="text-xs text-background/60">Autorite de Regulation de la Sous-traitance dans le secteur Prive</p>
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
              &copy; {new Date().getFullYear()} Infinity Express Business SARLU. Tous droits reserves.
            </p>
            <p className="text-xs text-background/40">
              RCCM: CD/LSH/RCCM/25-B-01750
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
