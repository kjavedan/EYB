"use client";

import { useResponsive } from "@/hooks/use-responsive";
import { motion } from "framer-motion";
import NavDesktop from "./desktop";
import NavMobile from "./mobile";

export function Header() {
	const { isDesktop } = useResponsive();

	return (
		<header
			style={{ direction: "ltr" }}
			className="bg-[--bg-color] fixed top-0 left-0 right-0 mx-auto max-w-7xl z-20 flex items-center justify-between after:content-[''] container"
		>
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 0.7, y: 0 }}
				className="flex flex-col cursor-pointer"
			/>
			{isDesktop ? <NavDesktop /> : <NavMobile />}
		</header>
	);
}
