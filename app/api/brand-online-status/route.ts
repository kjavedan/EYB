import { type NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Status = "available" | "taken" | "unknown" | "invalid";
type ReasonCode =
	| "no_hyphens"
	| "no_underscores"
	| "too_short"
	| "too_long"
	| "must_start_with_letter"
	| "must_contain_letter"
	| "no_consecutive_dots"
	| "no_leading_trailing_dot"
	| "invalid_chars";
type DomainResult = { name: string; status: Status; reason?: ReasonCode };
type SocialResult = {
	platform: SocialPlatform;
	status: Status;
	reason?: ReasonCode;
};
type SocialPlatform = "instagram" | "facebook" | "tiktok" | "snapchat";

const COMMON_TLDS = ["com", "ae", "ai", "net", "io"] as const;

const SOCIAL_PLATFORMS: SocialPlatform[] = [
	"instagram",
	"facebook",
	"tiktok",
	"snapchat",
];

// Per-platform UA. Googlebot usually gets the clean SEO page (no login wall)
// from IG/Snapchat/FB. TikTok 403s Googlebot, so we use a real Chrome UA there.
const GOOGLEBOT_UA =
	"Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
const CHROME_UA =
	"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

function normalizeInput(raw: string): string {
	return raw
		.trim()
		.toLowerCase()
		.replace(/^https?:\/\//, "")
		.replace(/^www\./, "")
		.replace(/\/.*$/, "")
		.replace(/^@/, "");
}

function isValidDomain(value: string): boolean {
	return /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(\.[a-z]{2,})+$/.test(value);
}

function isValidName(value: string): boolean {
	return /^[a-z0-9][a-z0-9_.-]{0,38}$/.test(value);
}

// Per-platform handle rules. Each returns null when the handle is allowed,
// or a reason code we surface so the user knows why it was rejected.
const HANDLE_VALIDATORS: Record<
	SocialPlatform,
	(h: string) => ReasonCode | null
> = {
	instagram: (h) => {
		if (h.length > 30) return "too_long";
		if (h.includes("-")) return "no_hyphens";
		if (/^\.|\.$/.test(h)) return "no_leading_trailing_dot";
		if (/\.\./.test(h)) return "no_consecutive_dots";
		if (!/^[a-z0-9_.]+$/.test(h)) return "invalid_chars";
		return null;
	},
	tiktok: (h) => {
		if (h.length < 2) return "too_short";
		if (h.length > 24) return "too_long";
		if (h.includes("-")) return "no_hyphens";
		if (!/^[a-z0-9_.]+$/.test(h)) return "invalid_chars";
		return null;
	},
	snapchat: (h) => {
		if (h.length < 3) return "too_short";
		if (h.length > 15) return "too_long";
		if (!/^[a-z]/.test(h)) return "must_start_with_letter";
		if (!/^[a-z][a-z0-9_.-]+$/.test(h)) return "invalid_chars";
		return null;
	},
	facebook: (h) => {
		if (h.length < 5) return "too_short";
		if (h.length > 50) return "too_long";
		if (h.includes("-")) return "no_hyphens";
		if (h.includes("_")) return "no_underscores";
		if (!/^[a-z0-9.]+$/.test(h)) return "invalid_chars";
		if (!/[a-z]/.test(h)) return "must_contain_letter";
		return null;
	},
};

function validateDomainLabel(h: string): ReasonCode | null {
	if (h.length > 63) return "too_long";
	if (h.includes("_")) return "no_underscores";
	if (!/^[a-z0-9-]+$/.test(h)) return "invalid_chars";
	if (h.startsWith("-") || h.endsWith("-")) return "invalid_chars";
	return null;
}

async function fetchWithTimeout(
	url: string,
	init: RequestInit,
	ms: number,
): Promise<Response> {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), ms);
	try {
		return await fetch(url, { ...init, signal: controller.signal });
	} finally {
		clearTimeout(timer);
	}
}

async function checkDomain(domain: string): Promise<DomainResult> {
	const apiKey =
		process.env.RAPIDAPI_KEY ?? process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
	if (!apiKey) return { name: domain, status: "unknown" };

	try {
		const res = await fetchWithTimeout(
			`https://domainr.p.rapidapi.com/v2/status?domain=${encodeURIComponent(domain)}`,
			{
				headers: {
					"x-rapidapi-key": apiKey,
					"x-rapidapi-host": "domainr.p.rapidapi.com",
				},
			},
			6000,
		);
		if (!res.ok) return { name: domain, status: "unknown" };
		const data = (await res.json()) as { status?: { status?: string }[] };
		const statusStr = data?.status?.[0]?.status ?? "";
		if (!statusStr) return { name: domain, status: "unknown" };
		if (statusStr.includes("undelegated") || statusStr.includes("inactive")) {
			return { name: domain, status: "available" };
		}
		return { name: domain, status: "taken" };
	} catch {
		return { name: domain, status: "unknown" };
	}
}

async function fetchHtml(
	url: string,
	ms: number,
	ua: string = GOOGLEBOT_UA,
): Promise<{ status: number; html: string } | null> {
	try {
		const res = await fetchWithTimeout(
			url,
			{
				method: "GET",
				headers: {
					"User-Agent": ua,
					Accept:
						"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
					"Accept-Language": "en-US,en;q=0.9",
				},
				redirect: "follow",
			},
			ms,
		);
		const html = await res.text();
		return { status: res.status, html };
	} catch {
		return null;
	}
}

const SOCIAL_CHECKERS: Record<
	SocialPlatform,
	(handle: string) => Promise<Status>
> = {
	instagram: async (h) => {
		// Googlebot gets the SEO page. Existing profiles have a title like
		// "Name (@handle) • Instagram photos and videos" with `@` HTML-encoded
		// as `&#064;`. Missing profiles return a bare `<title>Instagram</title>`.
		const r = await fetchHtml(`https://www.instagram.com/${h}/`, 6000);
		if (!r) return "unknown";
		if (r.status === 404 || r.status === 410) return "available";
		const html = r.html;

		const hasProfileTitle = new RegExp(
			`<title>[^<]*\\(\\s*(?:@|&#0?64;)${h}\\s*\\)[^<]*</title>`,
			"i",
		).test(html);
		const hasOgUrl = new RegExp(
			`<meta[^>]+property=["']og:url["'][^>]+instagram\\.com/${h}/?["']`,
			"i",
		).test(html);
		const hasOgTitle = new RegExp(
			`<meta[^>]+property=["']og:title["'][^>]+(?:@|&#0?64;)${h}`,
			"i",
		).test(html);

		if (hasProfileTitle || hasOgUrl || hasOgTitle) return "taken";

		// Bare brand title with no profile suffix → not found.
		if (/<title>\s*Instagram\s*<\/title>/i.test(html)) return "available";
		if (/Page Not Found|Sorry, this page/i.test(html)) return "available";

		return "unknown";
	},

	tiktok: async (h) => {
		// TikTok 403s Googlebot, so use a real Chrome UA. The page is a JS
		// shell; existing profiles embed `"statusCode":0` plus `"uniqueId":"<h>"`
		// in inline JSON, missing profiles embed `"statusCode":10221`.
		const r = await fetchHtml(`https://www.tiktok.com/@${h}`, 6000, CHROME_UA);
		if (!r) return "unknown";
		if (r.status === 404 || r.status === 410) return "available";
		const html = r.html;

		if (/"statusCode"\s*:\s*1022[01]/i.test(html)) return "available";
		if (
			new RegExp(`"uniqueId"\\s*:\\s*"${h}"`, "i").test(html) &&
			/"statusCode"\s*:\s*0\b/.test(html)
		) {
			return "taken";
		}
		return "unknown";
	},

	snapchat: async (h) => {
		const r = await fetchHtml(`https://www.snapchat.com/add/${h}`, 6000);
		if (!r) return "unknown";
		if (r.status === 404 || r.status === 410) return "available";
		const html = r.html;
		if (
			/can['’]t find that user|user not found|Page Not Found|doesn['’]t exist/i.test(
				html,
			)
		) {
			return "available";
		}
		if (
			/snapcodeImageUrl|"snapcode"|data-snap-username/i.test(html) ||
			new RegExp(
				`<meta[^>]+property=["']og:url["'][^>]+snapchat\\.com/add/${h}`,
				"i",
			).test(html) ||
			new RegExp(`@${h}\\b[^<]*Snapchat`, "i").test(html)
		) {
			return "taken";
		}
		return "unknown";
	},

	facebook: async (h) => {
		// Facebook aggressively blocks server-side requests; this is best-effort
		// and will frequently return "unknown".
		const r = await fetchHtml(`https://www.facebook.com/${h}`, 6000);
		if (!r) return "unknown";
		if (r.status === 404 || r.status === 410) return "available";
		const html = r.html;
		if (
			/page (?:isn['’]t|wasn['’]t|not) available|content isn['’]t available|This (?:Page|content) isn['’]t available|Page Not Found/i.test(
				html,
			)
		) {
			return "available";
		}
		if (
			new RegExp(`facebook\\.com/${h}\\b`, "i").test(html) &&
			!/login|log in/i.test(html.slice(0, 2000))
		) {
			return "taken";
		}
		return "unknown";
	},
};

async function checkSocial(
	platform: SocialPlatform,
	handle: string,
): Promise<SocialResult> {
	const reason = HANDLE_VALIDATORS[platform](handle);
	if (reason) return { platform, status: "invalid", reason };
	try {
		const status = await SOCIAL_CHECKERS[platform](handle);
		return { platform, status };
	} catch {
		return { platform, status: "unknown" };
	}
}

export async function POST(req: NextRequest) {
	const body = (await req.json().catch(() => null)) as {
		query?: unknown;
	} | null;

	const raw = typeof body?.query === "string" ? body.query : "";
	const value = normalizeInput(raw);

	if (!value) {
		return NextResponse.json({ error: "invalid_input" }, { status: 400 });
	}

	const isFullDomain = value.includes(".");

	if (isFullDomain) {
		if (!isValidDomain(value)) {
			return NextResponse.json({ error: "invalid_input" }, { status: 400 });
		}
		const domain = await checkDomain(value);
		return NextResponse.json({ mode: "domain", domains: [domain] });
	}

	if (!isValidName(value)) {
		return NextResponse.json({ error: "invalid_input" }, { status: 400 });
	}

	const domainReason = validateDomainLabel(value);
	const domainChecks = COMMON_TLDS.map(async (tld): Promise<DomainResult> => {
		const name = `${value}.${tld}`;
		if (domainReason) return { name, status: "invalid", reason: domainReason };
		return checkDomain(name);
	});
	const socialChecks = SOCIAL_PLATFORMS.map((platform) =>
		checkSocial(platform, value),
	);

	const [domainResults, socialResults] = await Promise.all([
		Promise.all(domainChecks),
		Promise.all(socialChecks),
	]);

	return NextResponse.json({
		mode: "name",
		domains: domainResults,
		socials: socialResults,
	});
}
