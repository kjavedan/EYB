"use client";

import type React from "react";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const variants = {
	hidden: { opacity: 0, y: 10 },
	visible: { opacity: 1, y: 0 },
};

export const MenuItem = ({ label, link }: { label: string; link: string }) => {
	const pathname = usePathname();
	const isHome = pathname === "/";
	// On home → smooth-scroll within page (link is a hash like `#services`).
	// Off home → route to `/#services` so the browser lands on home and
	// scrolls to the anchor on its own.
	const href = isHome ? link : `/${link}`;

	const handleClick = (e: React.MouseEvent) => {
		if (!isHome) return; // let Next.js Link handle navigation
		e.preventDefault();
		const target = document.querySelector(link);
		if (target) {
			target.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<motion.li
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 1 }}
			variants={variants}
		>
			<Link
				className="px-3 py-2 cursor-pointer text-[--text-color]"
				href={href}
				onClick={handleClick}
			>
				{label}
			</Link>
		</motion.li>
	);
};
