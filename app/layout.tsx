import type { Metadata } from "next";
import { Montserrat, Noto_Sans_Arabic, Poppins } from "next/font/google";
import type React from "react";
import "./globals.css";
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
		default: "EYB — Websites, Mobile Apps & Custom Software in Dubai, UAE",
		template: "%s | EYB",
	},
	description:
		"EYB builds websites, mobile apps, and custom software for businesses in Dubai and across the UAE. Practical digital tools that take busywork off your plate and help your business grow.",
	keywords: [
		"EYB",
		"EYB Dubai",
		"web development Dubai",
		"mobile app development Dubai",
		"custom software UAE",
		"e-commerce development UAE",
		"Shopify development Dubai",
		"Next.js development",
		"React development",
		"iOS app development Dubai",
		"Android app development UAE",
		"business automation Dubai",
		"internal tools development",
		"digital agency Dubai",
		"marketing campaigns UAE",
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
		languages: {
			"en-US": "/en",
			"ar-AE": "/ar",
		},
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://eyb.ae",
		title: "EYB — Websites, Mobile Apps & Custom Software in Dubai, UAE",
		description:
			"EYB builds websites, mobile apps, and custom software for businesses in Dubai and across the UAE. Tools that take busywork off your plate and help your business grow.",
		siteName: "EYB",
		images: [
			{
				url: "/images/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "EYB — Websites, Mobile Apps & Custom Software",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "EYB — Websites, Mobile Apps & Custom Software in Dubai, UAE",
		description:
			"We build websites, mobile apps, and custom software for businesses in Dubai and the UAE.",
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
								"EYB builds websites, mobile apps, and custom software for businesses in Dubai and across the UAE.",
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
								"Web Development",
								"Mobile App Development",
								"Custom Software Development",
								"E-commerce Development",
								"Business Automation",
								"Internal Tools",
								"Marketing Campaigns",
								"Next.js",
								"React",
								"iOS",
								"Android",
								"Shopify",
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
								"Websites, mobile apps, and custom software for businesses in Dubai and the UAE.",
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
							priceRange: "$$",
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
											name: "Web Development",
											description:
												"Landing pages, business websites, and e-commerce stores built to convert.",
										},
									},
									{
										"@type": "Offer",
										itemOffered: {
											"@type": "Service",
											name: "Mobile Development",
											description:
												"Custom iOS and Android apps tailored to your business.",
										},
									},
									{
										"@type": "Offer",
										itemOffered: {
											"@type": "Service",
											name: "Custom Software",
											description:
												"Internal tools, dashboards, and automation systems built around your workflow.",
										},
									},
									{
										"@type": "Offer",
										itemOffered: {
											"@type": "Service",
											name: "Marketing Campaigns",
											description:
												"Content and ad campaigns on Meta and Google to grow your customer base.",
										},
									},
								],
							},
						}),
					}}
				/>
			</head>
			<body>
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
