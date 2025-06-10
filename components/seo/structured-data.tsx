"use client"

import { useTranslation } from "react-i18next"

export function ServiceStructuredData() {
  const { t } = useTranslation()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("services.title", { defaultValue: "Web Development Services" }),
    provider: {
      "@type": "Person",
      name: "Khaled Javdan",
    },
    serviceType: "Web Development",
    description:
      "Professional web development services including custom websites, e-commerce stores, and web applications",
    areaServed: {
      "@type": "Place",
      name: "Dubai, UAE",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Personal & Business Websites",
            description: t("services.items.personal_business.description", {
              defaultValue: "Website to showcase your personal brand or business",
            }),
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "E-commerce Stores",
            description: t("services.items.store_owners.description", {
              defaultValue: "Professional online stores for business owners",
            }),
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Product Marketing",
            description: t("services.items.product_sellers.description", {
              defaultValue: "Marketing solutions for product sellers",
            }),
          },
        },
      ],
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export function FAQStructuredData() {
  const { t } = useTranslation()

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
  ]

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
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export function PricingStructuredData() {
  const { t } = useTranslation()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Web Development Services",
    description: "Professional web development packages for businesses",
    offers: [
      {
        "@type": "Offer",
        name: "Starter Package",
        price: "4999",
        priceCurrency: "AED",
        description: "Perfect for starting personal or business websites",
        seller: {
          "@type": "Person",
          name: "Khaled Javdan",
        },
      },
      {
        "@type": "Offer",
        name: "Growth Package",
        price: "9400",
        priceCurrency: "AED",
        description: "Ideal for businesses aiming to grow with custom solutions",
        seller: {
          "@type": "Person",
          name: "Khaled Javdan",
        },
      },
      {
        "@type": "Offer",
        name: "Elite Package",
        price: "17999",
        priceCurrency: "AED",
        description: "Premium custom designs & solutions for top-tier businesses",
        seller: {
          "@type": "Person",
          name: "Khaled Javdan",
        },
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
