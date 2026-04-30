"use client";

import { SectionHeading } from "@/components/section-heading";
import Button from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
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
			<button
				type="button"
				className="relative py-8 cursor-pointer w-full text-start bg-transparent border-0 p-0"
				onClick={() => setIsOpen(!isOpen)}
			>
				{/* Question */}
				<div className="relative flex justify-between gap-4 items-center ">
					<h4 className="text-xl text-[--text-color]">{question}</h4>
					<motion.div
						className="ms-2"
						animate={{ rotate: isOpen ? 45 : 0 }}
						transition={{ duration: 0.2 }}
					>
						<Icon icon="mdi:plus" className="text-[--text-color] text-2xl" />
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
			</button>
			<div className="w-full h-[1px] bg-gradient-to-r from-[--bg-color] via-[--border-color] to-[--bg-color]" />
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
		"design_approach",
		"post_launch",
		"ecommerce",
		"process",
		"integrations",
		"mobile_friendly",
	];

	return (
		<section id="faqs" className="bg-[--bg-color]">
			<div className="w-full">
				{/* Title */}
				<SectionHeading>{t("faq.title")}</SectionHeading>

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
