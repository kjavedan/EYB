"use client";

import i18n from "@/lib/i18n";
import type React from "react";
import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";

export function I18nProvider({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		const syncDocument = (lng: string) => {
			document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
			document.documentElement.lang = lng;
		};

		const savedLanguage = localStorage.getItem("language");
		if (savedLanguage && savedLanguage !== i18n.language) {
			i18n.changeLanguage(savedLanguage);
		} else {
			syncDocument(i18n.language);
		}

		i18n.on("languageChanged", syncDocument);
		return () => {
			i18n.off("languageChanged", syncDocument);
		};
	}, []);

	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
