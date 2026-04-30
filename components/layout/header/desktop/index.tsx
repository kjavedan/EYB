"use client";

import logoSrc from "@/public/images/logo.png";
import LanguageSelector from "@/components/ui/language-selector";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Image from "next/image";
import Link from "next/link";
import Links from "./links";

export default function NavDesktop() {
	return (
		<div className="w-full py-4 flex items-center justify-between">
			<Link href="/" aria-label="Home">
				<Image src={logoSrc} alt="logo" width={70} height={70} />
			</Link>

			<div className="flex items-center gap-3">
				<Links />
				<LanguageSelector />
				<ThemeToggle />
			</div>
		</div>
	);
}
