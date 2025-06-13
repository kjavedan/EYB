"use client";

import Button from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { AnimatedTestimonials } from "../ui/animated-testimonials";

import aiyifenSrc from "@/assets/images/aiyifen.webp";
import jojoshpoSrc from "@/assets/images/jojoshop.jpg";
import honeySrc from "@/assets/images/honey.webp";
import plumbingSrc from "@/assets/images/plumbing.png";

export default function Testimonials() {
	const { t } = useTranslation();

	const testimonials = [
		{
			quote: t("testimonials.items.1.quote"),
			name: t("testimonials.items.1.name"),
			designation: t("testimonials.items.1.designation"),
			src: aiyifenSrc.src,
			projectType: "Ecommerce",
			domainName: "aiyifen.com",
			siteUrl: "https://aiyifen.com",
			address: t("testimonials.items.1.address"),
		},
		{
			quote: t("testimonials.items.2.quote"),
			name: t("testimonials.items.2.name"),
			designation: t("testimonials.items.2.designation"),
			src: jojoshpoSrc.src,
			projectType: "Ecommerce",
			domainName: "jojooshop.com",
			siteUrl: "https://shop.khaled-javdan.com",
			address: t("testimonials.items.2.address"),
		},
		{
			quote: t("testimonials.items.3.quote"),
			name: t("testimonials.items.3.name"),
			designation: t("testimonials.items.3.designation"),
			src: honeySrc.src,
			projectType: "Ecommerce",
			domainName: "healthyplus.ae",
			siteUrl: "https://honey-store-ruddy.vercel.app/",
			address: t("testimonials.items.3.address"),
		},
		{
			quote: t("testimonials.items.4.quote"),
			name: t("testimonials.items.4.name"),
			designation: t("testimonials.items.4.designation"),
			src: plumbingSrc.src,
			projectType: "Automation",
			domainName: "ibrahim-shop.com",
			siteUrl: "https://mehragan-shop.vercel.app",
			address: t("testimonials.items.4.address"),
		},
	];

	return (
		<section id="Testimonials" className="pb-20 flex flex-col">
			<h2 className="text-center text-4xl leading-[50px] lg:text-5xl xl:text-6xl lg:leading-[70px] xl:leading-[90px]">
				{t("testimonials.title")}
			</h2>
			<AnimatedTestimonials testimonials={testimonials} />
			<Button className="mt-20" />
		</section>
	);
}
