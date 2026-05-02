import type { Metadata } from "next";

import { requireAdminSession } from "@/lib/admin-auth";

import { AdminNav } from "./admin-nav";

export const metadata: Metadata = {
	title: "Admin",
	robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	await requireAdminSession();

	return (
		<div className="min-h-screen bg-[--bg-color] text-[--text-color]">
			<AdminNav />
			<main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
		</div>
	);
}
