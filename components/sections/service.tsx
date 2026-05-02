"use client";

import { SectionHeading } from "@/components/section-heading";
import Button from "@/components/ui/button";
import CircleIcon from "@/components/ui/icons/circle";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

const servicesData = [
	{
		id: 1,
		key: "website",
		icon: "fluent-mdl2:website",
	},
	{
		id: 2,
		key: "marketing",
		icon: "hugeicons:marketing",
	},
	{
		id: 3,
		key: "content",
		icon: "hugeicons:image-add-02",
	},
	{
		id: 4,
		key: "automation",
		icon: "hugeicons:ai-brain-04",
	},
];

const ServiceItem = ({
	id,
	serviceKey,
	icon,
}: {
	id: number;
	serviceKey: string;
	icon: string;
}) => {
	const { t } = useTranslation();

	return (
		<div className="relative h-80 w-full xl:h-96 flex items-center justify-center px-4 py-8">
			<div className="flex flex-col items-center text-center">
				{/* Left Circular Number */}
				<div className="absolute left-8 xl:left-12 top-4">
					<CircleIcon number={id} />
				</div>

				{/* Icon */}
				<Icon icon={icon} className="w-16 h-16 mb-2 text-[--text-color]" />

				{/* Title */}
				<h4 className="font-bold text-lg xl:text-xl">
					{t(`services.items.${serviceKey}.title`)}
				</h4>

				{/* Description */}
				<p className="text-sm xl:text-base text-center text-[--text-gray] mt-2 w-[80%]">
					{t(`services.items.${serviceKey}.description`)}
				</p>
			</div>
		</div>
	);
};

export default function Service() {
	const { t } = useTranslation();

	return (
		<section id="services" className="pb-20 flex flex-col pt-10 lg:pt-0">
			<div className="w-full">
				<SectionHeading>{t("services.title")}</SectionHeading>
				<p className="mx-auto mt-6 max-w-2xl px-4 text-center text-base text-[--text-gray] lg:text-lg">
					{t("services.subtitle")}
				</p>

				{/* Gradient Border Wrapper */}
				<div className="relative flex flex-col w-full items-center mt-8 max-w-screen-xl mx-auto grid-wrapper">
					{/* 2x2 grid on desktop, single column on mobile */}
					<div className="text-[--text-color] grid grid-cols-1 lg:grid-cols-2 w-full relative grid-container">
						{servicesData.map((service, index) => {
							const isLastCol = index % 2 === 1;
							const isLastRow =
								index >= servicesData.length - (servicesData.length % 2 || 2);
							return (
								<div key={service.id} className="relative w-full">
									{/* Vertical divider between columns (desktop) */}
									{!isLastCol && (
										<div className="hidden lg:block absolute top-0 end-0 h-full w-[1px] bg-gradient-to-b from-[--bg-color] via-[--border-color] to-[--bg-color]" />
									)}
									{/* Horizontal divider between rows */}
									{!isLastRow && (
										<div className="absolute bottom-0 start-0 w-full h-[1px] bg-gradient-to-r from-[--bg-color] via-[--border-color] to-[--bg-color]" />
									)}

									<ServiceItem
										id={service.id}
										serviceKey={service.key}
										icon={service.icon}
									/>
								</div>
							);
						})}
					</div>
				</div>
				<p className="mt-10 mx-auto max-w-2xl px-4 text-center text-sm italic text-[--text-gray] lg:text-base">
					{t("services.footer")}
				</p>
				<div className="w-fit mx-auto">
					<Button />
				</div>
			</div>
		</section>
	);
}
