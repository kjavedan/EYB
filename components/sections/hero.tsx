"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Underline from "@/components/ui/icons/underline";
import Button from "@/components/ui/button";
import ArrowDown from "@/components/ui/icons/arrow-down";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="h-100dvh flex items-center justify-center lg:max-h-[900px] pb-0 pt-0"
    >
      <div className="flex flex-col mt-[-100px] lg:mt-[0px]">
        <h1 className="heading text-center font-[var(--font-primary)] max-w-screen-xl mx-auto text-[45px] leading-[80px] lg:text-5xl lg:leading-[80px] xl:text-8xl xl:leading-[150px] font-900">
          <span className="text-white">
            {t("hero.title.part1", { defaultValue: "We Take Businesses" })}
        </span>
          <span className="store-section relative block mx-2 lg:mr-4">
            <motion.span
              initial={{ rotate: -25 }}
              animate={{ rotate: 0 }}
              transition={{
                type: "spring",
                duration: 2,
                bounce: 0.5,
                damping: 3,
              }}
              whileHover={{
                rotate: [0, -15, 15, -15, 15, 0],
                transition: {
                  duration: 0.5,
                  ease: "easeInOut",
                },
              }}
              style={{ display: "inline-block" }}
            >
              <Icon
                icon="hugeicons:store-04"
                id="store-icon"
                className="lg:w-20 lg:h-20 me-2 text-white"
                aria-label="Online store icon"
              />
            </motion.span>

            <span className="font-black text-white">
              {t("hero.title.part2", { defaultValue: "Online" })}
            </span>

            <Underline
              viewBox={"-25 -5 250 18"}
              className="underline-svg block"
            />
          </span>
        </h1>

        <Button>{t("hero.cta", { defaultValue: "Start now" })}</Button>
        <div className="flex flex-col items-center mt-12">
          <span className="text-[--text-gray]">
            {t("hero.subtitle", { defaultValue: "see if I can help you" })}
          </span>
          <div className="w-fit mt-3">
            <ArrowDown className={"relative"} color={"gray"} />
          </div>
        </div>
      </div>
    </section>
  );
}
