import { sql } from "@/lib/db";

const DEFAULT_LIMIT = 100;

export type UserRow = {
	first_name: string;
	last_name: string | null;
	email: string;
};

export async function listUsers(limit = DEFAULT_LIMIT): Promise<UserRow[]> {
	const rows = await sql`
		SELECT first_name, last_name, email
		FROM users
		ORDER BY email ASC
		LIMIT ${limit}
	`;
	return rows as UserRow[];
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
	limit = DEFAULT_LIMIT,
): Promise<ContactMessageRow[]> {
	const rows = await sql`
		SELECT id, first_name, last_name, email, message, created_at
		FROM contact_messages
		ORDER BY created_at DESC
		LIMIT ${limit}
	`;
	return rows as ContactMessageRow[];
}

export type SubscriberRow = {
	id: number;
	first_name: string;
	last_name: string | null;
	email: string;
	created_at: string;
};

export async function listSubscribers(
	limit = DEFAULT_LIMIT,
): Promise<SubscriberRow[]> {
	const rows = await sql`
		SELECT id, first_name, last_name, email, created_at
		FROM newsletter_subscribers
		ORDER BY created_at DESC
		LIMIT ${limit}
	`;
	return rows as SubscriberRow[];
}
