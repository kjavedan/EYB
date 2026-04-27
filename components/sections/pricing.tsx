"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const PACKAGE_KEYS = ["launchpad", "growth_engine", "custom_build"] as const;
type PackageKey = (typeof PACKAGE_KEYS)[number];

const SPOTS_BY_PACKAGE: Record<PackageKey, number> = {
	launchpad: 5,
	growth_engine: 1,
	custom_build: 2,
};

const HIGHLIGHTED: PackageKey = "growth_engine";

const PricingCard = ({
	title,
	price,
	duration,
	description,
	features,
	guarantee,
	availableSpot,
	isHighlighted,
}: {
	title: string;
	price: string;
	duration: string;
	description: string;
	features: string[];
	guarantee: string;
	availableSpot: number;
	isHighlighted?: boolean;
}) => {
	const { t } = useTranslation();

	return (
		<div
			className={`relative h-full p-8 flex flex-col ${
				availableSpot === 0 ? "text-[--text-gray]" : ""
			} ${isHighlighted ? "lg:scale-[1.02]" : ""}`}
		>
			<h4 className="text-4xl font-bold mb-2">{price}</h4>
			<div className="flex items-center justify-between mb-4">
				<h4 className="text-2xl font-semibold">{title}</h4>
				<h5 className="text-xs text-[--text-gray]">{duration}</h5>
			</div>
			<motion.span
				className={`w-fit text-xs font-semibold mb-4 px-3 py-1.5 rounded-full inline-block border ${
					availableSpot === 0
						? "border-gray-600 text-[--text-gray]"
						: isHighlighted
							? "bg-purple-500/20 border-purple-400/50 text-purple-200"
							: "bg-purple-500/10 border-purple-400/25 text-purple-200/80"
				}`}
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.8 }}
				transition={{ duration: 0.4, ease: "easeInOut" }}
			>
				{availableSpot}{" "}
				{availableSpot <= 1
					? t("pricing.spots.single")
					: t("pricing.spots.multiple")}
			</motion.span>
			<p className="mb-6 text-[--text-gray] text-sm min-h-[5rem]">
				{description}
			</p>

			<ul className="space-y-3 mb-6">
				{features.map((feature, index) => (
					<li key={index} className="flex items-start gap-2">
						<Icon
							icon="mdi:check"
							className="w-4 h-4 mt-0.5 flex-shrink-0"
						/>
						<span className="text-sm">{feature}</span>
					</li>
				))}
			</ul>

			<div className="mt-auto pt-4 border-t border-white/10">
				<div className="flex items-center gap-2 mb-2">
					<Icon
						icon="mdi:shield-check-outline"
						className="w-4 h-4 flex-shrink-0 text-white"
					/>
					<span className="text-sm font-semibold">
						{t("pricing.guarantee_heading")}
					</span>
				</div>
				<p className="text-sm text-[--text-gray] leading-relaxed">
					{guarantee}
				</p>
			</div>
		</div>
	);
};

export default function Pricing() {
	const { t, ready } = useTranslation();

	const packages = PACKAGE_KEYS.map((key) => {
		const features = ready
			? (t(`pricing.packages.${key}.features`, { returnObjects: true }) as
					| string[]
					| string)
			: ["Loading..."];
		return {
			key,
			title: t(`pricing.packages.${key}.title`, { defaultValue: key }),
			price: t(`pricing.packages.${key}.price`, { defaultValue: "—" }),
			duration: t(`pricing.packages.${key}.duration`, { defaultValue: "" }),
			description: t(`pricing.packages.${key}.description`, {
				defaultValue: "",
			}),
			features: Array.isArray(features) ? features : [],
			guarantee: t(`pricing.packages.${key}.guarantee`, { defaultValue: "" }),
			availableSpot: SPOTS_BY_PACKAGE[key],
			isHighlighted: key === HIGHLIGHTED,
		};
	});

	return (
		<section id="pricing" className="py-20">
			<div className="w-full">
				<h2 className="text-center text-4xl leading-[50px] lg:text-5xl xl:text-6xl lg:leading-[70px] xl:leading-[90px]">
					{t("pricing.title", { defaultValue: "Pricing" })}
				</h2>

				<div className="w-full mt-12">
					<div className="w-full overflow-hidden grid-wrapper">
						<div className="text-white flex flex-col w-full lg:flex-row relative grid-container">
							{packages.map((pkg, index) => (
								<div key={pkg.key} className="relative w-full lg:w-1/3">
									{index < packages.length - 1 && (
										<>
											<div className="absolute bottom-0 start-0 w-full h-[1px] lg:hidden bg-gradient-to-r from-black via-[#5E5E5E] to-black" />
											<div className="hidden lg:block absolute top-0 end-0 h-full w-[1px] bg-gradient-to-b from-black via-[#5E5E5E] to-black" />
										</>
									)}
									<PricingCard
										title={pkg.title}
										price={pkg.price}
										duration={pkg.duration}
										description={pkg.description}
										features={pkg.features}
										guarantee={pkg.guarantee}
										availableSpot={pkg.availableSpot}
										isHighlighted={pkg.isHighlighted}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
