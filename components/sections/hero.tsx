"use client";

import Button from "@/components/ui/button";
import Underline from "@/components/ui/icons/underline";
import { Trans, useTranslation } from "react-i18next";

export default function Hero() {
	const { t } = useTranslation();

	return (
		<section
			id="hero"
			className="flex min-h-[calc(100dvh-4rem)] items-center justify-center py-16 lg:min-h-[760px]"
		>
			<div className="flex max-w-5xl flex-col items-center">
				<h1 className="heading max-w-5xl text-center font-[var(--font-primary)] text-4xl leading-[1.08] md:text-5xl lg:text-6xl xl:text-[5rem]">
					<span className="block text-[--text-color]">
						<Trans
							i18nKey="hero.title.part1"
							components={[
								<span
									key="highlight"
									className="relative inline-block font-bold text-[--brand-blue]"
								>
									<Underline
										viewBox="0 0 280 15"
										className="pointer-events-none absolute inset-x-0 -bottom-3 h-3 w-full"
										preserveAspectRatio="none"
									/>
								</span>,
							]}
						/>
					</span>
					<span className="mt-3 block whitespace-nowrap text-[--text-color]">
						{t("hero.title.part2", {
							defaultValue: "and bookings manually",
						})}
					</span>
				</h1>

				<p className="mt-8 mx-auto max-w-3xl px-6 text-center text-lg leading-relaxed text-[--text-gray] lg:text-xl xl:text-2xl">
					{t("hero.subtitle", {
						defaultValue:
							"If orders come through WhatsApp, bookings get missed, or staff keep asking what to do next, we build a simple system that fixes it.",
					})}
				</p>

				<div className="mt-12 flex flex-col items-center justify-center gap-3 px-6">
					<Button className="hero-cta-button mt-0">
						{t("hero.cta", { defaultValue: "Talk to us on WhatsApp" })}
					</Button>
					<p className="text-center text-sm text-[--text-gray]">
						{t("hero.helper", {
							defaultValue:
								"Less manual work. Fewer missed orders. Clearer daily operations.",
						})}
					</p>
				</div>
			</div>
		</section>
	);
}
