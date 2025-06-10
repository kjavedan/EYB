"use client"

import { Icon } from "@iconify/react"
import Underline from "@/components/ui/icons/underline"
import { useTranslation } from "react-i18next"

export default function Contact() {
  const { t } = useTranslation()

  return (
    <section id="contact">
      <div className="w-full flex flex-col items-center gap-10">
        <p>{t("contact.subtitle")}</p>
        {/* Title */}
        <h2 className="text-center text-4xl font-semibold text-white leading-[50px] lg:text-5xl lg:leading-[70px]">
          {t("contact.title")}
        </h2>

        <div>
          <a
            href="mailto:devkhaledjavdan@gmail.com"
            className="color-[--secondary-color] text-2xl underline-none decoration-none"
          >
            {t("contact.email")}
            <Underline viewBox={"0 0 200 30"} />
          </a>
        </div>

        <div className="flex flex-col gap-3 items-center">
          <p className="text-[--text-gray]">{t("contact.message")}</p>

          <div className="flex gap-4 text-3xl">
            {/* Instagram Icon */}
            <Icon
              icon={"ri:instagram-fill"}
              className="hover:text-[#E4405F] cursor-pointer transition-colors duration-300"
              onClick={() => window.open("https://www.instagram.com/khaled_javedan", "_blank")}
              title={t("contact.social.instagram")}
            />

            {/* WhatsApp Icon */}
            <Icon
              icon={"mingcute:whatsapp-fill"}
              className="hover:text-[#25D366] cursor-pointer transition-colors duration-300"
              onClick={() => window.open("https://wa.me/971502597949", "_blank")}
              title={t("contact.social.whatsapp")}
            />

            {/* LinkedIn Icon */}
            <Icon
              icon={"mage:linkedin"}
              className="hover:text-[#0077B5] cursor-pointer transition-colors duration-300"
              onClick={() => window.open("https://www.linkedin.com/in/khaled-javdan-790b991b3/", "_blank")}
              title={t("contact.social.linkedin")}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
