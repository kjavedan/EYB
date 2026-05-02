import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getAdminSession } from "@/lib/admin-auth";

import { LoginForm } from "./login-form";

export const metadata: Metadata = {
	title: "Admin sign in",
	robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
	const session = await getAdminSession();
	if (session) redirect("/admin");

	return (
		<main className="min-h-screen flex items-center justify-center px-4 py-16 bg-[--bg-color] text-[--text-color]">
			<div className="w-full max-w-sm">
				<h1 className="text-xl font-semibold mb-1">Admin sign in</h1>
				<p className="text-sm text-[--text-muted] mb-6">
					Restricted area. Sign in to continue.
				</p>
				<LoginForm />
			</div>
		</main>
	);
}
