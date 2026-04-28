"use client";

import {
	ThemeProvider as NextThemesProvider,
	type ThemeProviderProps,
} from "next-themes";

/**
 * Wraps next-themes with our defaults.
 *
 * - `attribute="class"` → toggles the `dark` class on <html>, matching the
 *   Tailwind config's `darkMode: ["class"]`.
 * - `defaultTheme="dark"` → keeps the EYB look on first paint for new
 *   visitors. They can switch via the toggle in the header.
 * - `enableSystem={false}` → opt-in choice rather than following the OS, so
 *   the brand experience is consistent until the user picks otherwise.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme="dark"
			enableSystem={false}
			disableTransitionOnChange
			{...props}
		>
			{children}
		</NextThemesProvider>
	);
}
