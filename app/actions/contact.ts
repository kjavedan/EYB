"use server";

import { sql } from "@/lib/db";
import {
	contactEmailHtml,
	FROM_ADDRESS,
	resend,
} from "@/lib/email";

export type ContactResult =
	| { ok: true }
	| { ok: false; reason: "duplicate" | "error" };

export async function contact(formData: FormData): Promise<ContactResult> {
	const first_name = (formData.get("first_name") as string | null)?.trim();
	const last_name = (formData.get("last_name") as string | null)?.trim() || null;
	const email = (formData.get("email") as string | null)?.trim().toLowerCase();

	if (!first_name || !email) {
		return { ok: false, reason: "error" };
	}

	try {
		await sql`
			INSERT INTO users (first_name, last_name, email)
			VALUES (${first_name}, ${last_name}, ${email})
		`;
	} catch (err: unknown) {
		const code = (err as { code?: string })?.code;
		if (code === "23505") {
			// Existing user reaching out again is fine — keep going and send the email.
		} else {
			console.error("contact insert error:", err);
			return { ok: false, reason: "error" };
		}
	}

	const { error } = await resend.emails.send(
		{
			from: FROM_ADDRESS,
			to: [email],
			subject: "Thanks for reaching out — I'll be in touch soon",
			html: contactEmailHtml(first_name),
		},
		{ idempotencyKey: `contact-ack/${email}/${Date.now()}` },
	);

	if (error) {
		console.error("contact email error:", error);
	}

	return { ok: true };
}
