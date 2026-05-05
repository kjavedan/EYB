"use client";

import { useTranslation } from "react-i18next";

export function ServiceStructuredData() {
	const { t } = useTranslation();

	const structuredData = {
		"@context": "https://schema.org",
		"@type": "Service",
		name: t("services.title", { defaultValue: "Digital Growth Services" }),
		provider: {
			"@type": "Organization",
			name: "EYB",
			url: "https://eyb.ae",
		},
		serviceType: "Digital Marketing & Customer Acquisition",
		description:
			"Done-for-you digital growth — website, marketing, content, and follow-up systems built to bring small businesses more customers online.",
		areaServed: {
			"@type": "Place",
			name: "Dubai, UAE",
		},
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: "EYB Services",
			itemListElement: [
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: t("services.items.website.title", {
							defaultValue: "Website + Conversion System",
						}),
						description: t("services.items.website.description", {
							defaultValue:
								"A site built to turn visitors into customers — clear offer, smart layout, lead capture, WhatsApp and booking wired in.",
						}),
					},
				},
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: t("services.items.marketing.title", {
							defaultValue: "Marketing + Lead Generation",
						}),
						description: t("services.items.marketing.description", {
							defaultValue:
								"Targeted campaigns that bring the right people to your offer, with tracking that shows what's actually working.",
						}),
					},
				},
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: t("services.items.content.title", {
							defaultValue: "Content + Brand Consistency",
						}),
						description: t("services.items.content.description", {
							defaultValue:
								"Posts, reels, and visuals that show up regularly and look like one brand — not random posts from random tools.",
						}),
					},
				},
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: t("services.items.automation.title", {
							defaultValue: "Automation + Follow-up Systems",
						}),
						description: t("services.items.automation.description", {
							defaultValue:
								"AI and automations that follow up with leads, answer common questions, and handle the repetitive work for you.",
						}),
					},
				},
			],
		},
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>
	);
}

export function FAQStructuredData() {
	const { t } = useTranslation();

	const faqKeys = [
		"starter_example",
		"development_time",
		"support",
		"customization",
		"training",
		"pricing",
		"why_me",
		"platforms",
		"design_approach",
		"post_launch",
		"ecommerce",
		"process",
		"integrations",
		"mobile_friendly",
	];

	const structuredData = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqKeys.map((key) => ({
			"@type": "Question",
			name: t(`faq.questions.${key}.question`, { defaultValue: "Question" }),
			acceptedAnswer: {
				"@type": "Answer",
				text: t(`faq.questions.${key}.answer`, { defaultValue: "Answer" }),
			},
		})),
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>
	);
}

export function PricingStructuredData() {
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "Product",
		name: "EYB Growth Packages",
		description:
			"Done-for-you digital growth packages for small businesses — website, marketing, content, and follow-up systems combined into one monthly engagement.",
		brand: {
			"@type": "Brand",
			name: "EYB",
		},
		offers: [
			{
				"@type": "Offer",
				name: "Foundation",
				price: "7000",
				priceCurrency: "AED",
				description:
					"Make your business look professional online — a conversion-ready website with WhatsApp and form lead capture, GA4 tracking, and brand setup. Includes 1 month of support.",
				url: "https://eyb.ae/#pricing",
				availability: "https://schema.org/InStock",
				seller: { "@type": "Organization", name: "EYB" },
			},
			{
				"@type": "Offer",
				name: "Growth",
				price: "14000",
				priceCurrency: "AED",
				description:
					"Bring customers consistently — everything in Foundation plus ad campaigns, lead tracking (CRM), follow-up automation, and ongoing optimization. Includes 2 months of support.",
				url: "https://eyb.ae/#pricing",
				availability: "https://schema.org/InStock",
				seller: { "@type": "Organization", name: "EYB" },
			},
			{
				"@type": "Offer",
				name: "Elite",
				price: "35000",
				priceCurrency: "AED",
				description:
					"Done-for-you end-to-end digital business system — everything in Growth plus advanced custom systems, full automation architecture, and content + marketing at scale. Includes 3 months of support.",
				url: "https://eyb.ae/#pricing",
				availability: "https://schema.org/InStock",
				seller: { "@type": "Organization", name: "EYB" },
			},
		],
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>
	);
}
