"use client";

import Button from "@/components/ui/button";
import ArrowDown from "@/components/ui/icons/arrow-down";
import CircleIcon from "@/components/ui/icons/circle";
import { useTranslation } from "react-i18next";

function WorkProcessItem({
  number,
  stepKey,
}: {
  number: number;
  stepKey: string;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex items-start gap-6">
      <div className="flex-shrink-0">
        <CircleIcon number={number} className="w-20 h-16" />
      </div>
      <div className="min-h-[130px] flex-1">
        <h4 className="text-xl">{t(`workProcess.steps.${stepKey}.title`)}</h4>
        <p className="text-[--text-gray] mt-3 leading-tight pb-8">
          {t(`workProcess.steps.${stepKey}.description`)}
        </p>
      </div>
    </div>
  );
}

export default function WorkProcess() {
  const { t } = useTranslation();

  const steps = [
    {
      number: 1,
      key: "meeting",
    },
    {
      number: 2,
      key: "goals",
    },
    {
      number: 3,
      key: "design",
    },
    {
      number: 4,
      key: "develop",
    },
    {
      number: 5,
      key: "training",
    },
    {
      number: 6,
      key: "launch",
    },
  ];

  return (
    <section id="services" className="pb-20 flex flex-col">
      <h2 className="text-left text-4xl leading-[50px] lg:text-5xl xl:text-6xl lg:leading-[70px] xl:leading-[90px]">
        {t("workProcess.title")}
      </h2>
      <div className="w-full mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-12">
        {steps.map((step, index) => (
          <div key={step.number} className="relative">
            <WorkProcessItem number={step.number} stepKey={step.key} />
            {/* Show arrow only between steps */}
            {index < steps.length - 1 && (
              <ArrowDown className="absolute top-[50%] ms-4 lg:hidden" />
            )}
          </div>
        ))}
      </div>
      <Button />
    </section>
  );
}
