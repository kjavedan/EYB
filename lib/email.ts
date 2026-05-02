import { Resend } from "resend";

import { FROM_ADDRESS, SUPPORT_EMAIL } from "@/lib/config";
import { env } from "@/lib/env";

export { FROM_ADDRESS, SUPPORT_EMAIL };
export const resend = new Resend(env.RESEND_API_KEY);

// --- Resend template aliases ----------------------------------------------
//
// Templates are managed in Resend's dashboard; the alias is what we reference
// from code. Each template here exposes a single `name` variable.

export const CONTACT_ACK_TEMPLATE_ID = "contact-us-form-email";
export const NEWSLETTER_DISCOUNT_TEMPLATE_ID = "discount-email-1";

// --- Owner notification templates -----------------------------------------

type Person = {
	firstName: string;
	lastName: string | null;
	email: string;
};

export function ownerContactNotificationHtml(
	input: Person & { message: string },
): string {
	return renderOwnerNotification({
		heading: "New contact form submission",
		person: input,
		body: {
			label: "Message",
			html: escapeHtml(input.message).replace(/\n/g, "<br />"),
		},
	});
}

export function ownerSubscribeNotificationHtml(input: Person): string {
	return renderOwnerNotification({
		heading: "New newsletter subscriber",
		person: input,
	});
}

// --- Render helpers (private) ---------------------------------------------

function renderOwnerNotification({
	heading,
	person,
	body,
}: {
	heading: string;
	person: Person;
	body?: { label: string; html: string };
}): string {
	const name = formatFullName(person);
	const email = escapeHtml(person.email);
	const tableMargin = body ? "margin-bottom: 24px;" : "";

	return `
		<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #111;">
			<h1 style="font-size: 20px; margin: 0 0 16px;">${escapeHtml(heading)}</h1>
			<table style="width: 100%; border-collapse: collapse; ${tableMargin}">
				${row("Name", name)}
				${row("Email", `<a href="mailto:${email}" style="color: #111;">${email}</a>`)}
			</table>
			${
				body
					? `
				<h2 style="font-size: 16px; margin: 0 0 8px;">${escapeHtml(body.label)}</h2>
				<div style="padding: 16px; background: #f6f6f6; border-radius: 8px; line-height: 1.6; font-size: 15px;">
					${body.html}
				</div>
			`
					: ""
			}
		</div>
	`;
}

function row(label: string, valueHtml: string): string {
	return `
		<tr>
			<td style="padding: 8px 12px; background: #f6f6f6; font-weight: 600; width: 120px;">${escapeHtml(label)}</td>
			<td style="padding: 8px 12px;">${valueHtml}</td>
		</tr>
	`;
}

function formatFullName(person: Person): string {
	return [person.firstName, person.lastName]
		.filter(Boolean)
		.map((s) => escapeHtml(s as string))
		.join(" ");
}

function escapeHtml(s: string): string {
	return s
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}
