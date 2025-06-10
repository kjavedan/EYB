"use client"

import { motion } from "framer-motion"

interface ArrowProps {
  viewBox: string
  className?: string
  [key: string]: any
}

export default function Arrow({ viewBox, ...others }: ArrowProps) {
  return (
    <motion.svg width="46" height="46" viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" {...others}>
      <motion.path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M44.5554 2.06852C41.3955 23.6975 21.9886 34.2033 1.72886 36.5921C1.38096 36.6338 1.13082 36.9496 1.17251 37.2975C1.21419 37.6454 1.53001 37.8955 1.87791 37.8538C22.7052 35.3993 42.5642 24.4862 45.8123 2.25127C45.8636 1.90498 45.6231 1.58273 45.2752 1.53143C44.9289 1.48013 44.6067 1.72063 44.5554 2.06852Z"
        stroke="#344FFF"
        strokeWidth="2"
        strokeDasharray="500"
        strokeDashoffset="500"
        initial={{ strokeDashoffset: 500 }}
        whileInView={{ strokeDashoffset: 0 }}
        transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
      />
      <motion.path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.18363 37.1784C3.08463 36.5195 4.22452 35.7051 4.35117 35.6089C7.78365 33.0021 10.6277 30.0025 13.132 26.4834C13.3356 26.1981 13.2682 25.8005 12.9828 25.5968C12.6975 25.3932 12.2999 25.4606 12.0963 25.746C9.66903 29.1592 6.91153 32.069 3.58166 34.5973C3.38767 34.7448 0.824096 36.574 0.333513 36.9829C0.131509 37.1496 0.0690271 37.3067 0.0578047 37.3452C-0.00953023 37.5472 0.0305375 37.7059 0.0850467 37.8213C0.147572 37.9512 0.303043 38.1404 0.604447 38.2366C0.920279 38.336 1.62252 38.3809 1.79887 38.4065C4.4586 38.8009 7.46143 39.0093 10.1949 39.7661C12.8017 40.4875 15.1664 41.7091 16.6831 44.1572C16.8674 44.4554 17.2602 44.5468 17.5584 44.3624C17.8566 44.1781 17.948 43.7853 17.7637 43.4871C16.0675 40.7504 13.4478 39.3476 10.5347 38.5412C7.81729 37.7893 4.84175 37.5616 2.18363 37.1784Z"
        stroke="#344FFF"
        strokeWidth="2"
        strokeDasharray="500"
        strokeDashoffset="500"
        initial={{ strokeDashoffset: 500 }}
        whileInView={{ strokeDashoffset: 0 }}
        transition={{ duration: 2.5, ease: "easeOut", delay: 0.6 }}
      />
    </motion.svg>
  )
}
