"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export function KeyboardShortcuts() {
	const { resolvedTheme, setTheme } = useTheme();

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key !== "d" && e.key !== "D") return;
			if (e.metaKey || e.ctrlKey || e.altKey) return;
			const target = e.target as HTMLElement | null;
			if (!target) return;
			const tag = target.tagName;
			if (
				tag === "INPUT" ||
				tag === "TEXTAREA" ||
				tag === "SELECT" ||
				target.isContentEditable
			) {
				return;
			}
			setTheme(resolvedTheme === "dark" ? "light" : "dark");
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [resolvedTheme, setTheme]);

	return null;
}
