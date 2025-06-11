"use client"

import { motion } from "framer-motion"
import NavMobile from "./mobile"
import NavDesktop from "./desktop"
import { useResponsive } from "@/hooks/use-responsive"

export function Header() {
  const { isDesktop } = useResponsive()

  return (
    <header
      style={{ direction: "ltr" }}
      className="bg-[--bg-color] fixed top-0 z-20 w-full z-1 flex items-center justify-between after:content-[''] container"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.7, y: 0 }}
        className="flex flex-col cursor-pointer"
      />
      {isDesktop ? <NavDesktop /> : <NavMobile />}
    </header>
  )
}
