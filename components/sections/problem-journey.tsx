"use client";

import { SectionHeading } from "@/components/section-heading";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

const painPoints = [
	{ key: "manual_orders", icon: "hugeicons:note-01" },
	{ key: "whatsapp_chaos", icon: "mingcute:whatsapp-fill" },
	{ key: "missed_bookings", icon: "hugeicons:calendar-remove-01" },
	{ key: "staff_confusion", icon: "hugeicons:user-multiple-03" },
] as const;

export default function ProblemJourney() {
	const { t } = useTranslation();

	return (
		<section id="problem" className="py-16 lg:py-20">
			<div className="mx-auto flex w-full max-w-4xl flex-col">
				<SectionHeading>{t("problemJourney.title")}</SectionHeading>
				<p className="mx-auto mt-6 max-w-3xl px-4 text-center text-base text-[--text-gray] lg:text-lg">
					{t("problemJourney.subtitle")}
				</p>

				<div className="relative mt-12 overflow-hidden grid-wrapper">
					<div className="grid-container grid grid-cols-1 text-[--text-color] lg:grid-cols-2">
						{painPoints.map((item, index) => (
							<div
								key={item.key}
								className="relative px-6 py-10 lg:px-10 lg:py-12"
							>
								{index % 2 === 0 && (
									<div className="hidden lg:block absolute top-0 end-0 h-full w-[1px] bg-gradient-to-b from-[--bg-color] via-[--border-color] to-[--bg-color]" />
								)}
								{index < painPoints.length - 2 && (
									<div className="hidden lg:block absolute bottom-0 start-0 h-[1px] w-full bg-gradient-to-r from-[--bg-color] via-[--border-color] to-[--bg-color]" />
								)}
								{index < painPoints.length - 1 && (
									<div className="absolute bottom-0 start-0 h-[1px] w-full bg-gradient-to-r from-[--bg-color] via-[--border-color] to-[--bg-color] lg:hidden" />
								)}
								<div className="mx-auto flex max-w-md flex-col items-center text-center">
									<Icon
										icon={item.icon}
										className="h-10 w-10 text-[--text-color]"
									/>
									<h3 className="mt-5 text-2xl font-semibold">
										{t(`problemJourney.steps.${item.key}.title`)}
									</h3>
									<p className="mt-3 text-base leading-relaxed text-[--text-gray]">
										{t(`problemJourney.steps.${item.key}.description`)}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="mx-auto mt-10 max-w-3xl text-center">
					<h3 className="text-2xl font-semibold text-[--text-color] lg:text-3xl">
						{t("problemJourney.summary.title")}
					</h3>
					<p className="mt-4 text-base leading-relaxed text-[--text-gray] lg:text-lg">
						{t("problemJourney.summary.description")}
					</p>
				</div>
			</div>
		</section>
	);
}
