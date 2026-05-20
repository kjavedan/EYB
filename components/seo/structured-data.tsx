"use client";

import { useTranslation } from "react-i18next";

export function ServiceStructuredData() {
	const { t } = useTranslation();

	const structuredData = {
		"@context": "https://schema.org",
		"@type": "Service",
		name: t("services.title", { defaultValue: "Simple Business Systems" }),
		provider: {
			"@type": "Organization",
			name: "EYB",
			url: "https://eyb.ae",
		},
		serviceType: "Order, booking, and WhatsApp automation systems",
		description:
			"We build simple systems for local businesses that still handle orders and bookings manually.",
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
						name: t("services.items.order_management.title", {
							defaultValue: "Order Management System",
						}),
						description: t("services.items.order_management.description", {
							defaultValue:
								"A simple order flow that replaces manual order-taking, missing details, and staff back-and-forth.",
						}),
					},
				},
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: t("services.items.booking_system.title", {
							defaultValue: "Booking System",
						}),
						description: t("services.items.booking_system.description", {
							defaultValue:
								"A clear booking system that helps customers book faster and reduces missed appointments.",
						}),
					},
				},
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: t("services.items.whatsapp_automation.title", {
							defaultValue: "WhatsApp Ordering Automation",
						}),
						description: t("services.items.whatsapp_automation.description", {
							defaultValue:
								"Structured WhatsApp flows that collect the right details, send confirmations, and cut message chaos.",
						}),
					},
				},
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: t("services.items.internal_tool.title", {
							defaultValue: "Simple Internal Tool",
						}),
						description: t("services.items.internal_tool.description", {
							defaultValue:
								"Lightweight staff tools for daily order lists, booking boards, status tracking, and simple operations.",
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
		"what_do_you_build",
		"who_is_this_for",
		"do_i_need_to_change_whatsapp",
		"how_long_does_it_take",
		"will_my_staff_need_training",
		"can_we_start_small",
		"what_if_i_already_use_something",
		"how_do_we_start",
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
