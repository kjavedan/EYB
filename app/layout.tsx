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
		default: "EYB — Get More Customers Online | Done-for-You Growth in Dubai, UAE",
		template: "%s | EYB",
	},
	description:
		"EYB is your done-for-you digital team in Dubai. We build your website, run your marketing, create your content, and set up the systems that turn visitors into customers — so you can focus on your business.",
	keywords: [
		"EYB",
		"EYB Dubai",
		"digital marketing agency Dubai",
		"marketing agency UAE",
		"lead generation Dubai",
		"lead generation UAE",
		"customer acquisition Dubai",
		"small business marketing Dubai",
		"done-for-you marketing",
		"growth marketing Dubai",
		"performance marketing UAE",
		"social media marketing Dubai",
		"content marketing UAE",
		"Meta ads Dubai",
		"Google ads Dubai",
		"WhatsApp marketing UAE",
		"marketing automation Dubai",
		"website and marketing package Dubai",
		"business growth packages UAE",
		"conversion website Dubai",
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
		title: "EYB — Get More Customers Online | Done-for-You Growth in Dubai, UAE",
		description:
			"We act as your digital team in Dubai — website, marketing, content, and follow-up systems built to bring you customers, not just clicks.",
		siteName: "EYB",
		images: [
			{
				url: "/images/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "EYB — Get more customers online with a done-for-you digital growth team in Dubai",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "EYB — Get More Customers Online | Dubai, UAE",
		description:
			"Your done-for-you digital team in Dubai — website, marketing, content, and follow-up systems that bring you customers.",
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
								"EYB is a done-for-you digital growth team in Dubai. We build your website, run your marketing, create your content, and set up the systems that bring small businesses more customers online.",
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
								"Digital Marketing",
								"Lead Generation",
								"Customer Acquisition",
								"Conversion-Optimized Websites",
								"Content Marketing",
								"Social Media Marketing",
								"Performance Marketing",
								"Meta Ads",
								"Google Ads",
								"WhatsApp Marketing",
								"Marketing Automation",
								"Small Business Growth",
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
								"Done-for-you digital growth team in Dubai — website, marketing, content, and follow-up systems that bring small businesses more customers online.",
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
							priceRange: "AED 7,000 – AED 35,000",
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
											name: "Website + Conversion System",
											description:
												"A site built to turn visitors into customers — clear offer, smart layout, lead capture, WhatsApp and booking wired in.",
										},
									},
									{
										"@type": "Offer",
										itemOffered: {
											"@type": "Service",
											name: "Marketing + Lead Generation",
											description:
												"Targeted Meta and Google campaigns that bring the right people to your offer, with tracking that shows what's actually working.",
										},
									},
									{
										"@type": "Offer",
										itemOffered: {
											"@type": "Service",
											name: "Content + Brand Consistency",
											description:
												"Posts, reels, and visuals that show up regularly and look like one brand — not random posts from random tools.",
										},
									},
									{
										"@type": "Offer",
										itemOffered: {
											"@type": "Service",
											name: "Automation + Follow-up Systems",
											description:
												"WhatsApp flows, AI replies, and CRM follow-ups that handle leads and repetitive work for you.",
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
