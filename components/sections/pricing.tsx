"use client";

import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const PricingCard = ({
	title,
	price,
	duration,
	features,
	buttonText,
	description,
	availableSpot,
	isHighlighted,
}: {
	title: string;
	price: string;
	duration: string;
	features: string[];
	buttonText: string;
	description: string;
	availableSpot: number;
	isHighlighted?: boolean;
}) => {
	const { t } = useTranslation();

	return (
		<div
			className={`relative h-full p-8 pb-20 flex flex-col justify-between ${
				availableSpot === 0 ? "text-[--text-gray]" : ""
			}`}
		>
			<div>
				<h4 className="text-4xl font-bold mb-2">{price}</h4>
				<div className="flex items-center justify-between mb-4">
					<h4 className="text-2xl font-semibold">{title}</h4>
					<h5 className="text-sm">{duration}</h5>
				</div>
				<motion.span
					className={`text-white w-fit text-xs font-semibold mb-4 p-2 border border-white rounded-full shadow-lg inline-block ${
						availableSpot === 0 ? "border-gray-600 text-[--text-gray]" : ""
					} ${
						isHighlighted
							? "bg-[--secondary-color] border-[--secondary-color]"
							: ""
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
				<p className="mb-6 text-[--text-gray] text-sm">{description}</p>
				<ul className="space-y-3 mb-8">
					{Array.isArray(features) &&
						features.map((feature, index) => (
							<li key={index} className="flex items-start gap-2">
								<Icon
									icon="mdi:check"
									className="w-4 h-4 mt-0.5 flex-shrink-0"
								/>
								<span className="text-sm">{feature}</span>
							</li>
						))}
				</ul>
			</div>
			<Button
				className="px-6 py-2 mx-0 mt-0 w-full"
				disabled={availableSpot === 0}
			>
				{buttonText}
			</Button>
		</div>
	);
};

export default function Pricing() {
	const { t, ready } = useTranslation();
	const [activeOption, setActiveOption] = useState("Website");

	const handleOptionChange = (option: string) => {
		setActiveOption(option);
	};

	// Get packages from translations with proper error handling
	const getPackages = () => {
		if (!ready) {
			return [
				{
					id: 1,
					availableSpot: 3,
					title: "Loading...",
					duration: "Loading...",
					description: "Loading...",
					features: ["Loading..."],
					buttonText: "Loading...",
					price: "Loading...",
				},
			];
		}

		const packageType = activeOption.toLowerCase();
		const packageKeys = ["starter", "growth", "elite"];

		return packageKeys.map((key, index) => {
			const title = t(`pricing.packages.${packageType}.${key}.title`, {
				defaultValue: key.charAt(0).toUpperCase() + key.slice(1),
			});
			const duration = t(`pricing.packages.${packageType}.${key}.duration`, {
				defaultValue: "TBD",
			});
			const description = t(
				`pricing.packages.${packageType}.${key}.description`,
				{
					defaultValue: "Package description",
				},
			);

			const featuresKey = `pricing.packages.${packageType}.${key}.features`;
			const features = t(featuresKey, {
				returnObjects: true,
				defaultValue: ["Feature 1", "Feature 2", "Feature 3"],
			});

			return {
				id: index + 1,
				availableSpot: key === "elite" ? 1 : key === "growth" ? 1 : 3,
				title,
				duration,
				description,
				features: Array.isArray(features)
					? features
					: ["Feature 1", "Feature 2", "Feature 3"],
				buttonText: t("buttons.start_now", { defaultValue: "Start now" }),
				price:
					key === "starter"
						? "4,999AED"
						: key === "growth"
							? "9,400AED"
							: "17,999AED",
				isHighlighted: key === "growth",
			};
		});
	};

	const packages = getPackages();

	return (
		<section id="pricing" className="py-20">
			<div className="w-full">
				<h2 className="text-center text-4xl leading-[50px] lg:text-5xl xl:text-6xl lg:leading-[70px] xl:leading-[90px]">
					{t("pricing.title", { defaultValue: "Pricing" })}
				</h2>
				{/* Keep the new button group design */}
				<motion.div
					className="flex justify-center mt-4 lg:mt-2 bg-black/20 backdrop-blur-xl border border-white/10 rounded-full p-2 w-fit mx-auto shadow-2xl"
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					viewport={{ once: true }}
				>
					{["Website", "Store"].map((option) => (
						<motion.button
							key={option}
							onClick={() => handleOptionChange(option)}
							className={`relative border-none outline-none cursor-pointer px-8 py-4 rounded-full font-semibold transition-all duration-500 ${
								activeOption === option
									? "text-white"
									: "text-gray-400 hover:text-white"
							}`}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							{activeOption === option && (
								<motion.div
									className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
									layoutId="activeTab"
									transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
								/>
							)}
							<span className="relative z-10">
								{t(`pricing.options.${option.toLowerCase()}`, {
									defaultValue: option,
								})}
							</span>
						</motion.button>
					))}
				</motion.div>

				<div className="w-full mt-8">
					<AnimatePresence mode="wait">
						<motion.div
							key={activeOption}
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 20 }}
							transition={{ duration: 0.3 }}
							className="w-full overflow-hidden grid-wrapper"
						>
							<div className="text-white flex flex-col w-full lg:flex-row relative grid-container">
								{packages.map((pkg, index) => (
									<div key={pkg.id} className="relative w-full lg:w-1/3">
										{/* Gradient Divider */}
										{index < packages.length - 1 && (
											<>
												{/* Horizontal Divider for Small Screens */}
												<div className="absolute bottom-0 start-0 w-full h-[1px] lg:hidden bg-gradient-to-r from-black via-[#5E5E5E] to-black"></div>

												{/* Vertical Divider for Large Screens */}
												<div className="hidden lg:block absolute top-0 end-0 h-full w-[1px] bg-gradient-to-b from-black via-[#5E5E5E] to-black"></div>
											</>
										)}
										<PricingCard
											title={pkg.title}
											price={pkg.price}
											duration={pkg.duration}
											features={pkg.features}
											description={pkg.description}
											buttonText={pkg.buttonText}
											availableSpot={pkg.availableSpot}
											isHighlighted={pkg.isHighlighted}
										/>
									</div>
								))}
							</div>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</section>
	);
}
