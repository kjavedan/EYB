"use client"

import { motion } from "framer-motion"

interface UnderlineProps {
  viewBox: string
  className?: string
  [key: string]: any
}

export default function Underline({ viewBox, ...others }: UnderlineProps) {
  return (
    <svg
      id="path-svg"
      className="underline-svg block mt-2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      {...others}
    >
      <motion.path
        d="M-13.1345 8.52868C-13.1345 8.52868 80.6236 -5.21228 177.345 3.23635C277.003 11.9415 109 -5 38.8533 9.65386"
        fill="none"
        stroke="#344FFF"
        strokeWidth="2"
        strokeDasharray="500"
        strokeDashoffset="500"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ strokeDashoffset: 500 }}
        whileInView={{ strokeDashoffset: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </svg>
  )
}
