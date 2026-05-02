import { sql } from "@/lib/db";

const POSTGRES_UNIQUE_VIOLATION = "23505";

export type CreateSubscriberInput = {
	first_name: string;
	last_name: string | null;
	email: string;
};

export type CreateSubscriberResult =
	| { ok: true; duplicate: false }
	| { ok: true; duplicate: true }
	| { ok: false; reason: "error" };

/**
 * Insert a newsletter subscriber. If the email already exists we surface
 * `duplicate: true` so the caller can show the "already subscribed" toast
 * instead of treating it as a hard failure.
 */
export async function createSubscriber(
	input: CreateSubscriberInput,
): Promise<CreateSubscriberResult> {
	try {
		await sql`
			INSERT INTO newsletter_subscribers (first_name, last_name, email)
			VALUES (${input.first_name}, ${input.last_name}, ${input.email})
		`;
		return { ok: true, duplicate: false };
	} catch (err: unknown) {
		const code = (err as { code?: string })?.code;
		if (code === POSTGRES_UNIQUE_VIOLATION) {
			return { ok: true, duplicate: true };
		}
		console.error("createSubscriber error:", err);
		return { ok: false, reason: "error" };
	}
}
