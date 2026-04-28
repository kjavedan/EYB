import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationAR from "@/locales/ar/translation.json";
// Import translations
import translationEN from "@/locales/en/translation.json";

const resources = {
	en: {
		translation: translationEN,
	},
	ar: {
		translation: translationAR,
	},
};

// Initialize i18n
i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: "en",
		debug: false,
		interpolation: {
			escapeValue: false,
		},
		detection: {
			order: ["localStorage", "navigator"],
			caches: ["localStorage"],
			// Use the same key the LanguageSelector writes to, so the detector
			// and the manual selector stay in sync across reloads.
			lookupLocalStorage: "language",
		},
		react: {
			useSuspense: false,
		},
	});

export default i18n;
