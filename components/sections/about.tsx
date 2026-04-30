"use client";

import { Icon } from "@iconify/react";
import Image, { type StaticImageData } from "next/image";
import { useTranslation } from "react-i18next";

import { SectionHeading } from "@/components/section-heading";
import Button from "@/components/ui/button";

import faizSrc from "@/public/images/faiz.jpeg";
import khaledSrc from "@/public/images/khaled.png";
import sajadSrc from "@/public/images/sajad.jpg";

type Social = { platform: string; icon: string; url: string };

/** Each platform's hover color uses its official brand color so the icon
    "lights up" in its own identity on hover. GitHub stays at the current
    text color (it has no signature hue — its brand is essentially black
    on white / white on black). */
const SOCIAL_HOVER_COLOR: Record<string, string> = {
	linkedin: "#0A66C2",
	instagram: "#E4405F",
	behance: "#1769FF",
	github: "var(--text-color)",
};

type Member = {
	id: number;
	/** Used for translation lookup: `about.name.<key>` and `about.role.<key>` */
	key: string;
	image: StaticImageData | null;
	alt: string;
	socials: Social[];
};

const teamMembers: Member[] = [
	{
		id: 1,
		key: "khaled",
		image: khaledSrc,
		alt: "Khaled Javdan — Software Engineer",
		socials: [
			{
				platform: "linkedin",
				icon: "mdi:linkedin",
				url: "https://www.linkedin.com/in/khaled-javdan/",
			},
			{
				platform: "github",
				icon: "mdi:github",
				url: "https://github.com/khaled-javdan",
			},
			{
				platform: "instagram",
				icon: "mdi:instagram",
				url: "https://www.instagram.com/khaled_javedan/",
			},
		],
	},
	{
		id: 2,
		key: "faiz",
		image: faizSrc,
		alt: "Faiz — Digital Marketer",
		socials: [
			{
				platform: "linkedin",
				icon: "mdi:linkedin",
				url: "https://www.linkedin.com/in/muhammad-fahis/",
			},
			{
				platform: "instagram",
				icon: "mdi:instagram",
				url: "https://www.instagram.com/_fa.ez/",
			},
		],
	},
	{
		id: 3,
		key: "sajad",
		image: sajadSrc,
		alt: "Sajad — Content Creator",
		socials: [
			{
				platform: "linkedin",
				icon: "mdi:linkedin",
				url: "https://www.linkedin.com/in/sajad-tharayil-2109a2192/",
			},
			{
				platform: "instagram",
				icon: "mdi:instagram",
				url: "https://www.instagram.com/sdwithlens/",
			},
		],
	},
	{
		id: 4,
		key: "anshid",
		// TODO: add a photo to public/images/ and import it here
		image: null,
		alt: "Anshid — Designer",
		socials: [
			{
				platform: "linkedin",
				icon: "mdi:linkedin",
				url: "https://www.linkedin.com/in/anshid-mp-64b40b222/",
			},
			{
				platform: "behance",
				icon: "mdi:behance",
				url: "https://www.behance.net/anshidamar",
			},
			{
				platform: "instagram",
				icon: "mdi:instagram",
				url: "https://www.instagram.com/anshidee/",
			},
		],
	},
];

const TeamCard = ({ member }: { member: Member }) => {
	const { t } = useTranslation();
	const memberName = t(`about.name.${member.key}`);

	return (
		<div className="flex flex-col items-center px-6 py-10 lg:py-12">
			{/* Avatar */}
			<div className="relative w-32 h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden bg-[--bg-elevated] flex items-center justify-center">
				{member.image ? (
					<Image
						src={member.image}
						alt={member.alt}
						fill
						className="object-cover"
						sizes="144px"
					/>
				) : (
					<Icon
						icon="mdi:account"
						className="w-16 h-16 text-[--text-gray]"
					/>
				)}
			</div>

			{/* Name */}
			<h3 className="mt-5 text-lg font-semibold text-[--text-color]">
				{memberName}
			</h3>

			{/* Role */}
			<p className="mt-1 text-sm text-[--text-gray] text-center max-w-60">
				{t(`about.role.${member.key}`)}
			</p>

			{/* Socials */}
			<div className="mt-4 flex items-center gap-3">
				{member.socials.map((social) => (
					<a
						key={social.platform}
						href={social.url}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={`${memberName} on ${social.platform}`}
						style={
							{
								"--social-hover":
									SOCIAL_HOVER_COLOR[social.platform] ?? "var(--text-color)",
							} as React.CSSProperties
						}
						className="text-[--text-gray] hover:text-[--social-hover] transition-colors"
					>
						<Icon icon={social.icon} className="w-5 h-5" />
					</a>
				))}
			</div>
		</div>
	);
};

export default function About() {
	const { t } = useTranslation();

	return (
		<section
			id="about"
			aria-labelledby="about-heading"
			className="pb-20 flex flex-col pt-10 lg:pt-0"
		>
			<div className="w-full">
				<SectionHeading id="about-heading">
					{t("about.title.part1")} {t("about.title.part2")}
				</SectionHeading>

				{/* Team Grid — same `grid-wrapper` / `grid-container` pattern as
				    Services & Concerns. 4 columns on lg+, stacked on mobile. */}
				<div className="relative flex flex-col w-full items-center mt-10 max-w-screen-xl mx-auto grid-wrapper">
					<div className="text-[--text-color] flex flex-col w-full lg:flex-row relative grid-container">
						{teamMembers.map((member, index) => (
							<div key={member.id} className="relative w-full lg:w-1/4">
								{index < teamMembers.length - 1 && (
									<>
										{/* Mobile divider — between stacked cards */}
										<div className="absolute bottom-0 start-0 w-full h-[1px] lg:hidden bg-gradient-to-r from-[--bg-color] via-[--border-color] to-[--bg-color]" />
										{/* Desktop divider — between columns in same row */}
										<div className="hidden lg:block absolute top-0 end-0 h-full w-[1px] bg-gradient-to-b from-[--bg-color] via-[--border-color] to-[--bg-color]" />
									</>
								)}
								<TeamCard member={member} />
							</div>
						))}
					</div>
				</div>

				<div className="w-fit mx-auto mt-10">
					<Button />
				</div>
			</div>
		</section>
	);
}
