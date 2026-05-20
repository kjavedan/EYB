"use client";

import { SectionHeading } from "@/components/section-heading";
import Button from "@/components/ui/button";
import CircleIcon from "@/components/ui/icons/circle";
import { useTranslation } from "react-i18next";

const steps = [
	{ number: 1, key: "talk" },
	{ number: 2, key: "understand" },
	{ number: 3, key: "build" },
	{ number: 4, key: "use" },
] as const;

function WorkProcessItem({
	number,
	stepKey,
}: {
	number: number;
	stepKey: (typeof steps)[number]["key"];
}) {
	const { t } = useTranslation();

	return (
		<div className="h-full px-6 py-8 lg:px-8 lg:py-10">
			<div className="flex items-start gap-5">
				<CircleIcon number={number} className="h-16 w-20 flex-shrink-0" />
				<div>
					<h3 className="text-xl font-semibold text-[--text-color]">
						{t(`workProcess.steps.${stepKey}.title`)}
					</h3>
					<p className="mt-3 text-base leading-relaxed text-[--text-gray]">
						{t(`workProcess.steps.${stepKey}.description`)}
					</p>
				</div>
			</div>
		</div>
	);
}

export default function WorkProcess() {
	const { t } = useTranslation();

	return (
		<section id="process" className="py-20">
			<div className="mx-auto flex w-full max-w-4xl flex-col">
				<SectionHeading>{t("workProcess.title")}</SectionHeading>
				<p className="mx-auto mt-6 max-w-3xl px-4 text-center text-base text-[--text-gray] lg:text-lg">
					{t("workProcess.subtitle")}
				</p>

				<div className="relative mt-10 overflow-hidden grid-wrapper">
					<div className="grid-container">
						{steps.map((step, index) => (
							<div key={step.number} className="relative">
								{index < steps.length - 1 && (
									<div className="absolute bottom-0 start-0 h-[1px] w-full bg-gradient-to-r from-[--bg-color] via-[--border-color] to-[--bg-color]" />
								)}
								<WorkProcessItem number={step.number} stepKey={step.key} />
							</div>
						))}
					</div>
				</div>

				<Button />
			</div>
		</section>
	);
}
