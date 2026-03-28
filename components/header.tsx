"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Menu, X, Bell, FolderOpen, Settings, LogOut, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getExpiringSoonDays } from "@/lib/config"
import { useSession, signOut } from "@/lib/auth-client"

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Présentation", href: "/presentation" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const router = useRouter()
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [untreatedCount, setUntreatedCount] = useState(0)
  const [expiringDocsCount, setExpiringDocsCount] = useState(0)

  const handleLogout = async () => {
    await signOut()
    router.push("/")
    router.refresh()
  }

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch messages count
        const messagesResponse = await fetch("/api/messages/count")
        if (messagesResponse.ok) {
          const messagesData = await messagesResponse.json()
          setUntreatedCount(messagesData.count || 0)
        }

        // Fetch expiring documents count using current config
        const days = getExpiringSoonDays()
        const docsResponse = await fetch(`/api/documents/expiring?days=${days}`)
        if (docsResponse.ok) {
          const docsData = await docsResponse.json()
          setExpiringDocsCount(docsData.count || 0)
        }
      } catch (error) {
        // Silently fail - counts will show 0
      }
    }
    fetchCounts()
    // Update counts periodically
    const interval = setInterval(fetchCounts, 10000)
    
    // Listen for config changes
    const handleConfigUpdate = () => fetchCounts()
    window.addEventListener("config-updated", handleConfigUpdate)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener("config-updated", handleConfigUpdate)
    }
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
            IEB
          </div>
          <span className="hidden sm:block font-semibold text-foreground">
            Infinity Express
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="hidden md:flex md:items-center md:gap-4">
          {session && (
            <>
              {/* User name */}
              <span className="text-sm font-medium text-foreground">
                {session.user?.name || session.user?.email?.split("@")[0] || "Admin"}
              </span>
              {/* Settings */}
              <Link 
                href="/admin/parametres" 
                className="p-2 text-muted-foreground hover:text-foreground transition-colors group"
                title="Parametres"
              >
                <Settings className="h-5 w-5 group-hover:scale-110 group-hover:rotate-90 transition-transform duration-300" />
              </Link>
              {/* Documents */}
              <Link 
                href="/admin/documents" 
                className="relative p-2 text-muted-foreground hover:text-foreground transition-colors group"
                title={expiringDocsCount > 0 ? `${expiringDocsCount} document${expiringDocsCount !== 1 ? 's' : ''} expire${expiringDocsCount !== 1 ? 'nt' : ''} bientot` : "Documents"}
              >
                <FolderOpen className="h-5 w-5 group-hover:scale-110 transition-transform" />
                {expiringDocsCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white animate-pulse shadow-lg">
                    {expiringDocsCount > 9 ? "9+" : expiringDocsCount}
                  </span>
                )}
              </Link>
              {/* Notification Bell */}
              <Link 
                href="/admin/messages" 
                className="relative p-2 text-muted-foreground hover:text-foreground transition-colors group"
                title={`Messages (${untreatedCount} non traité${untreatedCount !== 1 ? 's' : ''})`}
              >
                <Bell className="h-5 w-5 group-hover:scale-110 transition-transform" />
                {untreatedCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white animate-pulse shadow-lg">
                    {untreatedCount > 9 ? "9+" : untreatedCount}
                  </span>
                )}
              </Link>
              {/* Logout */}
              <button
                onClick={handleLogout}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors group"
                title="Deconnexion"
              >
                <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </button>
            </>
          )}
          {!session && (
            <Link 
              href="/login" 
              className="p-2 text-muted-foreground hover:text-foreground transition-colors group"
              title="Connexion admin"
            >
              <LogIn className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </Link>
          )}
          <Button asChild className="transition-all duration-300 hover:scale-105 hover:shadow-md">
            <Link href="/contact">Nous contacter</Link>
          </Button>
        </div>

        {/* Mobile notification and menu */}
        <div className="flex items-center gap-2 md:hidden">
          {session && (
            <>
              <span className="text-xs font-medium text-foreground truncate max-w-20">
                {session.user?.name || session.user?.email?.split("@")[0] || "Admin"}
              </span>
              <Link 
                href="/admin/parametres" 
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                title="Parametres"
              >
                <Settings className="h-5 w-5" />
              </Link>
              <Link 
                href="/admin/documents" 
                className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
                title={expiringDocsCount > 0 ? `${expiringDocsCount} document${expiringDocsCount !== 1 ? 's' : ''} expire${expiringDocsCount !== 1 ? 'nt' : ''} bientot` : "Documents"}
              >
                <FolderOpen className="h-5 w-5" />
                {expiringDocsCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white animate-pulse shadow-lg">
                    {expiringDocsCount > 9 ? "9+" : expiringDocsCount}
                  </span>
                )}
              </Link>
              <Link 
                href="/admin/messages" 
                className="relative p-2 text-muted-foreground hover:text-foreground transition-colors group"
                title={`Messages (${untreatedCount} non traité${untreatedCount !== 1 ? 's' : ''})`}
              >
                <Bell className="h-5 w-5 group-hover:scale-110 transition-transform" />
                {untreatedCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white animate-pulse shadow-lg">
                    {untreatedCount > 9 ? "9+" : untreatedCount}
                  </span>
                )}
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                title="Deconnexion"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </>
          )}
          {!session && (
            <Link 
              href="/login" 
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              title="Connexion admin"
            >
              <LogIn className="h-5 w-5" />
            </Link>
          )}
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Ouvrir le menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div 
        className={`md:hidden bg-background border-b border-border overflow-hidden transition-all duration-300 ease-out ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 px-6 py-4">
          {navigation.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className="block py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200"
              style={{ transitionDelay: mobileMenuOpen ? `${index * 50}ms` : "0ms" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4">
            <Button asChild className="w-full transition-transform hover:scale-[1.02]">
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                Nous contacter
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
