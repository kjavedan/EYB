"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { logout } from "./actions";

const TABS = [
	{ href: "/admin/users", label: "Users" },
	{ href: "/admin/messages", label: "Contact messages" },
	{ href: "/admin/subscribers", label: "Newsletter subscribers" },
] as const;

export function AdminNav() {
	const pathname = usePathname();

	return (
		<header className="sticky top-0 z-10 border-b border-[--border-color] bg-[--bg-color]/90 backdrop-blur">
			<div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
				<div className="flex items-center gap-8">
					<Link
						href="/admin"
						className="text-base font-semibold text-[--text-color]"
					>
						EYB Admin
					</Link>
					<nav className="flex items-center gap-1">
						{TABS.map((tab) => {
							const active = pathname === tab.href;
							return (
								<Link
									key={tab.href}
									href={tab.href}
									className={cn(
										"rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
										active
											? "bg-[--bg-elevated] text-[--text-color]"
											: "text-[--text-muted] hover:bg-[--bg-elevated] hover:text-[--text-color]",
									)}
								>
									{tab.label}
								</Link>
							);
						})}
					</nav>
				</div>

				<form action={logout}>
					<button
						type="submit"
						className="h-9 rounded-lg border border-[--border-color] px-4 text-sm font-medium text-[--text-color] transition-colors hover:bg-[--bg-elevated]"
					>
						Sign out
					</button>
				</form>
			</div>
		</header>
	);
}
