"use client";

import { SectionHeading } from "@/components/section-heading";
import Button from "@/components/ui/button";
import ArrowDown from "@/components/ui/icons/arrow-down";
import CircleIcon from "@/components/ui/icons/circle";
import SocialFlow from "@/components/ui/social-flow";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const journeySteps = [
	{ id: 1, key: "professional", icon: "hugeicons:globe-02" },
	{ id: 2, key: "scattered", icon: "hugeicons:dashboard-square-01" },
	{ id: 3, key: "visibility", icon: "hugeicons:eye" },
	{ id: 4, key: "ads", icon: "hugeicons:megaphone-01" },
	{ id: 5, key: "no_customers", icon: "hugeicons:user-question-01" },
	{ id: 6, key: "more_content", icon: "hugeicons:image-add-02" },
	{ id: 7, key: "overwhelmed", icon: "hugeicons:layers-02" },
	{ id: 8, key: "breaking_point", icon: "hugeicons:sad-02" },
] as const;

type StepCardProps = {
	id: number;
	stepKey: string;
	icon: string;
};

function StepCard({ id, stepKey, icon }: StepCardProps) {
	const { t } = useTranslation();

	return (
		<div className="relative flex h-full min-h-[260px] w-full flex-col items-start justify-start gap-4 px-6 py-10 lg:px-8 lg:py-12">
			<div className="absolute start-4 top-4 lg:start-6 lg:top-4">
				<CircleIcon number={id} className="w-16 h-12 lg:w-20 lg:h-16" />
			</div>

			<div className="mt-12 flex w-full flex-col items-center text-center px-4 gap-3 lg:mt-14">
				<Icon
					icon={icon}
					className="h-12 w-12 text-[--text-color] lg:h-14 lg:w-14"
				/>
				<h4 className="text-lg font-bold leading-snug text-[--text-color] lg:text-xl">
					{t(`problemJourney.steps.${stepKey}.title`)}
				</h4>
				<p className="text-sm leading-snug text-[--text-gray] lg:text-base">
					{t(`problemJourney.steps.${stepKey}.description`)}
				</p>
			</div>
		</div>
	);
}

function SummaryBlock() {
	const { t } = useTranslation();

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.4 }}
			transition={{ duration: 0.5 }}
			className="relative flex h-full min-h-[260px] w-full flex-col items-center justify-center gap-4 px-6 py-10 lg:px-8 lg:py-12"
		>
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.07]"
				style={{ background: "var(--brand-gradient)" }}
			/>

			<h3 className="text-2xl text-center font-bold uppercase leading-snug text-[--text-color]">
				{t("problemJourney.summary.title")}
			</h3>
		</motion.div>
	);
}

function StepCell({
	index,
	totalRows,
	totalCols,
	children,
}: {
	index: number;
	totalRows: number;
	totalCols: number;
	children: React.ReactNode;
}) {
	const col = index % totalCols;
	const row = Math.floor(index / totalCols);
	const showRightDivider = col < totalCols - 1;
	const showBottomDivider = row < totalRows - 1;

	return (
		<div className="relative w-full">
			{children}
			{/* Vertical divider (desktop only) */}
			{showRightDivider && (
				<div className="hidden lg:block absolute top-0 end-0 h-full w-[1px] bg-gradient-to-b from-[--bg-color] via-[--border-color] to-[--bg-color]" />
			)}
			{/* Horizontal divider between rows (desktop only) */}
			{showBottomDivider && (
				<div className="hidden lg:block absolute bottom-0 start-0 w-full h-[1px] bg-gradient-to-r from-[--bg-color] via-[--border-color] to-[--bg-color]" />
			)}
		</div>
	);
}

export default function ProblemJourney() {
	const { t } = useTranslation();

	const totalCells = journeySteps.length + 1; // 8 steps + summary
	const totalCols = 3;
	const totalRows = Math.ceil(totalCells / totalCols);

	return (
		<section
			id="problem-journey"
			className="flex flex-col !min-h-0 py-16 lg:py-20"
		>
			<div className="w-full">
				<SectionHeading>{t("problemJourney.title")}</SectionHeading>
				<p className="mx-auto mt-6 max-w-2xl px-4 text-center text-base text-[--text-gray] lg:text-lg">
					{t("problemJourney.subtitle")}
				</p>

				{/* Mobile: gradient-bordered cards stacked vertically with arrow connectors */}
				<div className="mt-12 flex flex-col gap-0 lg:hidden">
					{journeySteps.map((step) => (
						<div key={step.id} className="relative">
							<div className="relative grid-wrapper">
								<div className="relative grid-container">
									<StepCard id={step.id} stepKey={step.key} icon={step.icon} />
								</div>
							</div>
							<div className="flex justify-center my-4">
								<ArrowDown />
							</div>
						</div>
					))}
					<div className="relative grid-wrapper">
						<div className="relative grid-container">
							<SummaryBlock />
						</div>
					</div>
				</div>

				{/* Desktop: 3x3 gradient-bordered grid */}
				<div className="relative mt-12 hidden lg:block max-w-screen-xl mx-auto grid-wrapper">
					<div className="grid-container grid grid-cols-3 text-[--text-color]">
						{journeySteps.map((step, i) => (
							<StepCell
								key={step.id}
								index={i}
								totalRows={totalRows}
								totalCols={totalCols}
							>
								<StepCard id={step.id} stepKey={step.key} icon={step.icon} />
							</StepCell>
						))}
						<StepCell
							index={journeySteps.length}
							totalRows={totalRows}
							totalCols={totalCols}
						>
							<SummaryBlock />
						</StepCell>
					</div>
				</div>

				{/* Positioning block */}
				<div className="mt-16 lg:mt-24 mx-auto max-w-3xl px-4 text-center">
					<h3 className="text-2xl font-bold uppercase leading-snug text-[--text-color] lg:text-4xl lg:leading-tight">
						{t("problemJourney.positioning.title")}
					</h3>
					<p className="mt-6 text-base leading-relaxed text-[--text-gray] lg:text-lg">
						{t("problemJourney.positioning.body")}
					</p>
					<div className="mt-12 lg:mt-16">
						<SocialFlow
							destinationLabel={t("problemJourney.positioning.destination")}
						/>
					</div>
					<div className="mt-10 flex justify-center">
						<Button />
					</div>
				</div>
			</div>
		</section>
	);
}
