"use client";

import type React from "react";

import logoSrc from "@/public/images/logo.png";
import LanguageSelector from "@/components/ui/language-selector";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { Links } from "./links";
import { MenuToggle } from "./menu-toggle";

export default function NavMobile() {
	const [isOpen, toggleOpen] = useCycle(false, true);

	const navVariants = {
		open: {
			clipPath: "circle(100% at calc(100% - 37px) 34px)",
			height: typeof window !== "undefined" ? window.screen.height * 2 : 1000,
			transition: {
				type: "spring" as const,
				stiffness: 40,
				restDelta: 2,
			},
		},
		closed: {
			clipPath: "circle(20px at calc(100% - 37px) 35px)",
			height: "auto",
			transition: {
				delay: 0.5,
			},
		},
	};

	const handleClick = (event: React.MouseEvent) => {
		event.preventDefault();
		const target = document.getElementById("hero");
		if (target) {
			target.scrollIntoView({ behavior: "smooth" });
		}
	};

	useEffect(() => {
		if (typeof document !== "undefined") {
			document.body.style.overflow = isOpen ? "hidden" : "";

			return () => {
				document.body.style.overflow = "";
			};
		}
	}, [isOpen]);

	return (
		<motion.nav
			initial={false}
			animate={isOpen ? "open" : "closed"}
			className="p-4 pt-3.5 pr-4.2 w-full flex items-center justify-between"
		>
			<a href="#hero" className="" onClick={handleClick}>
				<Image
					src={logoSrc}
					alt="logo"
					className="w-16"
					width={64}
					height={32}
				/>
			</a>

			<MenuToggle toggle={() => toggleOpen()} isOpen={isOpen} />

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.5 } }}
						className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-40"
						onClick={() => toggleOpen()}
					/>
				)}
			</AnimatePresence>

			<motion.div
				className="bg-[--bg-color] absolute right-[-1px] top-0 w-full z-40"
				variants={navVariants}
			>
				<motion.div
					variants={{
						open: {
							transition: { staggerChildren: 0.07, delayChildren: 0.2 },
						},
						closed: {
							transition: { staggerChildren: 0.05, staggerDirection: -1 },
						},
					}}
				>
					<Links toggleOpen={toggleOpen} />
					<motion.div
						className="mt-4 ms-16 flex items-center gap-2"
						variants={{
							open: {
								y: 0,
								opacity: 1,
								transition: {
									y: { stiffness: 1000, velocity: -100 },
								},
							},
							closed: {
								y: 50,
								opacity: 0,
								transition: {
									y: { stiffness: 1000 },
								},
							},
						}}
					>
						<div className="flex items-center gap-3">
							<LanguageSelector />
							<ThemeToggle />
						</div>
					</motion.div>
				</motion.div>
			</motion.div>
		</motion.nav>
	);
}
