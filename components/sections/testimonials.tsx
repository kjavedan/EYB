"use client"

import { Icon } from "@iconify/react"
import Button from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import { AnimatedTestimonials } from "../ui/animated-testimonials"

const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      projectType: "Ecommerce",
      domainName: "aiyifen.com",
      siteUrl: "https://aiyifen.com",
      address: "Dubai, UAE"
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      projectType: "Ecommerce",
      domainName: "jojooshop.com",
      siteUrl: "https://shop.khaled-javdan.com",
      address: "Dubai, UAE"
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      projectType: "Ecommerce",
      domainName: "healthyplus.ae",
      siteUrl: "https://khaled.com",
      address: "Sharjah, UAE"
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      projectType: "Ecommerce",
      domainName: "aiyifen.com",
      siteUrl: "https://aiyifen.com",
      address: "Dubai, UAE"
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      projectType: "Ecommerce",
      domainName: "aiyifen.com",
      siteUrl: "https://aiyifen.com",
      address: "Dubai, UAE"
    },
  ];


export default function Testimonials() {
  const { t } = useTranslation()
  return (
    <section id="Testimonials" className="pb-20 flex flex-col">
      <h2 className="text-center text-4xl leading-[50px] lg:text-5xl xl:text-6xl lg:leading-[70px] xl:leading-[90px]">
        {t("testimonials.title")}
      </h2>
      <AnimatedTestimonials testimonials={testimonials}/>
      <Button />
    </section>
  )
}
