import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { env } from "@/lib/env";

const COOKIE_NAME = "admin_session";
const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60;

export const ADMIN_USERNAME = "admin";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

type SessionPayload = { sub: string; exp: number };

function base64urlEncode(bytes: Uint8Array | ArrayBuffer): string {
	const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
	let binary = "";
	for (let i = 0; i < view.byteLength; i++) {
		binary += String.fromCharCode(view[i]);
	}
	return btoa(binary)
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/, "");
}

function base64urlDecode(s: string): ArrayBuffer {
	const padded = s
		.replace(/-/g, "+")
		.replace(/_/g, "/")
		.padEnd(s.length + ((4 - (s.length % 4)) % 4), "=");
	const binary = atob(padded);
	const buffer = new ArrayBuffer(binary.length);
	const bytes = new Uint8Array(buffer);
	for (let i = 0; i < binary.length; i++) {
		bytes[i] = binary.charCodeAt(i);
	}
	return buffer;
}

async function getSigningKey(): Promise<CryptoKey> {
	return crypto.subtle.importKey(
		"raw",
		encoder.encode(env.ADMIN_SESSION_SECRET),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign", "verify"],
	);
}

async function signSession(payload: SessionPayload): Promise<string> {
	const key = await getSigningKey();
	const payloadStr = base64urlEncode(encoder.encode(JSON.stringify(payload)));
	const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payloadStr));
	return `${payloadStr}.${base64urlEncode(sig)}`;
}

async function verifySession(token: string): Promise<SessionPayload | null> {
	const parts = token.split(".");
	if (parts.length !== 2) return null;
	const [payloadStr, sigStr] = parts;
	try {
		const key = await getSigningKey();
		const valid = await crypto.subtle.verify(
			"HMAC",
			key,
			base64urlDecode(sigStr),
			encoder.encode(payloadStr),
		);
		if (!valid) return null;
		const payload = JSON.parse(
			decoder.decode(base64urlDecode(payloadStr)),
		) as SessionPayload;
		if (typeof payload.exp !== "number" || payload.exp < Date.now()) {
			return null;
		}
		return payload;
	} catch {
		return null;
	}
}

/** Constant-time string comparison to avoid leaking length-mismatch via timing. */
function constantTimeEquals(a: string, b: string): boolean {
	if (a.length !== b.length) return false;
	let diff = 0;
	for (let i = 0; i < a.length; i++) {
		diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
	}
	return diff === 0;
}

export function verifyCredentials(username: string, password: string): boolean {
	const userOk = constantTimeEquals(username, ADMIN_USERNAME);
	const passOk = constantTimeEquals(password, env.ADMIN_PASSWORD);
	return userOk && passOk;
}

export async function createAdminSession(username: string): Promise<void> {
	const token = await signSession({
		sub: username,
		exp: Date.now() + SESSION_TTL_SECONDS * 1000,
	});
	const cookieStore = await cookies();
	cookieStore.set(COOKIE_NAME, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: SESSION_TTL_SECONDS,
	});
}

export async function getAdminSession(): Promise<SessionPayload | null> {
	const cookieStore = await cookies();
	const token = cookieStore.get(COOKIE_NAME)?.value;
	if (!token) return null;
	return verifySession(token);
}

export async function destroyAdminSession(): Promise<void> {
	const cookieStore = await cookies();
	cookieStore.delete(COOKIE_NAME);
}

export async function requireAdminSession(): Promise<SessionPayload> {
	const session = await getAdminSession();
	if (!session) redirect("/admin/login");
	return session;
}
