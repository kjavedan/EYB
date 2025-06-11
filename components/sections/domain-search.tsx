"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import dynamic from "next/dynamic"
import Button from "@/components/ui/button"
import { useTranslation } from "react-i18next"

// Dynamically import Confetti to avoid SSR issues
const Confetti = dynamic(() => import("react-confetti"), { ssr: false })

export default function DomainSearch() {
  const { t } = useTranslation()
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const [domain, setDomain] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [popupVisible, setPopupVisible] = useState(false)
  const MAX_ATTEMPTS = 10

  // Set dimensions on client side
  useState(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }
  })

  const validateInput = () => {
    const domainRegex = /^[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/
    return domainRegex.test(domain)
  }

  const checkDomainStatus = async () => {
    if (attempts >= MAX_ATTEMPTS) {
      alert(t("domainSearch.search.attempts.max_reached"))
      return
    }

    if (!validateInput()) {
      alert(t("domainSearch.search.error"))
      return
    }

    setLoading(true)
    setResult(null)

    console.log(process.env.NEXT_PUBLIC_RAPIDAPI_KEY)

    const url = `https://domainr.p.rapidapi.com/v2/status?domain=${encodeURIComponent(domain)}`
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
        "x-rapidapi-host": "domainr.p.rapidapi.com",
      },
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      const domainStatus = data.status[0]

      if (domainStatus) {
        const { status } = domainStatus
        if (status.includes("undelegated") || status.includes("inactive")) {
          setResult({ available: true, domain })
          setPopupVisible(true)
        } else {
          setResult({ available: false, domain })
        }
      } else {
        setResult({
          error: t("domainSearch.search.error"),
        })
      }
    } catch (error) {
      console.error("Error checking domain status:", error)
      alert(t("domainSearch.search.error"))
    } finally {
      setLoading(false)
      setAttempts((prev) => prev + 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomain(e.target.value)
    setResult(null)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      checkDomainStatus()
    }
  }

  const closePopup = () => {
    setPopupVisible(false)
  }

  return (
    <section className="py-20">
      <div className="flex flex-col max-w-2xl mx-auto px-4">
        <h2 className="text-center text-3xl max-w-full mx-auto leading-[50px] lg:text-4xl xl:text-5xl lg:leading-[80px] xl:leading-[90px]">
          {t("domainSearch.title")}
        </h2>

        <div className="mt-8 flex">
          <input
            value={domain}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder={t("domainSearch.search.placeholder")}
            className="w-full text-white mx-auto text-xl rounded-full bg-transparent border-solid border border-[--border-color] px-5 py-8 outline-none focus:ring ring-[--secondary-color]"
          />
        </div>

        <motion.button
          onClick={checkDomainStatus}
          className="btn__primary mx-auto mt-8"
          whileHover={{ scale: 1.1 }}
          disabled={loading || attempts >= MAX_ATTEMPTS}
        >
          {loading ? t("domainSearch.search.checking") : t("domainSearch.search.button")}
        </motion.button>

        {attempts >= MAX_ATTEMPTS && (
          <div className="text-center mt-4 text-red-500">⚠️ {t("domainSearch.search.attempts.max_reached")}</div>
        )}

        {result && !result.available && (
          <div className="text-center mt-4 text-red-500">
            😞 {t("domainSearch.search.unavailable", { domain: result.domain })}
          </div>
        )}

        {result && result.error && <div className="text-center mt-4 text-red-500">⚠️ {result.error}</div>}

        {popupVisible && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-75"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <div className="relative bg-black p-4 text-center h-full w-full flex items-center justify-center">
              <div onClick={closePopup} className="absolute top-4 right-4 text-white text-2xl cursor-pointer">
                <Icon icon={"material-symbols:close-rounded"} />
              </div>
              <div>
                {typeof window !== "undefined" && <Confetti width={width} height={height} />}
                <h4 className="text-3xl leading-[50px] lg:text-5xl lg:leading-[90px] max-w-4xl text-white">
                  🎉 {t("domainSearch.search.available", { domain: result?.domain })}
                </h4>
                <p className="text-xl my-4">{t("domainSearch.search.claim")}</p>
                <Button text={"buy_now"} />
              </div>
            </div>
          </motion.div>
        )}

        <div className="text-center mt-4 text-gray-400">
          {attempts < MAX_ATTEMPTS
            ? t("domainSearch.search.attempts.left", {
                count: MAX_ATTEMPTS - attempts,
              })
            : t("domainSearch.search.attempts.none")}
        </div>
      </div>
    </section>
  )
}
