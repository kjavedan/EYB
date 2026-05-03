"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useId } from "react";

type FlowNode = {
	key: string;
	icon: string;
	label: string;
	color: string;
};

const DEFAULT_NODES: FlowNode[] = [
	{
		key: "instagram",
		icon: "simple-icons:instagram",
		label: "Instagram",
		color: "#E1306C",
	},
	{
		key: "facebook",
		icon: "simple-icons:facebook",
		label: "Facebook",
		color: "#1877F2",
	},
	{
		key: "tiktok",
		icon: "simple-icons:tiktok",
		label: "TikTok",
		color: "var(--text-color)",
	},
	{
		key: "snapchat",
		icon: "simple-icons:snapchat",
		label: "Snapchat",
		color: "#EAB308",
	},
];

type SocialFlowProps = {
	nodes?: FlowNode[];
	destinationLabel?: string;
};

export default function SocialFlow({
	nodes = DEFAULT_NODES,
	destinationLabel = "Your Website",
}: SocialFlowProps) {
	const gradientId = useId();
	const glowId = useId();

	const positions = nodes.map((_, i) => ((i + 0.5) / nodes.length) * 100);
	const BOTTOM_X = 50;

	return (
		<div className="mx-auto w-full max-w-2xl select-none">
			<div className="relative h-[88px] sm:h-[96px]">
				{nodes.map((node, i) => (
					<div
						key={node.key}
						className="absolute top-0 flex flex-col items-center gap-2"
						style={{
							left: `${positions[i]}%`,
							transform: "translateX(-50%)",
						}}
					>
						<motion.div
							className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[--border-color] bg-[--bg-color] shadow-sm sm:h-16 sm:w-16"
							initial={{ opacity: 0, y: -8 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.4 }}
							transition={{ duration: 0.4, delay: i * 0.08 }}
						>
							<motion.span
								className="flex h-full w-full items-center justify-center"
								animate={{ y: [0, -3, 0] }}
								transition={{
									duration: 3.6,
									repeat: Infinity,
									ease: "easeInOut",
									delay: i * 0.25,
								}}
							>
								<Icon
									icon={node.icon}
									className="h-6 w-6 sm:h-7 sm:w-7"
									style={{ color: node.color }}
								/>
							</motion.span>
						</motion.div>
						<span className="text-[11px] font-medium text-[--text-muted] sm:text-xs">
							{node.label}
						</span>
					</div>
				))}
			</div>

			<div className="relative h-[110px] sm:h-[140px] lg:h-[160px]">
				<svg
					aria-hidden
					viewBox="0 0 100 100"
					preserveAspectRatio="none"
					className="absolute inset-0 h-full w-full overflow-visible"
				>
					<defs>
						<linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="var(--brand-violet)" />
							<stop offset="50%" stopColor="var(--brand-blue)" />
							<stop offset="100%" stopColor="var(--brand-mint)" />
						</linearGradient>
						<filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
							<feGaussianBlur stdDeviation="0.6" result="blur" />
							<feMerge>
								<feMergeNode in="blur" />
								<feMergeNode in="SourceGraphic" />
							</feMerge>
						</filter>
					</defs>

					{positions.map((x, i) => {
						const d = `M ${x} 0 C ${x} 50, ${BOTTOM_X} 50, ${BOTTOM_X} 100`;
						return (
							<g key={nodes[i].key} filter={`url(#${glowId})`}>
								<path
									d={d}
									fill="none"
									stroke={`url(#${gradientId})`}
									strokeWidth={1.5}
									strokeLinecap="round"
									vectorEffect="non-scaling-stroke"
									opacity={0.25}
								/>
								<motion.path
									d={d}
									fill="none"
									stroke={`url(#${gradientId})`}
									strokeWidth={2}
									strokeLinecap="round"
									strokeDasharray="6 12"
									vectorEffect="non-scaling-stroke"
									initial={{ strokeDashoffset: 0, opacity: 0.7 }}
									animate={{
										strokeDashoffset: [0, -18],
										opacity: [0.6, 1, 0.6],
									}}
									transition={{
										strokeDashoffset: {
											duration: 1.6,
											repeat: Infinity,
											ease: "linear",
											delay: i * 0.15,
										},
										opacity: {
											duration: 2.4,
											repeat: Infinity,
											ease: "easeInOut",
											delay: i * 0.2,
										},
									}}
								/>
							</g>
						);
					})}
				</svg>
			</div>

			<div className="relative h-[88px] sm:h-[96px]">
				<div
					className="absolute top-0 flex flex-col items-center gap-2"
					style={{ left: "50%", transform: "translateX(-50%)" }}
				>
					<motion.div
						className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[--border-color] bg-[--bg-color] shadow-sm sm:h-16 sm:w-16"
						initial={{ opacity: 0, y: 8 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.4 }}
						transition={{ duration: 0.5, delay: 0.4 }}
					>
						<motion.span
							className="flex h-full w-full items-center justify-center"
							animate={{ y: [0, -2, 0] }}
							transition={{
								duration: 4,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						>
							<Icon
								icon="mdi:web"
								className="h-7 w-7 sm:h-8 sm:w-8"
								style={{ color: "var(--brand-blue)" }}
							/>
						</motion.span>
					</motion.div>
					<span className="text-[11px] font-medium text-[--text-muted] sm:text-xs">
						{destinationLabel}
					</span>
				</div>
			</div>
		</div>
	);
}
