"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Settings, Bell, FolderOpen, Save, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getConfig, saveConfig, DEFAULT_CONFIG } from "@/lib/config"

export default function ParametresPage() {
  const [expiringWeeks, setExpiringWeeks] = useState(DEFAULT_CONFIG.EXPIRING_SOON_WEEKS)
  const [saved, setSaved] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    const config = getConfig()
    setExpiringWeeks(config.EXPIRING_SOON_WEEKS)
  }, [])

  const handleWeeksChange = (value: string) => {
    const weeks = parseInt(value) || 1
    setExpiringWeeks(Math.max(1, Math.min(52, weeks)))
    setHasChanges(true)
    setSaved(false)
  }

  const handleSave = () => {
    saveConfig({ EXPIRING_SOON_WEEKS: expiringWeeks })
    setSaved(true)
    setHasChanges(false)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleReset = () => {
    setExpiringWeeks(DEFAULT_CONFIG.EXPIRING_SOON_WEEKS)
    setHasChanges(true)
    setSaved(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/admin/documents"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux documents
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Settings className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Parametres</h1>
                <p className="text-muted-foreground">Configurez les options de l&apos;application</p>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {saved && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700">
              <CheckCircle2 className="h-5 w-5" />
              <span>Parametres enregistres avec succes !</span>
            </div>
          )}

          {/* Documents Settings */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FolderOpen className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>Parametres lies a la gestion des documents</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="expiringWeeks" className="text-base font-medium">
                    Delai d&apos;alerte avant expiration
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1 mb-3">
                    Les documents expirant dans ce delai seront signales par une notification dans le header.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Input
                        id="expiringWeeks"
                        type="number"
                        min={1}
                        max={52}
                        value={expiringWeeks}
                        onChange={(e) => handleWeeksChange(e.target.value)}
                        className="w-24 text-center text-lg font-semibold"
                      />
                      <span className="text-muted-foreground">semaine{expiringWeeks > 1 ? "s" : ""}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      = {expiringWeeks * 7} jours
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Bell className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">Apercu</p>
                      <p className="text-muted-foreground mt-1">
                        Avec cette configuration, vous recevrez une notification pour les documents 
                        expirant dans les <span className="font-semibold text-orange-600">{expiringWeeks} prochaines semaines</span>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={handleReset}>
              Reinitialiser par defaut
            </Button>
            <Button onClick={handleSave} disabled={!hasChanges} className="gap-2">
              <Save className="h-4 w-4" />
              Enregistrer les modifications
            </Button>
          </div>

          {/* Info */}
          <div className="mt-8 p-4 bg-muted/30 rounded-xl border border-border">
            <p className="text-sm text-muted-foreground">
              Les parametres sont sauvegardes localement dans votre navigateur. 
              Ils seront conserves meme apres la fermeture de la page.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
