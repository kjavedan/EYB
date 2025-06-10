"use client";

import { Icon } from "@iconify/react";
import Underline from "@/components/ui/icons/underline";
import Arrow from "@/components/ui/icons/arrow";
import CircleIcon from "@/components/ui/icons/circle";
import Button from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const concernsData = [
  {
    id: 1,
    key: "expertise",
    icon: "hugeicons:laptop-programming",
  },
  {
    id: 2,
    key: "security",
    icon: "mdi:security",
  },
  {
    id: 3,
    key: "design",
    icon: "fluent:design-ideas-48-regular",
  },
];

const ConcernItem = ({
  id,
  concernKey,
  icon,
}: {
  id: number;
  concernKey: string;
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
          {t(`concerns.items.${concernKey}.label`)}
        </h4>

        {/* Description */}
        <p className="text-sm xl:text-base text-center text-[--text-gray] mt-2 w-[75%]">
          {t(`concerns.items.${concernKey}.description`)}
        </p>
      </div>
    </div>
  );
};

export default function Concerns() {
  const { t } = useTranslation();

  return (
    <section id="concerns" className="py-20 flex flex-col">
      <div className="w-full">
        {/* Title */}
        <h2 className="text-center text-4xl leading-[50px] lg:text-5xl xl:text-6xl lg:leading-[70px] xl:leading-[90px]">
          {t("concerns.title")}
        </h2>

        {/* Content Section */}
        <div className="relative flex flex-col items-center mt-8 max-w-screen-xl mx-auto grid-wrapper">
          {/* Services */}
          <div className="text-white flex flex-col w-full lg:flex-row relative grid-container">
            {concernsData.map((service, index) => (
              <div key={service.id} className="relative w-full lg:w-1/3">
                {/* Gradient Dividers */}
                {index < concernsData.length - 1 && (
                  <>
                    <div className="absolute bottom-0 start-0 w-full h-[1px] lg:hidden bg-gradient-to-r from-black via-[#5E5E5E] to-black"></div>
                    <div className="hidden lg:block absolute top-0 end-0 h-full w-[1px] bg-gradient-to-b from-black via-[#5E5E5E] to-black"></div>
                  </>
                )}
                {/* Service Item */}
                <ConcernItem
                  id={service.id}
                  concernKey={service.key}
                  icon={service.icon}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Arrow and Underline */}
        <div className="text-xs flex flex-col items-start">
          <Arrow viewBox={"0 0 46 46"} className="ml-56" />
          <div className="w-60 max-w-sm mt-4">
            <p className="inline">
              <span>
                {t("concerns.bottom_text.part1")}{" "}
                <b>{t("concerns.bottom_text.part2")}</b>
              </span>
            </p>
            <Underline viewBox={"0 0 220 11"} />
          </div>
        </div>

        <div className="flex">
          {/* CTA Button */}
          <Button className="lg:mt-[-64px]" />
        </div>
      </div>
    </section>
  );
}
