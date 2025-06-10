"use client"

import type React from "react"

import { motion } from "framer-motion"

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}

export const MenuItem = ({
  label,
  link,
  toggleOpen,
}: {
  label: string
  link: string
  toggleOpen: () => void
}) => {
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault()
    toggleOpen()
    setTimeout(() => {
      const target = document.querySelector(link)
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
      }
    }, 500)
  }

  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 1.01 }}
      transition={{
        duration: 0.2,
      }}
      className="h-20"
    >
      <div className="h-full w-full text-4xl pl-8 capitalize flex font-bold items-center rounded-3xl bg-[--clr-gray] cursor-pointer">
        <a href={link} onClick={handleClick} className="text-black font-300">
          {label}
        </a>
      </div>
    </motion.li>
  )
}
