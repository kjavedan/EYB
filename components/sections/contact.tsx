"use client";

import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

import {
	INSTAGRAM_URL,
	LINKEDIN_URL,
	SUPPORT_EMAIL,
	WHATSAPP_URL,
} from "@/lib/config";
import { trackEvent } from "@/lib/meta-pixel";
import { SectionHeading } from "../section-heading";

const socials = [
	{
		key: "instagram",
		icon: "ri:instagram-fill",
		url: INSTAGRAM_URL,
		hoverColor: "hover:text-[#E4405F]",
	},
	{
		key: "whatsapp",
		icon: "mingcute:whatsapp-fill",
		url: WHATSAPP_URL,
		hoverColor: "hover:text-[#25D366]",
	},
	{
		key: "linkedin",
		icon: "mage:linkedin",
		url: LINKEDIN_URL,
		hoverColor: "hover:text-[#0077B5]",
	},
] as const;

export default function Contact() {
	const { t } = useTranslation();
	const year = new Date().getFullYear();

	return (
		<section id="contact" className="mt-40">
			<div className="mx-auto max-w-3xl pb-12 pt-20 text-center">
				<p className="text-xs font-semibold uppercase tracking-[0.25em] text-[--text-gray]">
					{t("contact.subtitle")}
				</p>
				<SectionHeading className="mt-4 !text-center">
					{t("contact.title")}
				</SectionHeading>
				<p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[--text-gray] lg:text-lg">
					{t("contact.message")}
				</p>

				<a
					href={`${WHATSAPP_URL}?text=${encodeURIComponent(
						t("contact.whatsapp.message"),
					)}`}
					target="_blank"
					rel="noopener noreferrer"
					className="btn__primary mt-8 inline-flex items-center justify-center"
					onClick={() =>
						trackEvent("Contact", {
							method: "whatsapp",
							source: "contact_section_primary",
						})
					}
				>
					{t("contact.whatsapp_cta")}
				</a>

				<ul className="mt-10 flex items-center justify-center gap-3">
					{socials.map((s) => (
						<li key={s.key}>
							<a
								href={s.url}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={t(`contact.social.${s.key}`)}
								onClick={() => {
									if (s.key === "whatsapp") {
										trackEvent("Contact", {
											method: "whatsapp",
											source: "contact_section",
										});
									}
								}}
								className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-[--border-color] text-2xl text-[--text-color] transition-colors duration-300 ${s.hoverColor} hover:border-[--text-color]`}
							>
								<Icon icon={s.icon} />
							</a>
						</li>
					))}
				</ul>
			</div>

			<div className="border-t border-[--border-color]">
				<div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-[--text-gray] sm:flex-row">
					<p>© {year} EYB</p>
					<a
						href={`mailto:${SUPPORT_EMAIL}`}
						className="transition-colors duration-300 hover:text-[--text-color]"
					>
						{SUPPORT_EMAIL}
					</a>
				</div>
			</div>
		</section>
	);
}
