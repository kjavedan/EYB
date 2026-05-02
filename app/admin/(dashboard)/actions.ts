"use server";

import { redirect } from "next/navigation";

import { destroyAdminSession } from "@/lib/admin-auth";

export async function logout(): Promise<void> {
	await destroyAdminSession();
	redirect("/admin/login");
}
