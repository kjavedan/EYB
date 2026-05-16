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
		slug: "alpha",
		projectType: "Websites",
		domainName: "Alpha Gym",
		siteUrl: "https://alpha-gym-mu.vercel.app/en",
		videoUrl: "/videos/alpha.mp4",
		screenshots: [
			"/images/alpha-1.png",
			"/images/alpha-2.png",
			"/images/alpha-3.png",
			"/images/alpha-4.png",
			"/images/alpha-5.png",
			"/images/alpha-6.png",
		],
		year: "2026",
		timeline: "Internal showcase",
		services: ["Web design", "Brand", "Engineering", "Multilingual"],
		summary:
			"Alpha is a concept site for a premium powerlifting and bodybuilding gym — a cinematic, monochrome experience built to make a serious, no-noise brand feel like a place you'd actually walk into. It's a showcase of how far a fitness brand can move beyond the usual stock-photo template.",
		challenge:
			"Most gym websites look the same: bright photography, motivational stock copy, busy plan grids. They sell a feeling of intensity through volume — the opposite of how a serious lifting space actually feels. The challenge was to design a site that communicated quiet discipline and craft, while still doing the practical job of presenting disciplines, coaches, plans, and meals clearly.",
		solution:
			"A cinematic, scroll-driven Next.js site with a parallax hero, an introductory animation, a manifesto block, and modular sections for disciplines, coaches, the space, meals, voices, and membership. Everything is monochrome — ink, bone, a grain overlay — and the typography carries the brand instead of stock imagery. English and Arabic ship from a single codebase with locale-aware routing and RTL support. Built with Next.js 16, React 19, Tailwind v4, Motion and GSAP for the cinematic moments.",
		techStack: [
			{ name: "Next.js", icon: "logos:nextjs-icon" },
			{ name: "React", icon: "logos:react" },
			{ name: "TypeScript", icon: "logos:typescript-icon" },
			{ name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
			{ name: "Motion", icon: "simple-icons:framer" },
			{ name: "GSAP", icon: "simple-icons:greensock" },
			{ name: "i18n (EN / AR)", icon: "mdi:translate" },
		],
		process: [
			{
				phase: "Brand direction",
				description:
					"Set the tone before touching code: monochrome palette, display typography, grain texture, and a single message — 'No crowds. No noise. Just work.' — to anchor every section.",
				duration: "Phase 1",
			},
			{
				phase: "Cinematic hero",
				description:
					"Built the intro animation, parallax hero, and scroll-driven reveals so the first ten seconds of the site feel like a film opener rather than a landing page.",
				duration: "Phase 2",
			},
			{
				phase: "Section system",
				description:
					"Designed and shipped the disciplines, coaches, space, meals, voices, and membership sections as a consistent vertical rhythm — each one editorial, none of them noisy.",
				duration: "Phase 3",
			},
			{
				phase: "Bilingual delivery",
				description:
					"Wired locale-aware routing and dictionary-driven copy so the whole experience reads natively in English and Arabic, with RTL handled at the layout level.",
				duration: "Phase 4",
			},
		],
		results: [
			{ value: "Cinematic feel", label: "Scroll-driven hero, intro animation, and grain texture set the tone" },
			{ value: "Editorial, not generic", label: "Monochrome typography carries the brand without stock imagery" },
			{ value: "EN · AR", label: "Bilingual from one codebase with native RTL support" },
			{ value: "Concept showcase", label: "A reference for how a fitness brand can move beyond the template look" },
		],
	},
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
		videoUrl: "/videos/healthyplus.mp4",
		screenshots: [
			"/images/healthyplus-1.png",
			"/images/healthyplus-2.png",
			"/images/healthyplus-3.png",
			"/images/healthyplus-4.png",
			"/images/healthyplus-5.png",
			"/images/healthyplus-6.png",
			"/images/healthyplus-7.png",
		],
		year: "2025",
		timeline: "1 week",
		services: ["Web design", "E-commerce", "WhatsApp ordering"],
		summary:
			"Healthy Plus is a honey business that was selling through Instagram and WhatsApp without a proper website. We built a minimal, affordable storefront where customers can browse available products, see prices, add items to a cart, and send a complete order through WhatsApp.",
		challenge:
			"Customers had to browse Instagram, ask for prices manually, then move to WhatsApp to place an order. That created friction for buyers and extra work for the owner. The business needed a cleaner way to show products, prices, and order details without building an expensive full e-commerce system.",
		solution:
			"We built a simple storefront focused on the way the business already sells. Customers can open the website, view the honey products, check prices, add items to the cart, and review the total. When they click order, the full cart details and total price are sent directly to WhatsApp, so the owner can continue the conversation and confirm delivery. It gives the business a professional online presence while keeping the ordering process familiar and affordable.",
		techStack: [
			{ name: "Next.js", icon: "logos:nextjs-icon" },
			{ name: "Firebase", icon: "logos:firebase" },
			{ name: "WhatsApp integration", icon: "logos:whatsapp-icon" },
		],
		process: [
			{
				phase: "Sales flow",
				description:
					"Mapped how customers were ordering through Instagram and WhatsApp, then simplified that flow into a website-to-WhatsApp experience.",
				duration: "Phase 1",
			},
			{
				phase: "Minimal storefront",
				description:
					"Designed a clean product catalogue where customers can see available honey products, prices, and key details without messaging first.",
				duration: "Phase 2",
			},
			{
				phase: "Cart & order",
				description:
					"Built the cart experience so customers can review selected products and total price before sending the order.",
				duration: "Phase 3",
			},
			{
				phase: "WhatsApp handoff",
				description:
					"Connected the order button to WhatsApp with the full product list and total, giving the owner a clear message to confirm and fulfill.",
				duration: "Phase 4",
			},
		],
		results: [
			{ value: "Cleaner orders", label: "Customers send product details and totals through WhatsApp" },
			{ value: "Less back-and-forth", label: "Prices and available products are visible before customers message" },
			{ value: "Affordable launch", label: "Professional website without full checkout complexity" },
			{ value: "Small-business fit", label: "Simple workflow built around how the owner already sells" },
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
		timeline: "3-month growth engagement",
		services: [
			"Shopify development",
			"Payments",
			"Delivery setup",
			"Marketing campaigns",
			"Ad creatives",
		],
		summary:
			"Aiyifen is a wholesaler selling kids' and women's clothing. They wanted to test whether online sales could become a real channel for the business, so we built their Shopify store, set up payments and delivery, and ran marketing campaigns for three months.",
		challenge:
			"The business was built around wholesale, but the team wanted help going online. They needed a proper e-commerce store, online payments, cash on delivery, delivery-company setup, and a way to test demand through real ad campaigns instead of relying only on offline selling.",
		solution:
			"We built a Shopify e-commerce store in about three weeks, connected Stripe and cash on delivery, and helped set up the delivery workflow. After launch, we worked with Aiyifen for three months on marketing campaigns, ad creatives, and performance testing. The store gave customers a proper place to browse, buy, and pay online, while the campaigns helped prove that online sales could work for the brand.",
		techStack: [
			{ name: "Shopify", icon: "logos:shopify" },
			{ name: "Liquid", icon: "simple-icons:shopify" },
			{ name: "Stripe", icon: "logos:stripe" },
			{ name: "Cash on delivery", icon: "mdi:cash" },
			{ name: "Delivery integration", icon: "mdi:truck-delivery-outline" },
			{ name: "Meta ads", icon: "simple-icons:meta" },
			{ name: "Klaviyo", icon: "simple-icons:klaviyo" },
		],
		process: [
			{
				phase: "Online sales plan",
				description:
					"Worked with the team to understand the wholesale business, define the online sales experiment, and decide what the store needed to launch quickly.",
				duration: "Week 1",
			},
			{
				phase: "Shopify store",
				description:
					"Built the Shopify storefront for kids' and women's clothing, structured the catalogue, and prepared the buying flow for retail customers.",
				duration: "Weeks 1–3",
			},
			{
				phase: "Payments & delivery",
				description:
					"Implemented Stripe, cash on delivery, and the delivery-company workflow so the store could accept and fulfill real orders.",
				duration: "Week 3",
			},
			{
				phase: "Campaigns & creatives",
				description:
					"Ran marketing campaigns for three months, created ad creatives, tested offers, and helped grow online sales and customer acquisition.",
				duration: "Months 1–3",
			},
		],
		results: [
			{ value: "AED 12k/mo", label: "Monthly online sales during the campaign period" },
			{ value: "300+ customers", label: "Buyers generated through the online store and campaigns" },
			{ value: "500+ contacts", label: "Newsletter and customer audience built for remarketing" },
			{ value: "3-month test", label: "Proved online sales could work for the wholesale brand" },
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
