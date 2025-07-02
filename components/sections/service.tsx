"use client";

import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import CircleIcon from "@/components/ui/icons/circle";
import Button from "@/components/ui/button";

const servicesData = [
	{
		id: 1,
		key: "personal_business",
		icon: "fluent-mdl2:website",
	},
	{
		id: 2,
		key: "store_owners",
		icon: "basil:shopping-bag-outline",
	},
	{
		id: 3,
		key: "product_sellers",
		icon: "hugeicons:marketing",
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
			<div className="flex flex-col items-center">
				{/* Left Circular Number */}
				<div className="absolute left-8 xl:left-12 top-4">
					<CircleIcon number={id} />
				</div>

				{/* Icon */}
				<Icon icon={icon} className="w-20 h-20 mb-2 text-white" />

				{/* Title */}
				<h4 className="font-bold text-xl xl:text-2xl">
					{t(`services.items.${serviceKey}.title`)}
				</h4>

				{/* Description */}
				<p className="text-sm xl:text-base text-center text-[--text-gray] mt-2 w-[75%]">
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
				<h2 className="text-center text-4xl leading-[50px] lg:text-5xl xl:text-6xl lg:leading-[70px] xl:leading-[90px]">
					{t("services.title")}
				</h2>

				{/* Gradient Border Wrapper */}
				<div className="relative flex flex-col w-full items-center mt-8 max-w-screen-xl mx-auto grid-wrapper">
					{/* Flex for Large Screens */}
					<div className="text-white flex flex-col w-full lg:flex-row relative grid-container">
						{servicesData.map((service, index) => (
							<div key={service.id} className="relative w-full lg:w-1/3">
								{/* Gradient Divider */}
								{index < servicesData.length - 1 && (
									<>
										{/* Horizontal Divider for Small Screens */}
										<div className="absolute bottom-0 start-0 w-full h-[1px] lg:hidden bg-gradient-to-r from-black via-[#5E5E5E] to-black"></div>

										{/* Vertical Divider for Large Screens */}
										<div className="hidden lg:block absolute top-0 end-0 h-full w-[1px] bg-gradient-to-b from-black via-[#5E5E5E] to-black"></div>
									</>
								)}

								{/* Service Item */}
								<ServiceItem
									id={service.id}
									serviceKey={service.key}
									icon={service.icon}
								/>
							</div>
						))}
					</div>
				</div>
				<div className="w-fit mx-auto">
					<Button />
				</div>
			</div>
		</section>
	);
}
