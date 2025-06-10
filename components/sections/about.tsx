"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";
import Button from "@/components/ui/button";

import khaledSrc from "@/assets/images/khaled.png";
import faizSrc from "@/assets/images/faiz.jpg";
import sajadSrc from "@/assets/images/sajad.jpg";

export default function About() {
  const { t } = useTranslation();

  const teamMembers = [
    {
      id: 1,
      name: t("about.name.faiz"),
      role: t("about.role.faiz"),
      image: faizSrc,
      alt: "Faiz - Digital Marketing Specialist",
    },
    {
      id: 2,
      name: t("about.name.khaled"),
      role: t("about.role.khaled"),
      image: khaledSrc,
      alt: "Khaled Javdan - Professional Web Developer in Dubai, UAE",
    },
    {
      id: 3,
      name: t("about.name.sajad"),
      role: t("about.role.sajad"),
      image: sajadSrc,
      alt: "Sajad - Content Creator and Designer",
    },
  ];

  return (
    <section id="about" aria-labelledby="about-heading">
      <div className="flex flex-col text-center w-full">
        <h2
          id="about-heading"
          className="w-full text-4xl leading-[70px] lg:text-5xl xl:text-6xl lg:leading-[70px] xl:leading-[110px]"
        >
          <span className="block">
            {t("about.title.part1")} {t("about.title.part2")}
          </span>
        </h2>

        {/* Team Images */}
        <div
          className="flex justify-center items-start gap-2 md:gap-8 mt-8"
          role="group"
          aria-label="Team members"
        >
          {teamMembers.map((member) => (
            <article key={member.id} className="flex flex-col items-center">
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.alt}
                width={200}
                height={200}
                className="max-h-28 max-w-28 lg:max-w-52 lg:max-h-52 rounded-full object-cover"
                priority={member.id === 1}
                loading={member.id === 1 ? "eager" : "lazy"}
              />
              <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
              <p className="text-sm mt-2 text-[--text-gray] max-w-60">
                {member.role}
              </p>
            </article>
          ))}
        </div>

        {/* Description */}
        <div className="mt-8 text-[--text-gray] text-center max-w-4xl mx-auto">
          <p className="xl:leading-9">{t("about.description.part1")}</p>
          <Button />
        </div>
      </div>
    </section>
  );
}
