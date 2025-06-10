"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { I18nextProvider } from "react-i18next"
import i18n from "@/lib/i18n"

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Initialize i18n on client side
    const initI18n = async () => {
      try {
        if (!i18n.isInitialized) {
          await i18n.init()
        }

        // Get saved language from localStorage
        const savedLanguage = localStorage.getItem("language")
        if (savedLanguage && savedLanguage !== i18n.language) {
          await i18n.changeLanguage(savedLanguage)
          document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr"
          document.documentElement.lang = savedLanguage
        }

        setIsInitialized(true)
      } catch (error) {
        console.error("Failed to initialize i18n:", error)
        setIsInitialized(true) // Still render even if i18n fails
      }
    }

    initI18n()
  }, [])

  // Show loading or render children
  if (!isInitialized) {
    return <div>Loading...</div>
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
