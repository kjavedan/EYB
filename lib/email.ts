import { Resend } from "resend";

import { FROM_ADDRESS, SCHEDULING_URL } from "@/lib/config";
import { env } from "@/lib/env";

export { FROM_ADDRESS };
export const resend = new Resend(env.RESEND_API_KEY);

// --- Templates -------------------------------------------------------------

type CtaEmailOptions = {
	heading: string;
	intro: string;
	ctaLabel: string;
	subText?: string;
	signature?: string;
};

/**
 * Shared layout for transactional emails. Keeps the wrapper, button, and
 * sign-off consistent so adding a new email is just adding new copy.
 */
function renderEmail({
	heading,
	intro,
	ctaLabel,
	subText,
	signature = "— Khaled, EYB",
}: CtaEmailOptions): string {
	return `
		<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #111;">
			<h1 style="font-size: 22px; margin: 0 0 16px;">${heading}</h1>
			<p style="font-size: 16px; line-height: 1.6; margin: 0 0 24px;">${intro}</p>
			<p style="margin: 0 0 32px;">
				<a href="${SCHEDULING_URL}" style="display: inline-block; background: #111; color: #fff; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 600;">
					${ctaLabel}
				</a>
			</p>
			${
				subText
					? `<p style="font-size: 14px; color: #666; margin: 0;">${subText}</p>`
					: ""
			}
			<hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
			<p style="font-size: 13px; color: #888; margin: 0;">${signature}</p>
		</div>
	`;
}

export function welcomeEmailHtml(firstName: string): string {
	const name = escapeHtml(firstName);
	return renderEmail({
		heading: `Welcome to EYB, ${name} 👋`,
		intro: `Thanks for subscribing! As promised, here's your <strong>10% discount</strong>. To redeem it, book a quick 30-minute discovery call — we'll talk about your project and lock in your discount on the spot.`,
		ctaLabel: "Book your call →",
		subText: `Or copy this link: <a href="${SCHEDULING_URL}" style="color: #666;">${SCHEDULING_URL}</a>`,
	});
}

export function contactEmailHtml(firstName: string): string {
	const name = escapeHtml(firstName);
	return renderEmail({
		heading: `Thanks for reaching out, ${name}!`,
		intro: `I got your message and will get back to you within 1–2 business days. If you'd like to skip the wait, feel free to grab a time on my calendar.`,
		ctaLabel: "Book a 30-min call →",
	});
}

function escapeHtml(s: string): string {
	return s
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}
