"use client";

import { SectionHeading } from "@/components/section-heading";
import Button from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

const solutionItems = [
	{ key: "orders", icon: "hugeicons:package-process" },
	{ key: "bookings", icon: "hugeicons:calendar-03" },
	{ key: "staff_tools", icon: "hugeicons:dashboard-square-03" },
] as const;

export default function Concerns() {
	const { t } = useTranslation();

	return (
		<section id="solution" className="py-20">
			<div className="w-full">
				<SectionHeading>{t("concerns.title")}</SectionHeading>
				<p className="mx-auto mt-6 max-w-3xl px-4 text-center text-base text-[--text-gray] lg:text-lg">
					{t("concerns.subtitle")}
				</p>

				<div className="relative mt-10 overflow-hidden grid-wrapper">
					<div className="grid-container flex flex-col text-[--text-color] lg:flex-row">
						{solutionItems.map((item, index) => (
							<div key={item.key} className="relative w-full lg:w-1/3">
								{index < solutionItems.length - 1 && (
									<>
										<div className="absolute bottom-0 start-0 h-[1px] w-full bg-gradient-to-r from-[--bg-color] via-[--border-color] to-[--bg-color] lg:hidden" />
										<div className="hidden lg:block absolute top-0 end-0 h-full w-[1px] bg-gradient-to-b from-[--bg-color] via-[--border-color] to-[--bg-color]" />
									</>
								)}
								<div className="h-full px-6 py-10 text-center lg:px-8 lg:py-12">
									<Icon
										icon={item.icon}
										className="mx-auto block h-12 w-12 text-[--text-color]"
									/>
									<h3 className="mt-5 text-2xl font-semibold">
										{t(`concerns.items.${item.key}.label`)}
									</h3>
									<p className="mt-3 text-base leading-relaxed text-[--text-gray]">
										{t(`concerns.items.${item.key}.description`)}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="mx-auto mt-10 max-w-3xl text-center">
					<p className="text-base leading-relaxed text-[--text-gray] lg:text-lg">
						{t("concerns.bottom_text.part1")}{" "}
						<strong className="text-[--text-color]">
							{t("concerns.bottom_text.part2")}
						</strong>
					</p>
				</div>

				<div className="flex">
					<Button />
				</div>
			</div>
		</section>
	);
}
