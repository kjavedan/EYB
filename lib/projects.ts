import type { StaticImageData } from "next/image";

import aiyifenSrc from "@/assets/images/aiyifen.webp";
import honeySrc from "@/assets/images/honey.webp";
import jojoshpoSrc from "@/assets/images/jojoshop.jpg";
import plumbingSrc from "@/assets/images/plumbing.png";

export type Tech = {
	name: string;
	/** Iconify icon id */
	icon: string;
};

export type ProcessStep = {
	phase: string;
	description: string;
	duration: string;
};

export type Result = {
	value: string;
	label: string;
};

export type Project = {
	/** URL slug. Also keys into `testimonials.items.*` for client copy. */
	slug: string;
	image: StaticImageData;
	projectType: string;
	domainName: string;
	siteUrl: string;

	/** Quick-facts panel */
	year: string;
	timeline: string;
	services: string[];

	/** Long-form copy */
	summary: string;
	challenge: string;
	solution: string;

	techStack: Tech[];
	process: ProcessStep[];
	results: Result[];
};

export const projects: Project[] = [
	{
		slug: "aiyifen",
		image: aiyifenSrc,
		projectType: "E-commerce",
		domainName: "aiyifen.com",
		siteUrl: "https://aiyifen.com",
		year: "2024",
		timeline: "5 weeks",
		services: [
			"Design",
			"E-commerce",
			"Payments",
			"SEO",
			"Marketing campaigns",
		],
		summary:
			"Aiyifen is a Dubai-based fashion brand selling premium modest wear directly to customers across the GCC. They needed a flagship online store that felt as polished as their in-store experience and could handle Arabic-speaking shoppers from day one.",
		challenge:
			"The owner was selling exclusively through Instagram DMs — chasing payments manually, losing orders in chat threads, and unable to scale beyond what one person could reply to. There was no inventory tracking, no proper checkout, and customers asking for cash-on-delivery had no real way to order.",
		solution:
			"We built a fully bilingual (EN / AR) Shopify storefront with a custom theme matching the brand. Cash-on-delivery, Apple Pay, and card payments all work from the same checkout. Inventory syncs automatically and the team can fulfill orders from a single dashboard. Product pages were built around lifestyle photography to mirror the in-store feel.",
		techStack: [
			{ name: "Shopify", icon: "logos:shopify" },
			{ name: "Liquid", icon: "simple-icons:shopify" },
			{ name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
			{ name: "Stripe", icon: "logos:stripe" },
			{ name: "Klaviyo", icon: "simple-icons:klaviyo" },
			{ name: "Figma", icon: "logos:figma" },
		],
		process: [
			{
				phase: "Discovery",
				description:
					"Mapped the existing Instagram-DM flow, listed every step a customer goes through today, and identified where orders were getting lost.",
				duration: "Week 1",
			},
			{
				phase: "Design",
				description:
					"Designed the storefront in Figma with full RTL Arabic support, then iterated on the homepage and product pages with the client.",
				duration: "Week 2",
			},
			{
				phase: "Build",
				description:
					"Set up the Shopify store, built the custom theme, integrated payments, and connected Klaviyo for automated order emails.",
				duration: "Weeks 3–4",
			},
			{
				phase: "Launch",
				description:
					"Migrated existing customers, ran the team through fulfillment, and stayed on call for the first week of orders to fix anything that came up.",
				duration: "Week 5",
			},
		],
		results: [
			{ value: "+62%", label: "More orders in first 30 days vs Instagram DMs" },
			{ value: "0", label: "Orders lost since launch" },
			{ value: "1.4s", label: "Average page load on mobile" },
			{ value: "EN + AR", label: "Bilingual from day one" },
		],
	},
	{
		slug: "jojooshop",
		image: jojoshpoSrc,
		projectType: "E-commerce",
		domainName: "jojooshop.com",
		siteUrl: "https://shop.khaled-javdan.com",
		year: "2024",
		timeline: "4 weeks",
		services: ["Design", "E-commerce", "Payments"],
		summary:
			"Jojooshop sells curated everyday goods to a Dubai-based audience. They wanted a clean, fast online catalogue with the option to grow into a full storefront later.",
		challenge:
			"They had a list of products in a spreadsheet and customers asking where to buy. Existing platforms felt heavy and the templates didn't match how they wanted the brand to feel. They also wanted the option to add or remove items themselves without calling a developer.",
		solution:
			"A custom-built Next.js storefront with a lightweight admin panel for self-service product management. Categorized browsing, search, and a streamlined checkout. Built with future expansion in mind — product reviews and a loyalty program can be added without a rewrite.",
		techStack: [
			{ name: "Next.js", icon: "logos:nextjs-icon" },
			{ name: "TypeScript", icon: "logos:typescript-icon" },
			{ name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
			{ name: "Postgres", icon: "logos:postgresql" },
			{ name: "Stripe", icon: "logos:stripe" },
			{ name: "Vercel", icon: "logos:vercel-icon" },
		],
		process: [
			{
				phase: "Scope",
				description:
					"Defined the MVP — what features had to ship, what could wait. Cut the feature list in half so we could ship fast.",
				duration: "Week 1",
			},
			{
				phase: "Design & Build",
				description:
					"Designed and built in parallel — one component at a time, reviewed together every two days.",
				duration: "Weeks 2–3",
			},
			{
				phase: "Launch",
				description:
					"Deployed, hooked up payments, trained the team on the admin panel.",
				duration: "Week 4",
			},
		],
		results: [
			{ value: "4 weeks", label: "From kickoff to first sale" },
			{ value: "100%", label: "Self-service product management" },
			{ value: "<1s", label: "Average load on 4G" },
		],
	},
	{
		slug: "healthyplus",
		image: honeySrc,
		projectType: "E-commerce",
		domainName: "healthyplus.ae",
		siteUrl: "https://honey-store-ruddy.vercel.app/",
		year: "2024",
		timeline: "6 weeks",
		services: ["Branding", "Design", "E-commerce"],
		summary:
			"Healthy Plus is a Sharjah-based health-foods brand. Their flagship product is artisanal honey sourced from regional beekeepers. They needed a storefront that conveyed trust, authenticity, and the story behind the product.",
		challenge:
			"They had no online presence and were losing wholesale leads who couldn't find them on Google. The brand identity wasn't fully defined — colors and typography varied across packaging, social, and signage. They needed both a visual system AND a place to sell.",
		solution:
			"We started with a brand identity refresh — typography, color palette, photography direction — then built the storefront around it. The site emphasizes provenance: each product has a story page about the beekeepers and region. Wholesale inquiries get their own dedicated form so retail and B2B customers don't get confused at checkout.",
		techStack: [
			{ name: "Next.js", icon: "logos:nextjs-icon" },
			{ name: "TypeScript", icon: "logos:typescript-icon" },
			{ name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
			{ name: "Sanity CMS", icon: "logos:sanity" },
			{ name: "Stripe", icon: "logos:stripe" },
			{ name: "Vercel", icon: "logos:vercel-icon" },
		],
		process: [
			{
				phase: "Brand workshop",
				description:
					"Two-hour session with the founder to extract what makes the brand actually different, then translated it into a visual system.",
				duration: "Week 1",
			},
			{
				phase: "Design",
				description:
					"Designed brand assets and the storefront together — packaging, social templates, and the website in one consistent system.",
				duration: "Weeks 2–3",
			},
			{
				phase: "Build & content",
				description:
					"Built the site and worked with the team to write the story pages for each product. Photography direction provided.",
				duration: "Weeks 4–5",
			},
			{
				phase: "Launch",
				description:
					"Launched with SEO meta tags optimized for the brand name and key product searches.",
				duration: "Week 6",
			},
		],
		results: [
			{ value: "Day 4", label: "First wholesale lead from Google" },
			{ value: "+100%", label: "Brand consistency across channels" },
			{ value: "12", label: "Story pages with product provenance" },
		],
	},
	{
		slug: "ibrahim-shop",
		image: plumbingSrc,
		projectType: "Automation",
		domainName: "ibrahim-shop.com",
		siteUrl: "https://mehragan-shop.vercel.app",
		year: "2025",
		timeline: "3 weeks",
		services: ["Automation", "Internal tools", "Integrations"],
		summary:
			"Ibrahim runs a B2B plumbing-supplies operation with hundreds of recurring customers. Most of his time was spent on repetitive admin work — quotes, invoices, follow-ups — instead of growing the business.",
		challenge:
			"Every morning Ibrahim was spending 2–3 hours answering customer messages, sending PDF quotes one by one, and chasing payments. Half his orders came through WhatsApp and there was no central record. He couldn't take a day off without orders falling through the cracks.",
		solution:
			"We built a lightweight internal tool: customers send WhatsApp messages → an automation captures them, parses item names and quantities, generates a quote PDF, and sends it back automatically. Payment links are auto-attached. Every conversation gets logged in one dashboard so Ibrahim can see the full pipeline at a glance — and the team can step in when he's not around.",
		techStack: [
			{ name: "Next.js", icon: "logos:nextjs-icon" },
			{ name: "TypeScript", icon: "logos:typescript-icon" },
			{ name: "Postgres", icon: "logos:postgresql" },
			{ name: "WhatsApp API", icon: "logos:whatsapp-icon" },
			{ name: "n8n", icon: "logos:n8n" },
			{ name: "Stripe", icon: "logos:stripe" },
		],
		process: [
			{
				phase: "Shadow week",
				description:
					"Sat with Ibrahim for two days, watched every step of his quote-to-payment flow, and timed each one.",
				duration: "Week 1",
			},
			{
				phase: "Build the tool",
				description:
					"Built the WhatsApp ingestion, quote-generation, and payment integration. Deployed to a staging account.",
				duration: "Week 2",
			},
			{
				phase: "Rollout",
				description:
					"Switched live customers over in batches, tuned the parser based on real messages, and trained the team.",
				duration: "Week 3",
			},
		],
		results: [
			{ value: "~10 hrs", label: "Saved per week on admin" },
			{ value: "<2 min", label: "From WhatsApp message to quote sent" },
			{ value: "100%", label: "Conversations logged & searchable" },
			{ value: "1 dashboard", label: "Replacing 4 separate tools" },
		],
	},
];

export function getProjectBySlug(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}
