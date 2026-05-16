"use client";

import { useEffect, useState } from "react";

const STATS = [
	{ value: "8", label: "POWER RACKS" },
	{ value: "4", label: "PLATFORMS" },
	{ value: "0", label: "CROWDS" },
	{ value: "24/7", label: "ACCESS" },
] as const;

const CYCLE_MS = 2200;

export function AlphaPreview() {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const id = setInterval(
			() => setIndex((i) => (i + 1) % STATS.length),
			CYCLE_MS,
		);
		return () => clearInterval(id);
	}, []);

	const stat = STATS[index];

	return (
		<div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0a0a0a] text-[#f5efe6]">
			<span
				className="text-[7px] font-semibold tracking-[0.35em] text-[#f5efe6]/40"
				style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
			>
				SHARJAH · EST. 2023
			</span>

			<div className="flex items-baseline gap-2 leading-none">
				<span className="text-[26px] font-black tracking-tight">TRAIN</span>
				<span className="text-[18px] font-light text-[#f5efe6]/50">×</span>
				<span className="text-[26px] font-black tracking-tight">SOCIALIZE</span>
			</div>

			<div className="flex h-9 items-baseline gap-2 overflow-hidden">
				<span
					key={stat.value}
					className="text-[28px] font-black tabular-nums leading-none alpha-pop"
				>
					{stat.value}
				</span>
				<span
					key={`${stat.label}-l`}
					className="text-[8px] font-semibold tracking-[0.3em] text-[#f5efe6]/50 alpha-pop"
					style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
				>
					{stat.label}
				</span>
			</div>

			<div className="mt-1 h-px w-12 bg-[#f5efe6]/30" />

			<span className="text-[8px] tracking-[0.25em] text-[#f5efe6]/40">
				NO CROWDS · NO NOISE · JUST WORK
			</span>

			<style jsx>{`
				.alpha-pop {
					animation: alpha-pop 0.45s ease-out;
				}
				@keyframes alpha-pop {
					from {
						opacity: 0;
						transform: translateY(6px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style>
		</div>
	);
}
