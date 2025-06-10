"use client";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") || "en";
      setCurrentLanguage(savedLanguage);
      if (savedLanguage !== i18n.language) {
        changeLanguage(savedLanguage);
      }
    }
  }, [i18n]);

  const changeLanguage = async (lng: string) => {
    try {
      await i18n.changeLanguage(lng);
      setCurrentLanguage(lng);

      if (typeof document !== "undefined") {
        document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = lng;
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("language", lng);
      }
      setOpen(false);
    } catch (error) {
      console.error("Failed to change language:", error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center gap-2 h-8 px-3 rounded-full border border-[--border-color] bg-[--bg-color] text-white hover:border-[--secondary-color] transition-colors text-sm"
      >
        <span className="whitespace-nowrap">
          {currentLanguage === "en" ? "EN" : "AR"}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Icon icon="mdi:chevron-down" className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 px-2 min-w-[120px] bg-black border border-[--border-color] rounded-2xl shadow-lg z-50"
          >
            <div className="py-2">
              <button
                onClick={() => changeLanguage("en")}
                className="w-full px-4 py-2 text-left text-white hover:bg-[--secondary-color] rounded-xl transition-colors text-sm"
              >
                English
              </button>
              <button
                onClick={() => changeLanguage("ar")}
                className="w-full px-4 py-2 text-left text-white hover:bg-[--secondary-color] rounded-xl transition-colors text-sm"
              >
                العربيه
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop to close dropdown */}
      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}
    </div>
  );
}
