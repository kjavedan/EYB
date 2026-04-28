"use client";

import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Sun/Moon toggle that flips between light and dark themes.
 * Hides until mounted to avoid an SSR/CSR mismatch — `useTheme` returns
 * `undefined` on the server.
 */
export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	const isDark = mounted && resolvedTheme === "dark";

	return (
		<button
			type="button"
			aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
			onClick={() => setTheme(isDark ? "light" : "dark")}
			className="flex items-center justify-center w-8 h-8 rounded-full border border-[--border-color] bg-[--bg-color] text-[--text-color] hover:border-[--secondary-color] transition-colors"
		>
			{/* Render a placeholder icon pre-mount so layout doesn't shift */}
			<Icon
				icon={isDark ? "mdi:weather-sunny" : "mdi:weather-night"}
				className="w-4 h-4"
			/>
		</button>
	);
}
