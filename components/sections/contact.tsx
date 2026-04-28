"use client";

import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

import { INSTAGRAM_URL, LINKEDIN_URL, WHATSAPP_URL } from "@/lib/config";
import { ContactForm } from "../contact-form";
import { SectionHeading } from "../section-heading";

export default function Contact() {
	const { t } = useTranslation();

	return (
		<section id="contact" className="mt-40 pb-20">
			<div className="w-full flex flex-col items-center gap-10 xl:flex-row xl:items-start xl: justify-center xl:gap-40">
				<div className="text-center xl:text-start">
					<p>{t("contact.subtitle")}</p>
					{/* Title */}
					<SectionHeading className="mt-4">{t("contact.title")}</SectionHeading>
				</div>

				<div className="flex flex-col items-center w-full xl:w-fit">
					<ContactForm />

					<div className="flex gap-4 text-3xl">
						{/* Instagram Icon */}
						<Icon
							icon={"ri:instagram-fill"}
							className="hover:text-[#E4405F] cursor-pointer transition-colors duration-300"
							onClick={() => window.open(INSTAGRAM_URL, "_blank")}
						/>

						{/* WhatsApp Icon */}
						<Icon
							icon={"mingcute:whatsapp-fill"}
							className="hover:text-[#25D366] cursor-pointer transition-colors duration-300"
							onClick={() => window.open(WHATSAPP_URL, "_blank")}
						/>

						{/* LinkedIn Icon */}
						<Icon
							icon={"mage:linkedin"}
							className="hover:text-[#0077B5] cursor-pointer transition-colors duration-300"
							onClick={() => window.open(LINKEDIN_URL, "_blank")}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
