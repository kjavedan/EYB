import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
	throw new Error("Missing RESEND_API_KEY environment variable");
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export const FROM_ADDRESS = "Khaled @ EYB <khaled@eyb.ae>";
export const SCHEDULING_URL = "https://cal.com/khaled-2wiu0n/30min";

export function welcomeEmailHtml(firstName: string) {
	const safeName = escapeHtml(firstName);
	return `
		<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #111;">
			<h1 style="font-size: 22px; margin: 0 0 16px;">Welcome to EYB, ${safeName} 👋</h1>
			<p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
				Thanks for subscribing! As promised, here's your <strong>10% discount</strong>.
			</p>
			<p style="font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
				To redeem it, book a quick 30-minute discovery call with me — we'll talk about your project and lock in your discount on the spot.
			</p>
			<p style="margin: 0 0 32px;">
				<a href="${SCHEDULING_URL}" style="display: inline-block; background: #111; color: #fff; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 600;">
					Book your call →
				</a>
			</p>
			<p style="font-size: 14px; color: #666; margin: 0;">
				Or copy this link: <a href="${SCHEDULING_URL}" style="color: #666;">${SCHEDULING_URL}</a>
			</p>
			<hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
			<p style="font-size: 13px; color: #888; margin: 0;">— Khaled, EYB</p>
		</div>
	`;
}

export function contactEmailHtml(firstName: string) {
	const safeName = escapeHtml(firstName);
	return `
		<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #111;">
			<h1 style="font-size: 22px; margin: 0 0 16px;">Thanks for reaching out, ${safeName}!</h1>
			<p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
				I got your message and will get back to you within 1–2 business days.
			</p>
			<p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
				If you'd like to skip the wait, feel free to grab a time on my calendar:
			</p>
			<p style="margin: 0 0 32px;">
				<a href="${SCHEDULING_URL}" style="display: inline-block; background: #111; color: #fff; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 600;">
					Book a 30-min call →
				</a>
			</p>
			<hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
			<p style="font-size: 13px; color: #888; margin: 0;">— Khaled, EYB</p>
		</div>
	`;
}

function escapeHtml(s: string) {
	return s
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}
