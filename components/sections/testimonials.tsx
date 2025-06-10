"use client"

import { Icon } from "@iconify/react"
import Button from "@/components/ui/button"
import { useTranslation } from "react-i18next"

const TestimonialsData = [
  {
    id: 1,
    projectType: "Ecommerce (clothing)",
    p1: "I had countless concerns about creating my online store, but Khaled approached each one with expert precision, making the entire process smooth and stress-free.",
    cover: "",
    name: "Peter",
    siteUrl: "https://aiyifen.com",
    domainName: "aiyifen.com",
    address: "Dubai, UAE",
  },
  {
    id: 2,
    projectType: "Ecommerce (lighting)",
    p1: "Developing a comprehensive e-commerce solution from scratch has given me an in-depth understanding of the entire process, from front-end user experiences to back-end functionality.",
    cover: "",
    name: "Adel",
    siteUrl: "https://shop.khaled-javdan.com",
    domainName: "jojooshop.com",
    address: "Dubai, UAE",
  },
  {
    id: 3,
    projectType: "Ecommerce (honey)",
    p1: "I have developed a range of projects, from personal portfolios to complex web games and custom solutions integrating AI and intricate logic.",
    cover: "",
    name: "Mahmood",
    siteUrl: "https://khaled.com",
    domainName: "healthyplus.ae",
    address: "Sharjah, UAE",
  },
]

const TestimonialItem = ({
  id,
  p1,
  projectType,
  name,
  domainName,
  siteUrl,
  address,
}: {
  id: number
  p1: string
  projectType: string
  name: string
  domainName: string
  siteUrl: string
  address: string
}) => (
  <div className="relative h-full p-8 pb-36" key={id}>
    <div className="text-sm font-medium">{projectType}</div>

    <div className="mt-1">
      {/* Icon */}
      <div className="flex gap-1">
        <Icon icon={"line-md:star-filled"} color="#FFA629" fontSize={"20px"} />
        <Icon icon={"line-md:star-filled"} color="#FFA629" fontSize={"20px"} />
        <Icon icon={"line-md:star-filled"} color="#FFA629" fontSize={"20px"} />
        <Icon icon={"line-md:star-filled"} color="#FFA629" fontSize={"20px"} />
        <Icon icon={"line-md:star-filled"} color="#FFA629" fontSize={"20px"} />
      </div>
      {/* Description */}
      <p className="text-sm lg:text-base text-[--text-gray] mt-4 leading-relaxed">{p1}</p>

      <div className="flex items-center gap-2 text-xl absolute bottom-10">
        <h4 className="font-semibold">{name}</h4>
        <span>|</span>
        <a
          href={siteUrl}
          className="text-[--secondary-color] hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {domainName}
        </a>
      </div>
      <span className="text-xs text-[--text-gray] absolute bottom-6">{address}</span>
    </div>
  </div>
)

export default function Testimonials() {
  const { t } = useTranslation()
  return (
    <section id="Testimonials" className="pb-20 flex flex-col">
      <h2 className="text-center text-4xl leading-[50px] lg:text-5xl xl:text-6xl lg:leading-[70px] xl:leading-[90px]">
        {t("testimonials.title")}
      </h2>

      {/* Gradient Border Wrapper */}
      <div className="relative flex flex-col items-center mt-8 grid-wrapper">
        {/* Flex for Large Screens */}
        <div className=" text-white flex flex-col lg:flex-row relative grid-container">
          {TestimonialsData.map((testimonial, index) => (
            <div key={testimonial.id} className="relative w-full lg:w-1/3">
              {/* Gradient Divider */}
              {index < TestimonialsData.length - 1 && (
                <>
                  {/* Horizontal Divider for Small Screens */}
                  <div className="absolute bottom-0 start-0 w-full h-[1px] lg:hidden bg-gradient-to-r from-black via-[#5E5E5E] to-black"></div>

                  {/* Vertical Divider for Large Screens */}
                  <div className="hidden lg:block absolute top-0 end-0 h-full w-[1px] bg-gradient-to-b from-black via-[#5E5E5E] to-black"></div>
                </>
              )}

              {/* Testimonial Item */}
              <TestimonialItem
                id={testimonial.id}
                p1={testimonial.p1}
                projectType={testimonial.projectType}
                name={testimonial.name}
                domainName={testimonial.domainName}
                siteUrl={testimonial.siteUrl}
                address={testimonial.address}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="pb-8">
        <Button />
      </div>
    </section>
  )
}
