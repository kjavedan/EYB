import { Resend } from "resend";

import { FROM_ADDRESS, SUPPORT_EMAIL } from "@/lib/config";
import { env } from "@/lib/env";

export { FROM_ADDRESS, SUPPORT_EMAIL };
export const resend = new Resend(env.RESEND_API_KEY);

/**
 * Resend template alias for the visitor-facing acknowledgment of a contact
 * submission. The template is managed in Resend's dashboard and exposes a
 * single `name` variable.
 */
export const CONTACT_ACK_TEMPLATE_ID = "contact-us-form-email";

/**
 * Resend template alias for the newsletter discount email sent on subscribe.
 * Managed in Resend's dashboard; exposes a single `name` variable.
 */
export const NEWSLETTER_DISCOUNT_TEMPLATE_ID = "discount-email-1";

// --- Owner notification templates -----------------------------------------

export function ownerContactNotificationHtml(input: {
	firstName: string;
	lastName: string | null;
	email: string;
	message: string;
}): string {
	const firstName = escapeHtml(input.firstName);
	const lastName = input.lastName ? escapeHtml(input.lastName) : "";
	const email = escapeHtml(input.email);
	const message = escapeHtml(input.message).replace(/\n/g, "<br />");
	const fullName = [firstName, lastName].filter(Boolean).join(" ");

	return `
		<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #111;">
			<h1 style="font-size: 20px; margin: 0 0 16px;">New contact form submission</h1>
			<table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
				<tr>
					<td style="padding: 8px 12px; background: #f6f6f6; font-weight: 600; width: 120px;">Name</td>
					<td style="padding: 8px 12px;">${fullName}</td>
				</tr>
				<tr>
					<td style="padding: 8px 12px; background: #f6f6f6; font-weight: 600;">Email</td>
					<td style="padding: 8px 12px;"><a href="mailto:${email}" style="color: #111;">${email}</a></td>
				</tr>
			</table>
			<h2 style="font-size: 16px; margin: 0 0 8px;">Message</h2>
			<div style="padding: 16px; background: #f6f6f6; border-radius: 8px; line-height: 1.6; font-size: 15px;">
				${message}
			</div>
		</div>
	`;
}

export function ownerSubscribeNotificationHtml(input: {
	firstName: string;
	lastName: string | null;
	email: string;
}): string {
	const firstName = escapeHtml(input.firstName);
	const lastName = input.lastName ? escapeHtml(input.lastName) : "";
	const email = escapeHtml(input.email);
	const fullName = [firstName, lastName].filter(Boolean).join(" ");

	return `
		<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #111;">
			<h1 style="font-size: 20px; margin: 0 0 16px;">New newsletter subscriber</h1>
			<table style="width: 100%; border-collapse: collapse;">
				<tr>
					<td style="padding: 8px 12px; background: #f6f6f6; font-weight: 600; width: 120px;">Name</td>
					<td style="padding: 8px 12px;">${fullName}</td>
				</tr>
				<tr>
					<td style="padding: 8px 12px; background: #f6f6f6; font-weight: 600;">Email</td>
					<td style="padding: 8px 12px;"><a href="mailto:${email}" style="color: #111;">${email}</a></td>
				</tr>
			</table>
		</div>
	`;
}

function escapeHtml(s: string): string {
	return s
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}
