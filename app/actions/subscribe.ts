"use server";

import { FROM_ADDRESS, resend, welcomeEmailHtml } from "@/lib/email";
import { createUser } from "@/lib/repos/users";
import { formDataToObject, subscribeSchema } from "@/lib/validation";

export type SubscribeResult =
	| { ok: true }
	| { ok: false; reason: "duplicate" | "error" };

export async function subscribe(formData: FormData): Promise<SubscribeResult> {
	const parsed = subscribeSchema.safeParse(formDataToObject(formData));
	if (!parsed.success) {
		return { ok: false, reason: "error" };
	}

	const result = await createUser(parsed.data);
	if (!result.ok) return { ok: false, reason: "error" };
	if (result.duplicate) return { ok: false, reason: "duplicate" };

	const { error } = await resend.emails.send(
		{
			from: FROM_ADDRESS,
			to: [parsed.data.email],
			subject: "Welcome to EYB — your 10% discount is inside",
			html: welcomeEmailHtml(parsed.data.first_name),
		},
		{ idempotencyKey: `subscribe-welcome/${parsed.data.email}` },
	);

	if (error) {
		console.error("subscribe email error:", error);
	}

	return { ok: true };
}
