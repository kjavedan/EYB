"use client";

import type React from "react";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { SCHEDULING_URL } from "@/lib/config";
import { trackEvent } from "@/lib/meta-pixel";

interface ButtonProps {
	text?: string;
	className?: string;
	disabled?: boolean;
	children?: React.ReactNode;
	[key: string]: any;
}

export default function Button({
	text = "start_now",
	className,
	disabled,
	children,
	...others
}: ButtonProps) {
	const { t } = useTranslation();

	const handleClick = () => {
		trackEvent("Schedule", { source: "primary_cta" });
		window.open(SCHEDULING_URL, "_blank");
	};

	return (
		<motion.button
			whileHover={{ scale: disabled ? 1 : 1.05 }}
			onClick={handleClick}
			className={`btn__primary mx-auto mt-8 ${className} disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#4A5568]`}
			disabled={disabled}
			{...others}
		>
			{children || t(`buttons.${text}`)}
		</motion.button>
	);
}
