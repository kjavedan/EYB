/**
 * Users data layer. Wrap raw SQL access so server actions don't have to know
 * the table shape, and so we can swap the underlying store later (e.g., move
 * from a single Postgres table to a CRM-backed integration) without touching
 * the call sites.
 */

import { sql } from "@/lib/db";

const POSTGRES_UNIQUE_VIOLATION = "23505";

export type CreateUserInput = {
	first_name: string;
	last_name: string | null;
	email: string;
};

export type CreateUserResult =
	| { ok: true; duplicate: false }
	| { ok: true; duplicate: true }
	| { ok: false; reason: "error" };

/**
 * Insert a user. If the email already exists we return `{ duplicate: true }`
 * rather than an error — both call sites (subscribe, contact) treat this as
 * a known case, not a failure.
 */
export async function createUser(
	input: CreateUserInput,
): Promise<CreateUserResult> {
	try {
		await sql`
			INSERT INTO users (first_name, last_name, email)
			VALUES (${input.first_name}, ${input.last_name}, ${input.email})
		`;
		return { ok: true, duplicate: false };
	} catch (err: unknown) {
		const code = (err as { code?: string })?.code;
		if (code === POSTGRES_UNIQUE_VIOLATION) {
			return { ok: true, duplicate: true };
		}
		console.error("createUser error:", err);
		return { ok: false, reason: "error" };
	}
}
