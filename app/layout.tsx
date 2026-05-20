import type { Metadata } from "next";
import { Montserrat, Noto_Sans_Arabic, Poppins } from "next/font/google";
import type React from "react";
import "./globals.css";
import { MetaPixel } from "@/components/analytics/meta-pixel";
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts";
import { Header } from "@/components/layout/header";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import {
	INSTAGRAM_URL,
	LINKEDIN_URL,
	PHONE_E164,
	SUPPORT_EMAIL,
	WHATSAPP_URL,
} from "@/lib/config";
import { Analytics } from "@vercel/analytics/next";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800", "900"],
	variable: "--font-en-primary",
	display: "swap",
});

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-en-secondary",
	display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
	subsets: ["arabic"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-ar-secondary",
	display: "swap",
});

export const metadata: Metadata = {
	title: {
		default:
			"EYB — Simple Order and Booking Systems for Local Businesses in Dubai",
		template: "%s | EYB",
	},
	description:
		"EYB builds simple systems for local businesses in Dubai that still manage orders and bookings manually. We fix WhatsApp chaos, missed bookings, and messy day-to-day operations.",
	keywords: [
		"EYB",
		"EYB Dubai",
		"restaurant ordering system Dubai",
		"restaurant booking system Dubai",
		"WhatsApp ordering system UAE",
		"WhatsApp automation Dubai",
		"small business systems Dubai",
		"manual order system replacement UAE",
		"booking management system UAE",
		"salon booking system Dubai",
		"barber booking system Dubai",
		"cafe ordering system Dubai",
		"gym booking system Dubai",
		"local business automation UAE",
	],
	authors: [{ name: "EYB", url: "https://eyb.ae" }],
	creator: "EYB",
	publisher: "EYB",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL("https://eyb.ae"),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		alternateLocale: ["ar_AE"],
		url: "https://eyb.ae",
		title:
			"EYB — Simple Order and Booking Systems for Local Businesses in Dubai",
		description:
			"We build simple systems for restaurants, cafes, salons, barbers, and studios that still handle orders or bookings manually.",
		siteName: "EYB",
		images: [
			{
				url: "/images/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "EYB builds simple order and booking systems for local businesses in Dubai",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "EYB — Simple Business Systems | Dubai, UAE",
		description:
			"We fix manual orders, missed bookings, and WhatsApp chaos with simple systems built for local businesses.",
		images: ["/images/twitter-image.jpg"],
		creator: "@eyb_ae",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${poppins.variable} ${montserrat.variable} ${notoSansArabic.variable}`}
			suppressHydrationWarning
		>
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="icon" href="/icon.svg" type="image/svg+xml" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />

				{/* Organization Schema */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "Organization",
							name: "EYB",
							legalName: "EYB",
							description:
								"EYB builds simple order, booking, and WhatsApp systems for local businesses in Dubai.",
							url: "https://eyb.ae",
							logo: "https://eyb.ae/icon.svg",
							email: SUPPORT_EMAIL,
							telephone: PHONE_E164,
							founder: {
								"@type": "Person",
								name: "Khaled Javdan",
							},
							address: {
								"@type": "PostalAddress",
								addressLocality: "Dubai",
								addressCountry: "UAE",
							},
							contactPoint: {
								"@type": "ContactPoint",
								contactType: "customer service",
								email: SUPPORT_EMAIL,
								telephone: PHONE_E164,
								areaServed: "AE",
								availableLanguage: ["en", "ar"],
							},
							sameAs: [LINKEDIN_URL, INSTAGRAM_URL, WHATSAPP_URL],
							knowsAbout: [
								"Restaurant Ordering Systems",
								"Booking Systems",
								"WhatsApp Automation",
								"Small Business Operations",
								"Internal Business Tools",
								"Salon Booking Systems",
								"Cafe Ordering Systems",
							],
						}),
					}}
				/>

				{/* Professional Service Schema */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "ProfessionalService",
							name: "EYB",
							description:
								"Simple order, booking, and WhatsApp systems for local businesses in Dubai.",
							url: "https://eyb.ae",
							telephone: PHONE_E164,
							email: SUPPORT_EMAIL,
							address: {
								"@type": "PostalAddress",
								addressLocality: "Dubai",
								addressCountry: "UAE",
							},
							geo: {
								"@type": "GeoCoordinates",
								latitude: "25.2048",
								longitude: "55.2708",
							},
							openingHours: "Mo-Su 09:00-18:00",
							priceRange: "Contact for quote",
							areaServed: {
								"@type": "Country",
								name: "United Arab Emirates",
							},
							hasOfferCatalog: {
								"@type": "OfferCatalog",
								name: "EYB Services",
								itemListElement: [
									{
										"@type": "Offer",
										itemOffered: {
											"@type": "Service",
											name: "Order Management System",
											description:
												"A simple order system for businesses still handling orders manually.",
										},
									},
									{
										"@type": "Offer",
										itemOffered: {
											"@type": "Service",
											name: "Booking System",
											description:
												"A booking flow that reduces back-and-forth messages and missed appointments.",
										},
									},
									{
										"@type": "Offer",
										itemOffered: {
											"@type": "Service",
											name: "WhatsApp Ordering Automation",
											description:
												"WhatsApp automation that collects order or booking details and sends clear confirmations.",
										},
									},
									{
										"@type": "Offer",
										itemOffered: {
											"@type": "Service",
											name: "Simple Internal Tool",
											description:
												"Lightweight tools for staff to track orders, bookings, and day-to-day status in one place.",
										},
									},
								],
							},
						}),
					}}
				/>
			</head>
			<body>
				<MetaPixel />
				<ThemeProvider>
					<KeyboardShortcuts />
					<I18nProvider>
						<Header />
						{children}
					</I18nProvider>
				</ThemeProvider>
				<Analytics />
				<Toaster />
			</body>
		</html>
	);
}
