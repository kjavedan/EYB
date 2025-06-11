"use client"

import Button from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import { AnimatedTestimonials } from "../ui/animated-testimonials"

export default function Testimonials() {
  const { t } = useTranslation()
  
  const testimonials = [
    {
      quote: t("testimonials.items.1.quote"),
      name: t("testimonials.items.1.name"),
      designation: t("testimonials.items.1.designation"),
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      projectType: "Ecommerce",
      domainName: "aiyifen.com",
      siteUrl: "https://aiyifen.com",
      address: t("testimonials.items.1.address")
    },
    {
      quote: t("testimonials.items.2.quote"),
      name: t("testimonials.items.2.name"),
      designation: t("testimonials.items.2.designation"),
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      projectType: "Ecommerce",
      domainName: "jojooshop.com",
      siteUrl: "https://shop.khaled-javdan.com",
      address: t("testimonials.items.2.address")
    },
    {
      quote: t("testimonials.items.3.quote"),
      name: t("testimonials.items.3.name"),
      designation: t("testimonials.items.3.designation"),
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      projectType: "Ecommerce",
      domainName: "healthyplus.ae",
      siteUrl: "https://honey-store-ruddy.vercel.app/",
      address: t("testimonials.items.3.address")
    },
    {
      quote: t("testimonials.items.4.quote"),
      name: t("testimonials.items.4.name"),
      designation: t("testimonials.items.4.designation"),
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      projectType: "Automation",
      domainName: "ibrahim-shop.com",
      siteUrl: "https://mehragan-shop.vercel.app",
      address: t("testimonials.items.4.address")
    }
  ];

  return (
    <section id="Testimonials" className="pb-20 flex flex-col">
      <h2 className="text-center text-4xl leading-[50px] lg:text-5xl xl:text-6xl lg:leading-[70px] xl:leading-[90px]">
        {t("testimonials.title")}
      </h2>
      <AnimatedTestimonials testimonials={testimonials}/>
      <Button className="mt-20"/>
    </section>
  )
}
