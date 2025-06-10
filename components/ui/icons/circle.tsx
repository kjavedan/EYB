"use client"
import { motion } from "framer-motion"

interface CircleIconProps {
  number: number
  [key: string]: any
}

const CircleIcon = ({ number, ...others }: CircleIconProps) => {
  // Animation variants for the path
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 2, ease: "easeOut" },
    },
  }

  // Animation variants for the text
  const textVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", duration: 0.5, delay: 1.5 },
    },
  }

  return (
    <motion.svg
      width="80"
      height="60"
      viewBox="0 0 70 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      animate="visible"
      {...others}
    >
      {/* Animated Path */}
      <motion.path
        d="M49.0832 6.36734C52.3646 6.5354 54.9729 8.19393 57.5813 10.0563C66.1356 16.172 68.9966 25.6608 63.1348 34.9853C54.0196 49.4453 32.788 58.9091 16.3245 54.5415C12.6784 53.5789 7.74219 52.7305 4.12415 48.0299C0.75853 43.6593 0.898764 38.4634 2.44134 33.6531C4.01196 28.7211 7.04102 24.1818 9.45305 21.264C19.9987 8.5334 41.1179 -3.03695 60.2178 3.06284C60.6105 3.18037 61.0032 2.97826 61.1154 2.61143C61.2275 2.24461 61.0311 1.85126 60.6664 1.73373C41.0056 -4.54389 19.2132 7.27491 8.35911 20.3765C5.3581 24.0149 1.43176 30.0884 0.30989 36.3725C-0.447374 40.6675 0.0854062 45.0579 3.00228 48.8772C6.84469 53.8843 12.0895 54.865 15.96 55.8901C32.9563 60.4012 54.9168 50.6608 64.3125 35.7265C70.6231 25.7044 67.5941 15.4958 58.3948 8.92228C55.5901 6.90167 52.7292 5.15548 49.1672 4.97346C48.7746 4.95364 48.4381 5.24984 48.4381 5.63453C48.4101 6.01922 48.7186 6.34752 49.0832 6.36734Z"
        fill="none"
        stroke="white"
        strokeWidth="1"
        variants={pathVariants}
      />
      {/* Center Number */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="16"
        fontWeight="bold"
        variants={textVariants}
      >
        {number}
      </motion.text>
    </motion.svg>
  )
}

export default CircleIcon
