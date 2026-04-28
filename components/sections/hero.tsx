"use client";

import Button from "@/components/ui/button";
import ArrowDown from "@/components/ui/icons/arrow-down";
import Underline from "@/components/ui/icons/underline";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Hero() {
	const { t } = useTranslation();

	const part2 = t("hero.title.part2", { defaultValue: "Online" });
	const part2Words = part2.split(" ");
	const part2Before = part2Words.slice(0, 2).join(" ");
	const part2After = part2Words.slice(2).join(" ");

	return (
		<section
			id="hero"
			className="h-100dvh flex items-center justify-center lg:max-h-[900px] pb-0 pt-0"
		>
			<div className="flex flex-col mt-[-100px] lg:mt-[0px]">
				<h1 className="heading text-center font-[var(--font-primary)] max-w-screen-xl mx-auto text-[40px] leading-[60px] lg:text-4xl lg:leading-[60px] xl:text-6xl xl:leading-[90px] font-900">
					<span className="text-[--text-color]">
						{t("hero.title.part1", { defaultValue: "We Take Businesses" })}
					</span>
					<span className="store-section relative block mx-2 lg:mr-4">
						<span className="font-black text-[--text-color]">
							{part2Before}{" "}
						</span>

						<motion.span
							initial={{ rotate: -25 }}
							animate={{ rotate: 0 }}
							transition={{
								type: "spring",
								duration: 2,
								bounce: 0.5,
								damping: 3,
							}}
							whileHover={{
								rotate: [0, -15, 15, -15, 15, 0],
								transition: {
									duration: 0.5,
									ease: "easeInOut",
								},
							}}
							style={{ display: "inline-block", verticalAlign: "middle" }}
						>
							<Icon
								icon="streamline:money-graph-arrow-increase-ascend-growth-up-arrow-stats-graph-right-grow"
								id="store-icon"
								className="lg:w-16 lg:h-16 me-4 text-[--text-color]"
								aria-label="Growth icon"
							/>
						</motion.span>

						<span className="font-black text-[--text-color]">{part2After}</span>

						<Underline
							viewBox={"-25 -5 250 18"}
							className="underline-svg block"
						/>
					</span>
				</h1>

				<p className="mt-6 mx-auto max-w-2xl px-6 text-center text-lg lg:text-xl xl:text-2xl text-[--text-gray] leading-relaxed">
					{t("hero.subtitle", { defaultValue: "see if I can help you" })}
				</p>

				<Button>{t("hero.cta", { defaultValue: "Start now" })}</Button>

				<div className="flex flex-col items-center mt-12">
					<div className="w-fit">
						<ArrowDown className={"relative"} color={"gray"} />
					</div>
				</div>
			</div>
		</section>
	);
}
