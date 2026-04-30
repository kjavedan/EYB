"use client";

import Button from "@/components/ui/button";
import ArrowDown from "@/components/ui/icons/arrow-down";
import Underline from "@/components/ui/icons/underline";
import { WHATSAPP_URL } from "@/lib/config";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Hero() {
	const { t } = useTranslation();

	const part2 = t("hero.title.part2", { defaultValue: "Online" });
	const part2Words = part2.split(" ");
	const part2Before = part2Words.slice(0, 2).join(" ");
	const part2After = part2Words.slice(2).join(" ");
	const whatsappMessage = t("contact.whatsapp.message", {
		defaultValue:
			"Hi Khaled! We're interested in starting a project with you. Can you share more details?",
	});
	const whatsappHref = `${WHATSAPP_URL}?text=${encodeURIComponent(
		whatsappMessage,
	)}`;

	return (
		<section
			id="hero"
			className="h-100dvh flex items-center justify-center lg:max-h-[900px] pb-0 pt-0"
		>
			<div className="flex flex-col mt-[-100px] lg:mt-[0px]">
				<h1 className="heading text-center font-[var(--font-primary)] max-w-screen-xl mx-auto text-[40px] leading-[60px] md:text-5xl md:leading-[70px] lg:text-6xl lg:leading-[80px] xl:text-7xl xl:leading-[100px] 2xl:text-7xl 2xl:leading-[110px]">
					<span className="text-[--text-color]">
						{t("hero.title.part1", { defaultValue: "We Take Businesses" })}
					</span>
					<span className="store-section relative block mx-2 lg:mr-4">
						<span className="font-bold text-[--text-color]">
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

						<span className="font-bold text-[--text-color]">{part2After}</span>

						<Underline
							viewBox={"-25 -5 250 18"}
							className="underline-svg block"
						/>
					</span>
				</h1>

				<p className="mt-6 mx-auto max-w-2xl px-6 text-center text-lg lg:text-xl xl:text-2xl text-[--text-gray] leading-relaxed">
					{t("hero.subtitle", { defaultValue: "see if I can help you" })}
				</p>

				<div className="mt-8 flex flex-col items-center justify-center gap-3 lg:gap-6 px-6 sm:flex-row">
					<Button className="hero-cta-button mt-0">
						{t("hero.cta", { defaultValue: "Schedule a call" })}
					</Button>
					<motion.a
						href={whatsappHref}
						target="_blank"
						rel="noopener noreferrer"
						whileHover={{ scale: 1.05 }}
						className="hero-cta-button hero-cta-secondary group inline-flex items-center justify-center gap-2 rounded-full border border-[--border-color] text-sm font-semibold text-[--text-color] hover:border-[--brand-mint] hover:bg-[--brand-mint] hover:text-white lg:text-base"
					>
						<Icon
							icon="mingcute:whatsapp-fill"
							className="h-5 w-5 text-[#25D366] transition-colors duration-300 group-hover:text-white"
							aria-hidden="true"
						/>
						<span>
							{t("hero.whatsapp_cta", { defaultValue: "Prefer WhatsApp?" })}
						</span>
					</motion.a>
				</div>

				<div className="flex flex-col items-center mt-12">
					<div className="w-fit">
						<ArrowDown className={"relative"} color={"gray"} />
					</div>
				</div>
			</div>
		</section>
	);
}
