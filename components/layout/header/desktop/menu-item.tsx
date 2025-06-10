"use client"

import type React from "react"

import { motion } from "framer-motion"

const variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

export const MenuItem = ({ label, link }: { label: string; link: string }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.querySelector(link)
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 1 }} variants={variants}>
      <a className="px-3 py-2 cursor-pointer text-white" href={link} onClick={handleClick}>
        {label}
      </a>
    </motion.li>
  )
}
