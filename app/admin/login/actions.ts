"use server";

import { redirect } from "next/navigation";

import { createAdminSession, verifyCredentials } from "@/lib/admin-auth";

export type LoginState = { error: string } | null;

export async function login(
	_state: LoginState,
	formData: FormData,
): Promise<LoginState> {
	const username = String(formData.get("username") ?? "").trim();
	const password = String(formData.get("password") ?? "");

	if (!verifyCredentials(username, password)) {
		return { error: "Invalid username or password." };
	}

	await createAdminSession(username);
	redirect("/admin");
}
