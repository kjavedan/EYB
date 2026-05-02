import { sql } from "@/lib/db";

const DEFAULT_LIST_LIMIT = 100;

export type CreateContactMessageInput = {
	first_name: string;
	last_name: string | null;
	email: string;
	message: string;
};

export type CreateContactMessageResult =
	| { ok: true }
	| { ok: false; reason: "error" };

export async function createContactMessage(
	input: CreateContactMessageInput,
): Promise<CreateContactMessageResult> {
	try {
		await sql`
			INSERT INTO contact_messages (first_name, last_name, email, message)
			VALUES (${input.first_name}, ${input.last_name}, ${input.email}, ${input.message})
		`;
		return { ok: true };
	} catch (err: unknown) {
		console.error("createContactMessage error:", err);
		return { ok: false, reason: "error" };
	}
}

export type ContactMessageRow = {
	id: number;
	first_name: string;
	last_name: string | null;
	email: string;
	message: string;
	created_at: string;
};

export async function listContactMessages(
	limit = DEFAULT_LIST_LIMIT,
): Promise<ContactMessageRow[]> {
	const rows = await sql`
		SELECT id, first_name, last_name, email, message, created_at
		FROM contact_messages
		ORDER BY created_at DESC
		LIMIT ${limit}
	`;
	return rows as ContactMessageRow[];
}
