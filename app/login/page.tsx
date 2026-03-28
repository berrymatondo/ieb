"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { signIn, signUp } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Mail, AlertCircle, ArrowLeft, Eye, EyeOff, UserPlus, LogIn } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      if (isSignUp) {
        // Validation
        if (password !== confirmPassword) {
          setError("Les mots de passe ne correspondent pas")
          setLoading(false)
          return
        }
        if (password.length < 8) {
          setError("Le mot de passe doit contenir au moins 8 caracteres")
          setLoading(false)
          return
        }

        const result = await signUp.email({
          email,
          password,
          name: name || email.split("@")[0],
        })

        if (result.error) {
          setError(result.error.message || "Erreur lors de la creation du compte")
        } else {
          setSuccess("Compte cree avec succes! Vous pouvez maintenant vous connecter.")
          setIsSignUp(false)
          setPassword("")
          setConfirmPassword("")
        }
      } else {
        const result = await signIn.email({
          email,
          password,
          callbackURL: "/admin/messages",
        })

        if (result.error) {
          setError(result.error.message || "Identifiants incorrects")
        } else {
          // Force redirect to admin messages
          window.location.href = "/admin/messages"
        }
      }
    } catch (err) {
      setError("Une erreur est survenue. Veuillez reessayer.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to home */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour a l&apos;accueil
        </Link>

        <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/placeholder-logo.png"
              alt="IEB Logo"
              width={80}
              height={80}
              className="rounded-xl"
            />
          </div>

          <h1 className="text-2xl font-bold text-center text-foreground mb-2">
            {isSignUp ? "Creer un compte" : "Connexion Admin"}
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-8">
            {isSignUp 
              ? "Creez un nouveau compte administrateur" 
              : "Acces reserve aux administrateurs IEB"}
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              <p className="text-sm">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Nom (optionnel)</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@ieb-btp.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 pr-10 h-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="pl-10 pr-10 h-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-base"
              disabled={loading}
            >
              {loading ? (
                isSignUp ? "Creation en cours..." : "Connexion en cours..."
              ) : (
                <>
                  {isSignUp ? <UserPlus className="h-5 w-5 mr-2" /> : <LogIn className="h-5 w-5 mr-2" />}
                  {isSignUp ? "Creer le compte" : "Se connecter"}
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError("")
                setSuccess("")
                setPassword("")
                setConfirmPassword("")
              }}
              className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
            >
              {isSignUp ? (
                <>Deja un compte? <span className="text-primary font-medium">Se connecter</span></>
              ) : (
                <>Pas encore de compte? <span className="text-primary font-medium">Creer un compte</span></>
              )}
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          © {new Date().getFullYear()} IEB - Tous droits reserves
        </p>
      </div>
    </div>
  )
}
