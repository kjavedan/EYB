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
	projectType: string;
	domainName: string;
	siteUrl: string;

	/**
	 * Optional walkthrough video for the detail-page hero.
	 * If present → renders a `<video>`. The HTML5 player will use the
	 * first frame as the poster unless `videoPoster` is set.
	 */
	videoUrl?: string;
	/** Optional poster image URL (e.g. `/images/x.png`) shown before the video plays. */
	videoPoster?: string;
	/** Optional list of in-app screenshot URLs (e.g. `/images/x.png`) for the carousel. */
	screenshots?: string[];

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
		slug: "streak",
		projectType: "Software",
		domainName: "Streak",
		siteUrl: "https://streak.eyb.ae",
		videoUrl: "/videos/streak.mp4",
		videoPoster: "/images/streak_thumbnail.png",
		screenshots: [
			"/images/streak-1.png",
			"/images/streak-2.png",
			"/images/streak-3.png",
			"/images/streak-4.png",
			"/images/streak-5.png",
			"/images/streak-6.png",
			"/images/streak-7.png",
			"/images/streak-8.png",
		],
		year: "2026",
		timeline: "Ongoing",
		services: ["Product design", "Engineering", "PWA"],
		summary:
			"Streak is a personal productivity app that bundles the tools people otherwise scatter across half a dozen apps — a streak tracker, a focus timer, a todo list, and an ideas inbox — into one quiet daily ritual.",
		challenge:
			"Builders and makers spend their days jumping between Notion, a pomodoro tab, Apple Reminders, and a notes app. Each tool nags differently, none talk to each other, and the daily discipline of just showing up gets lost in the friction of switching contexts.",
		solution:
			"One app for the things you do every day. Streaks track recurring goals at a glance with a calendar-style day grid. The focus timer rolls completed sessions back into the active streak. A lightweight per-day todo list and an ideas inbox round out the ritual — quiet, local, single-player. Built as a PWA, so the same app installs on macOS, Windows, iOS, Android, and the web from a single codebase. Free forever, no tiers, no team plan, no upsell.",
		techStack: [
			{ name: "Next.js", icon: "logos:nextjs-icon" },
			{ name: "TypeScript", icon: "logos:typescript-icon" },
			{ name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
			{ name: "PWA", icon: "logos:pwa" },
			{ name: "Electron", icon: "logos:electron" },
			{ name: "IndexedDB", icon: "mdi:database-outline" },
			{ name: "Google auth", icon: "logos:google-icon" },
			{ name: "Email auth", icon: "mdi:email-outline" },
		],
		process: [
			{
				phase: "Prototype",
				description:
					"Built a macOS Electron prototype to nail the daily-screen interaction and prove the bundling thesis with real daily use.",
				duration: "Phase 1",
			},
			{
				phase: "PWA foundations",
				description:
					"Re-platforming the app as an installable PWA so the same daily ritual runs on laptop, phone, and the web from a single codebase.",
				duration: "Phase 2",
			},
			{
				phase: "Marketing site",
				description:
					"Designing and building the marketing site to introduce the product, articulate the principles, and gather a waitlist.",
				duration: "Phase 3",
			},
			{
				phase: "Sync & beyond",
				description:
					"On the roadmap: optional cross-device sync so the same streak follows you between phone and laptop without giving up local-first.",
				duration: "Phase 4",
			},
		],
		results: [
			{ value: "4-in-1", label: "Tools replaced by one app" },
			{ value: "Free forever", label: "No subscription, no tiers" },
			{
				value: "Installable",
				label: "macOS · Windows · iOS · Android · Web",
			},
			{ value: "Local-first", label: "Your streak, on your device" },
		],
	},
	{
		slug: "resume-maker",
		projectType: "Software",
		domainName: "Resume-maker",
		siteUrl: "https://resume-maker.eyb.ae",
		videoUrl: "/videos/resume-maker.mp4",
		videoPoster: "/images/resume-maker_thumbnail.png",
		screenshots: [
			"/images/resume-maker-1.png",
			"/images/resume-maker-2.png",
			"/images/resume-maker-3.png",
			"/images/resume-maker-4.png",
			"/images/resume-maker-5.png",
			"/images/resume-maker-6.png",
		],
		year: "2026",
		timeline: "Ongoing",
		services: ["Product design", "Engineering", "AI integration"],
		summary:
			"Resume Maker tailors your resume to a specific job description in real time. Paste the JD, watch the app rewrite your bullet points, score keyword coverage, and produce a printable, ATS-ready PDF — all powered by an LLM behind the scenes.",
		challenge:
			"Job seekers spend hours rewording the same resume for every application, often missing the keywords ATS systems actually filter on. Even when they do tailor by hand, there's no way to know how well it matches the job before hitting submit.",
		solution:
			"A two-pane editor: paste the job description on the left, watch a fully tailored resume stream into a live PDF preview on the right. Every section is editable inline, with an AI rewrite button on hover. A scoring panel calls out missing skills and keyword gaps so you can iterate before you apply. Free tier covers five tailors a month; Pro unlocks unlimited at $5/mo.",
		techStack: [
			{ name: "Next.js", icon: "logos:nextjs-icon" },
			{ name: "TypeScript", icon: "logos:typescript-icon" },
			{ name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
			{ name: "Supabase", icon: "logos:supabase-icon" },
			{ name: "OpenAI", icon: "simple-icons:openai" },
			{ name: "Stripe", icon: "logos:stripe" },
		],
		process: [
			{
				phase: "Streaming editor",
				description:
					"Built the live two-pane editor with token-by-token streaming so users see the AI think out loud as their resume rewrites itself.",
				duration: "Phase 1",
			},
			{
				phase: "Scoring & PDF",
				description:
					"Added the keyword-coverage scoring panel and a print-perfect PDF export so the resume that ships is the one users see in the preview.",
				duration: "Phase 2",
			},
			{
				phase: "Auth & payments",
				description:
					"Wired Supabase auth, Row-Level Security, and Stripe subscriptions for the free tier and Pro plan.",
				duration: "Phase 3",
			},
			{
				phase: "Live & iterating",
				description:
					"Shipped to early users; iterating on prompt quality, template variants, and an applications tracker.",
				duration: "Phase 4",
			},
		],
		results: [
			{ value: "Real-time", label: "Streaming AI rewrites as you watch" },
			{ value: "ATS-ready", label: "Keyword-matched for resume filters" },
			{ value: "$5/mo", label: "Free tier plus simple Pro plan" },
			{ value: "PDF export", label: "Print-perfect output, no setup" },
		],
	},
	{
		slug: "chikrice",
		projectType: "Software",
		domainName: "Chikrice",
		siteUrl: "https://chikrice.khaled-javdan.com",
		videoUrl: "/videos/chikrice.mp4",
		videoPoster: "/images/chikrice_thumbnail.png",
		screenshots: [
			"/images/chikrice-1.png",
			"/images/chikrice-2.png",
			"/images/chikrice-3.png",
			"/images/chikrice-4.png",
		],
		year: "2025",
		timeline: "Ongoing",
		services: ["Product design", "Engineering", "AI integration", "PWA"],
		summary:
			"Chikrice is a mobile-first nutrition app that helps people understand calories, macros, portions, and daily consistency. It turns a fitness goal into a clear roadmap with milestones, daily targets, meal tracking, and AI-powered food suggestions.",
		challenge:
			"Most people know they want to lose weight, gain muscle, or get in better shape, but they do not know how many calories they need, what macros to eat, how portions translate into calories, or how to repeat the process every day. The information is scattered, and consistency breaks when tracking feels too complicated.",
		solution:
			"Chikrice starts with the user's body details and goal, then generates a personalized roadmap. If the goal takes six months, the app breaks it into six milestones, each with its own calorie and macro targets. The daily dashboard lets users log the meals they ate, see how those meals affect their targets, and stay aligned with the current milestone. AI support estimates calories and macros from natural food descriptions, while smart suggestions recommend meals that fit the user's remaining daily targets. Built as a responsive PWA, Chikrice can be installed and used every day from a phone or desktop.",
		techStack: [
			{ name: "React", icon: "logos:react" },
			{ name: "Node.js", icon: "logos:nodejs-icon" },
			{ name: "Express", icon: "simple-icons:express" },
			{ name: "MongoDB", icon: "logos:mongodb-icon" },
			{ name: "MUI", icon: "simple-icons:mui" },
			{ name: "PWA", icon: "logos:pwa" },
			{ name: "AI integration", icon: "simple-icons:openai" },
		],
		process: [
			{
				phase: "Goal roadmap",
				description:
					"Designed the onboarding flow around body details, target weight, timeline, and activity level so the app can generate a realistic nutrition roadmap.",
				duration: "Phase 1",
			},
			{
				phase: "Milestones & targets",
				description:
					"Built the milestone system that breaks a long-term goal into smaller stages, each with its own calories, protein, carbs, and fat targets.",
				duration: "Phase 2",
			},
			{
				phase: "Daily dashboard",
				description:
					"Created the meal-tracking dashboard where users log what they ate and see remaining calories and macros for the current day.",
				duration: "Phase 3",
			},
			{
				phase: "AI food support",
				description:
					"Added AI-powered calorie and macro estimates from food descriptions, plus smart meal suggestions based on the user's daily targets.",
				duration: "Phase 4",
			},
		],
		results: [
			{ value: "Clear goal path", label: "Users know what to eat to reach their fitness goal" },
			{ value: "Daily consistency", label: "Meals and macros become easier to track every day" },
			{ value: "Better choices", label: "Smart suggestions help users choose food that fits their plan" },
			{ value: "Progress awareness", label: "Users can see how each meal affects their goal" },
		],
	},
	{
		slug: "healthyplus",
		projectType: "E-commerce",
		domainName: "Healthyplus",
		siteUrl: "https://healthyplus.eyb.ae",
		year: "2024",
		timeline: "6 weeks",
		services: ["Branding", "Design", "E-commerce"],
		summary:
			"Healthy Plus is a Sharjah-based health-foods brand. Their flagship product is artisanal honey sourced from regional beekeepers. They needed a storefront that conveyed trust, authenticity, and the story behind the product.",
		challenge:
			"They were running the entire business through WhatsApp — sending product photos one at a time, quoting prices manually, and chasing payments by message. It worked, but it didn't look like a real brand. New customers had no way to browse the catalogue or check out on their own, and anyone searching the brand on Google found nothing to land on. They needed a proper storefront that gave the business the professionalism their product deserved.",
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
		slug: "aiyifen",
		projectType: "E-commerce",
		domainName: "Aiyifen",
		siteUrl: "https://aiyifen.com",
		videoUrl: "/videos/aiyifen.mp4",
		screenshots: [
			"/images/aiyifen-1.png",
			"/images/aiyifen-2.png",
			"/images/aiyifen-3.png",
			"/images/aiyifen-4.png",
		],
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
		projectType: "E-commerce",
		domainName: "Jojooshop",
		siteUrl: "https://jojooshop.eyb.ae",
		videoUrl: "/videos/shop.mov",
		videoPoster: "/images/shop_thumbnail.png",
		screenshots: [
			"/images/shop-1.png",
			"/images/shop-2.png",
			"/images/shop-3.png",
			"/images/shop-4.png",
			"/images/shop-5.png",
		],
		year: "2024",
		timeline: "Internal showcase",
		services: ["Product design", "Full-stack engineering", "E-commerce", "Admin panel"],
		summary:
			"Jojooshop is an in-house e-commerce showcase built to demonstrate how far a fully custom storefront can go without relying on a template. It combines a polished shopping experience, multilingual support, custom authentication, Google OAuth, and a complete admin panel in one modern web application.",
		challenge:
			"We built Jojooshop because many businesses want more than a basic store theme, but they need to see what a custom e-commerce build can actually include. The goal was to create a realistic, fully featured store that shows our ability to handle complex UI, multilingual flows, authentication, product management, and a smooth buying experience from end to end.",
		solution:
			"We designed and built a complete custom e-commerce platform with a responsive storefront, advanced product browsing, custom authentication, Google OAuth, and a dedicated admin panel for managing products and store content. The site supports four languages and page-direction switching, so the same interface works naturally for both LTR and RTL users. Jojooshop is not presented as a client case study; it is a working proof of the kind of modern, high-quality e-commerce experience EYB can design and engineer.",
		techStack: [
			{ name: "React", icon: "logos:react" },
			{ name: "Node.js", icon: "logos:nodejs-icon" },
			{ name: "Express", icon: "simple-icons:express" },
			{ name: "MongoDB", icon: "logos:mongodb-icon" },
			{ name: "Google OAuth", icon: "logos:google-icon" },
			{ name: "Custom auth", icon: "mdi:shield-account-outline" },
		],
		process: [
			{
				phase: "Showcase strategy",
				description:
					"Defined Jojooshop as a capability showcase: a realistic store that demonstrates custom design, multilingual UX, authentication, and admin workflows.",
				duration: "Phase 1",
			},
			{
				phase: "Storefront design",
				description:
					"Designed a modern e-commerce interface with clear browsing, polished product pages, responsive layouts, and smooth direction switching across four languages.",
				duration: "Phase 2",
			},
			{
				phase: "Full-stack build",
				description:
					"Built the React storefront, Node.js and Express backend, MongoDB data layer, custom authentication, Google OAuth, and core e-commerce flows.",
				duration: "Phase 3",
			},
			{
				phase: "Custom admin",
				description:
					"Created a custom admin panel so products, store content, and operational data can be managed without touching the codebase.",
				duration: "Phase 4",
			},
		],
		results: [
			{ value: "Full custom build", label: "Storefront, backend, auth, and admin panel built from scratch" },
			{ value: "4 languages", label: "Multilingual shopping experience with direction switching" },
			{ value: "Modern UX", label: "A polished interface designed to feel like a real production store" },
			{ value: "Reusable proof", label: "A live example of the e-commerce quality EYB can deliver" },
		],
	},
];

export function getProjectBySlug(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}
