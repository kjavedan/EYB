import type { StaticImageData } from "next/image";

import aiyifenSrc from "@/assets/images/aiyifen.webp";
import jojoshpoSrc from "@/assets/images/jojoshop.jpg";
import honeySrc from "@/assets/images/honey.webp";
import plumbingSrc from "@/assets/images/plumbing.png";

export type Project = {
	slug: string;
	/** Translation key under `testimonials.items.*` */
	i18nKey: string;
	image: StaticImageData;
	projectType: string;
	domainName: string;
	siteUrl: string;
};

export const projects: Project[] = [
	{
		slug: "aiyifen",
		i18nKey: "1",
		image: aiyifenSrc,
		projectType: "Ecommerce",
		domainName: "aiyifen.com",
		siteUrl: "https://aiyifen.com",
	},
	{
		slug: "jojooshop",
		i18nKey: "2",
		image: jojoshpoSrc,
		projectType: "Ecommerce",
		domainName: "jojooshop.com",
		siteUrl: "https://shop.khaled-javdan.com",
	},
	{
		slug: "healthyplus",
		i18nKey: "3",
		image: honeySrc,
		projectType: "Ecommerce",
		domainName: "healthyplus.ae",
		siteUrl: "https://honey-store-ruddy.vercel.app/",
	},
	{
		slug: "ibrahim-shop",
		i18nKey: "4",
		image: plumbingSrc,
		projectType: "Automation",
		domainName: "ibrahim-shop.com",
		siteUrl: "https://mehragan-shop.vercel.app",
	},
];

export function getProjectBySlug(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}
