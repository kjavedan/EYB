"use server";

import { sql } from "@/lib/db";
import {
	FROM_ADDRESS,
	resend,
	welcomeEmailHtml,
} from "@/lib/email";

export type SubscribeResult =
	| { ok: true }
	| { ok: false; reason: "duplicate" | "error" };

export async function subscribe(formData: FormData): Promise<SubscribeResult> {
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
			return { ok: false, reason: "duplicate" };
		}
		console.error("subscribe insert error:", err);
		return { ok: false, reason: "error" };
	}

	const { error } = await resend.emails.send(
		{
			from: FROM_ADDRESS,
			to: [email],
			subject: "Welcome to EYB — your 10% discount is inside",
			html: welcomeEmailHtml(first_name),
		},
		{ idempotencyKey: `subscribe-welcome/${email}` },
	);

	if (error) {
		console.error("subscribe email error:", error);
	}

	return { ok: true };
}
