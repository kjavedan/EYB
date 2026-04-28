"use client";

import Loading from "@/app/loading";
import i18n from "@/lib/i18n";
import type React from "react";
import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";

export function I18nProvider({ children }: { children: React.ReactNode }) {
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		// Initialize i18n on client side
		const initI18n = async () => {
			try {
				if (!i18n.isInitialized) {
					await i18n.init();
				}

				// Get saved language from localStorage
				const savedLanguage = localStorage.getItem("language");
				if (savedLanguage) {
					await i18n.changeLanguage(savedLanguage);
					document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
					document.documentElement.lang = savedLanguage;
				} else {
					// If no saved language, set default direction based on current language
					document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
					document.documentElement.lang = i18n.language;
				}

				setIsInitialized(true);
			} catch (error) {
				console.error("Failed to initialize i18n:", error);
				setIsInitialized(true); // Still render even if i18n fails
			}
		};

		initI18n();

		// Always keep document.dir / document.lang in sync with the active
		// language — even if the language changes from somewhere else (e.g.
		// the language selector dropdown).
		const handleLanguageChanged = (lng: string) => {
			document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
			document.documentElement.lang = lng;
		};
		i18n.on("languageChanged", handleLanguageChanged);
		return () => {
			i18n.off("languageChanged", handleLanguageChanged);
		};
	}, []);

	// Show loading or render children
	if (!isInitialized) {
		return <Loading />;
	}

	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
