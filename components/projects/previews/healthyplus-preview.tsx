"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const SECTIONS = [
	{
		title: "Pure Honey",
		labels: ["Sidr", "Wildflower", "Manuka", "Acacia"],
	},
	{
		title: "Bee Products",
		labels: ["Royal Jelly", "Pollen", "Propolis", "Beeswax"],
	},
	{
		title: "Wellness",
		labels: ["Immunity", "Energy", "Skincare", "Gifts"],
	},
] as const;

const CYCLE_MS = 3500;
const BRAND_YELLOW = "#F9D000";

export function HealthyplusPreview() {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const id = setInterval(
			() => setIndex((i) => (i + 1) % SECTIONS.length),
			CYCLE_MS,
		);
		return () => clearInterval(id);
	}, []);

	const section = SECTIONS[index];

	return (
		<div className="absolute inset-0 flex items-center justify-center bg-[--bg-color] p-3">
			<div className="flex w-full max-w-[280px] flex-col gap-2 text-[--text-color]">
				<div className="flex items-center justify-between border-b border-[--border-color] pb-1.5">
					<span
						className="text-[11px] font-extrabold leading-none tracking-tight"
						style={{ color: BRAND_YELLOW }}
					>
						h+
					</span>
					<div className="flex gap-2 text-[7px] font-medium text-[--text-gray]">
						<span>Shop</span>
						<span>About</span>
						<span>Cart</span>
					</div>
				</div>

				<AnimatePresence mode="wait">
					<motion.div
						key={section.title}
						initial={{ opacity: 0, y: 4 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -4 }}
						transition={{ duration: 0.25, ease: "easeOut" }}
						className="flex flex-col gap-1.5"
					>
						<div className="flex items-center justify-between">
							<h4 className="text-[10px] font-bold leading-none">
								{section.title}
							</h4>
							<div className="flex gap-1 text-[8px] text-[--text-gray]">
								<span className="grid size-3.5 place-items-center rounded-full bg-[--text-color]/10">
									‹
								</span>
								<span className="grid size-3.5 place-items-center rounded-full bg-[--text-color]/10">
									›
								</span>
							</div>
						</div>

						<div className="grid grid-cols-4 gap-1">
							{section.labels.map((label) => (
								<div
									key={label}
									className="relative aspect-[4/3] overflow-hidden rounded-md bg-gradient-to-br from-amber-300 to-amber-500"
								>
									<span className="absolute bottom-1 left-1 text-[6px] font-bold leading-tight text-stone-900">
										{label}
									</span>
								</div>
							))}
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}
