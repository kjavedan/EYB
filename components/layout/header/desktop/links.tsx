"use client"

import { motion } from "framer-motion"
import { useNavConfig } from "../nav-config"
import { MenuItem } from "./menu-item"

const variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function Links() {
  const navConfig = useNavConfig()

  return (
    <motion.ul initial="hidden" animate="visible" variants={variants} className="flex items-center gap-2">
      {navConfig.map((item) => (
        <MenuItem key={item.id} label={item.label} link={item.link} />
      ))}
    </motion.ul>
  )
}
