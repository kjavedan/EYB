"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import Button from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const FAQItem = ({
	question,
	answer,
}: {
	question: string;
	answer: string;
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="relative w-full">
			<div
				className="relative py-8 cursor-pointer w-full"
				onClick={() => setIsOpen(!isOpen)}
			>
				{/* Question */}
				<div className="relative flex justify-between gap-4 items-center ">
					<h4 className="text-xl text-white">{question}</h4>
					<motion.div
						className="ms-2"
						animate={{ rotate: isOpen ? 45 : 0 }}
						transition={{ duration: 0.2 }}
					>
						<Icon icon="mdi:plus" className="text-white text-2xl" />
					</motion.div>
				</div>

				{/* Answer with smooth collapse */}
				<AnimatePresence>
					{isOpen && (
						<motion.div
							className="overflow-hidden text-[--text-gray]"
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.2, ease: "easeInOut" }}
						>
							<p className="mt-2">{answer}</p>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			<div className="w-full h-[1px] bg-gradient-to-r from-black via-[#5E5E5E] to-black"></div>
		</div>
	);
};

export default function FAQs() {
	const { t } = useTranslation();
	const faqKeys = [
		"starter_example",
		"development_time",
		"support",
		"customization",
		"training",
		"pricing",
		"platforms",
		"design_approach",
		"post_launch",
		"ecommerce",
		"process",
		"integrations",
		"mobile_friendly",
	];

	return (
		<section id="faqs" className="bg-black">
			<div className="w-full">
				{/* Title */}
				<h2 className="text-center text-4xl leading-[50px] lg:text-5xl xl:text-6xl lg:leading-[70px] xl:leading-[90px]">
					{t("faq.title")}
				</h2>

				{/* FAQ Items */}
				<div className="mt-8 w-full max-w-4xl mx-auto text-start">
					{faqKeys.map((key) => (
						<FAQItem
							key={key}
							question={t(`faq.questions.${key}.question`)}
							answer={t(`faq.questions.${key}.answer`)}
						/>
					))}
				</div>

				{/* Search Button */}
				<div className="flex">
					<Button />
				</div>
			</div>
		</section>
	);
}
