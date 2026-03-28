// Configuration centrale de l'application

// Valeurs par defaut
export const DEFAULT_CONFIG = {
  // Nombre de SEMAINES avant expiration pour afficher une notification
  EXPIRING_SOON_WEEKS: 4,
}

// Cle de stockage localStorage
const STORAGE_KEY = "ieb_app_config"

// Recuperer la configuration depuis localStorage (cote client uniquement)
export function getConfig() {
  if (typeof window === "undefined") {
    return DEFAULT_CONFIG
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return { ...DEFAULT_CONFIG, ...JSON.parse(stored) }
    }
  } catch (e) {
    console.error("Error reading config:", e)
  }
  
  return DEFAULT_CONFIG
}

// Sauvegarder la configuration dans localStorage
export function saveConfig(config: Partial<typeof DEFAULT_CONFIG>) {
  if (typeof window === "undefined") return
  
  try {
    const current = getConfig()
    const updated = { ...current, ...config }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    // Dispatch event pour notifier les autres composants
    window.dispatchEvent(new CustomEvent("config-updated", { detail: updated }))
  } catch (e) {
    console.error("Error saving config:", e)
  }
}

// Fonction utilitaire pour convertir en jours
export function getExpiringSoonDays() {
  return getConfig().EXPIRING_SOON_WEEKS * 7
}

// Pour la compatibilite avec le code existant
export const CONFIG = DEFAULT_CONFIG
