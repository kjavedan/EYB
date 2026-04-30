"use client";

import NumberFlow from "@number-flow/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { SectionHeading } from "@/components/section-heading";

const PACKAGE_KEYS = ["launchpad", "growth_engine", "custom_build"] as const;
type PackageKey = (typeof PACKAGE_KEYS)[number];

const SPOTS_BY_PACKAGE: Record<PackageKey, number> = {
	launchpad: 5,
	growth_engine: 1,
	custom_build: 2,
};

const HIGHLIGHTED: PackageKey = "growth_engine";
const AED_TO_USD_RATE = 3.67;

type Currency = "AED" | "USD";

type ResolvedPrice =
	| { kind: "numeric"; amount: number; currency: Currency }
	| { kind: "text"; value: string };

const parseAmount = (value: string) => {
	const normalized = value.replace(/[^0-9.]/g, "");
	const amount = Number.parseFloat(normalized);
	return Number.isNaN(amount) ? null : amount;
};

const resolvePrice = ({
	priceAed,
	priceUsd,
	currency,
}: {
	priceAed: string;
	priceUsd: string;
	currency: Currency;
}): ResolvedPrice => {
	if (currency === "AED") {
		const amount = parseAmount(priceAed);
		return amount !== null
			? { kind: "numeric", amount, currency: "AED" }
			: { kind: "text", value: priceAed };
	}

	if (priceUsd && priceUsd !== "—") {
		const usdAmount = parseAmount(priceUsd);
		if (usdAmount !== null) {
			return { kind: "numeric", amount: usdAmount, currency: "USD" };
		}
	}

	const parsedAedAmount = parseAmount(priceAed);
	if (parsedAedAmount === null) {
		return { kind: "text", value: priceAed };
	}

	return {
		kind: "numeric",
		amount: Math.round(parsedAedAmount / AED_TO_USD_RATE),
		currency: "USD",
	};
};

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
	price: ResolvedPrice;
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
			<h4 className="text-4xl font-bold mb-2">
				{price.kind === "numeric" ? (
					<NumberFlow
						value={price.amount}
						format={{
							style: "currency",
							currency: price.currency,
							maximumFractionDigits: 0,
						}}
						locales="en-US"
					/>
				) : (
					price.value
				)}
			</h4>
			<div className="flex items-center justify-between mb-4">
				<h4 className="text-2xl font-semibold">{title}</h4>
				<h5 className="text-xs text-[--text-gray]">{duration}</h5>
			</div>
			<motion.span
				className={`w-fit text-xs font-semibold mb-4 px-3 py-1.5 rounded-full inline-block border ${
					availableSpot === 0
						? "border-gray-600 text-[--text-gray]"
						: isHighlighted
							? "bg-gradient-to-r from-brand-blue/25 via-brand-violet/25 to-brand-mint/25 border-brand-violet/50 text-brand-blue dark:text-white"
							: "bg-gradient-to-r from-brand-blue/15 via-brand-violet/15 to-brand-mint/15 border-brand-violet/30 text-brand-blue/85 dark:text-white/85"
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

			<ul className="space-y-3 mb-6 flex-1">
				{features.map((feature, index) => (
					<li key={index} className="flex items-start gap-2">
						<Icon icon="mdi:check" className="w-4 h-4 mt-0.5 flex-shrink-0" />
						<span className="text-sm">{feature}</span>
					</li>
				))}
			</ul>

			<div className="pt-4 border-t border-[--border-color]">
				<div className="flex items-center gap-2 mb-2">
					<Icon
						icon="mdi:shield-check-outline"
						className="w-4 h-4 flex-shrink-0 text-[--text-color]"
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
	const [currency, setCurrency] = useState<Currency>("AED");

	const packages = PACKAGE_KEYS.map((key) => {
		const features = ready
			? (t(`pricing.packages.${key}.features`, { returnObjects: true }) as
					| string[]
					| string)
			: ["Loading..."];
		return {
			key,
			title: t(`pricing.packages.${key}.title`, { defaultValue: key }),
			price: resolvePrice({
				priceAed: t(`pricing.packages.${key}.price_aed`, {
					defaultValue: t(`pricing.packages.${key}.price`, {
						defaultValue: "—",
					}),
				}),
				priceUsd: t(`pricing.packages.${key}.price_usd`, {
					defaultValue: "",
				}),
				currency,
			}),
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
				<SectionHeading>
					{t("pricing.title", { defaultValue: "Pricing" })}
				</SectionHeading>
				<div className="mt-6 flex justify-center">
					<div className="inline-flex rounded-full border border-[--border-color] bg-[--card-bg] p-1">
						{(["AED", "USD"] as const).map((option) => {
							const active = currency === option;
							return (
								<motion.button
									key={option}
									type="button"
									onClick={() => setCurrency(option)}
									className={`relative rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
										active
											? "text-[--bg-color]"
											: "text-[--text-gray] hover:text-[--text-color]"
									}`}
									whileTap={{ scale: 0.96 }}
								>
									{active && (
										<motion.span
											layoutId="currency-toggle-pill"
											className="absolute inset-0 rounded-full bg-[--text-color]"
											transition={{
												type: "spring",
												stiffness: 500,
												damping: 35,
											}}
										/>
									)}
									<span className="relative z-10">{option}</span>
								</motion.button>
							);
						})}
					</div>
				</div>

				<div className="w-full mt-12">
					<div className="w-full overflow-hidden grid-wrapper">
						<div className="text-[--text-color] flex flex-col w-full lg:flex-row relative grid-container">
							{packages.map((pkg, index) => (
								<div key={pkg.key} className="relative w-full lg:w-1/3">
									{index < packages.length - 1 && (
										<>
											<div className="absolute bottom-0 start-0 w-full h-[1px] lg:hidden bg-gradient-to-r from-[--bg-color] via-[--border-color] to-[--bg-color]" />
											<div className="hidden lg:block absolute top-0 end-0 h-full w-[1px] bg-gradient-to-b from-[--bg-color] via-[--border-color] to-[--bg-color]" />
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
