"use server";

import { FROM_ADDRESS, contactEmailHtml, resend } from "@/lib/email";
import { createUser } from "@/lib/repos/users";
import { contactSchema, formDataToObject } from "@/lib/validation";

export type ContactResult =
	| { ok: true }
	| { ok: false; reason: "duplicate" | "error" };

export async function contact(formData: FormData): Promise<ContactResult> {
	const parsed = contactSchema.safeParse(formDataToObject(formData));
	if (!parsed.success) {
		return { ok: false, reason: "error" };
	}

	const result = await createUser(parsed.data);
	if (!result.ok) return { ok: false, reason: "error" };
	// Duplicate is fine on the contact flow — they already exist as a lead,
	// we just want to acknowledge their new message.

	const { error } = await resend.emails.send(
		{
			from: FROM_ADDRESS,
			to: [parsed.data.email],
			subject: "Thanks for reaching out — I'll be in touch soon",
			html: contactEmailHtml(parsed.data.first_name),
		},
		{ idempotencyKey: `contact-ack/${parsed.data.email}/${Date.now()}` },
	);

	if (error) {
		console.error("contact email error:", error);
	}

	return { ok: true };
}
