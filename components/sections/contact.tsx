"use client";

import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { ContactForm } from "../contact-form";

export default function Contact() {
	const { t } = useTranslation();

	return (
		<section id="contact">
			<div className="w-full flex flex-col items-center gap-10 xl:flex-row xl:items-start xl: justify-center xl:gap-40">
				<div className="text-center xl:text-start">
					<p>{t("contact.subtitle")}</p>
					{/* Title */}
					<h2 className="text-center mt-4 text-4xl leading-[50px] lg:text-5xl xl:text-6xl lg:leading-[70px] xl:leading-[90px]">
						{t("contact.title")}
					</h2>
				</div>

				<div className="flex flex-col items-center w-full xl:w-fit">
					<ContactForm />

					<div className="flex gap-4 text-3xl">
						{/* Instagram Icon */}
						<Icon
							icon={"ri:instagram-fill"}
							className="hover:text-[#E4405F] cursor-pointer transition-colors duration-300"
							onClick={() =>
								window.open(
									"https://www.instagram.com/khaled_javedan",
									"_blank",
								)
							}
							title={t("contact.social.instagram")}
						/>

						{/* WhatsApp Icon */}
						<Icon
							icon={"mingcute:whatsapp-fill"}
							className="hover:text-[#25D366] cursor-pointer transition-colors duration-300"
							onClick={() =>
								window.open("https://wa.me/971502597949", "_blank")
							}
							title={t("contact.social.whatsapp")}
						/>

						{/* LinkedIn Icon */}
						<Icon
							icon={"mage:linkedin"}
							className="hover:text-[#0077B5] cursor-pointer transition-colors duration-300"
							onClick={() =>
								window.open(
									"https://www.linkedin.com/in/khaled-javdan-790b991b3/",
									"_blank",
								)
							}
							title={t("contact.social.linkedin")}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
