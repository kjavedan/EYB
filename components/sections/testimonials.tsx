"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { SectionHeading } from "@/components/section-heading";
import Button from "@/components/ui/button";
import { projects } from "@/lib/projects";

const COLS = 3;

export default function Testimonials() {
	const { t } = useTranslation();

	const lastRowStart = Math.floor((projects.length - 1) / COLS) * COLS;

	return (
		<section id="Testimonials" className="pb-20 flex flex-col">
			<SectionHeading>{t("testimonials.title")}</SectionHeading>

			<div className="relative flex flex-col w-full items-center mt-12 max-w-screen-xl mx-auto grid-wrapper">
				<div className="text-[--text-color] grid grid-cols-1 lg:grid-cols-3 w-full relative grid-container">
					{projects.map((project, index) => {
						const name = t(`testimonials.items.${project.slug}.name`);
						const designation = t(
							`testimonials.items.${project.slug}.designation`,
						);
						const address = t(`testimonials.items.${project.slug}.address`);
						const quote = t(`testimonials.items.${project.slug}.quote`);

						const isLastItem = index === projects.length - 1;
						const isLastInRow = (index + 1) % COLS === 0 || isLastItem;
						const isInLastRow = index >= lastRowStart;

						return (
							<div key={project.slug} className="relative">
								{/* Mobile horizontal divider — between stacked items */}
								{!isLastItem && (
									<div className="absolute bottom-0 start-0 w-full h-[1px] lg:hidden bg-gradient-to-r from-[--bg-color] via-[--border-color] to-[--bg-color]" />
								)}
								{/* Desktop vertical divider — between columns in same row */}
								{!isLastInRow && (
									<div className="hidden lg:block absolute top-0 end-0 h-full w-[1px] bg-gradient-to-b from-[--bg-color] via-[--border-color] to-[--bg-color]" />
								)}
								{/* Desktop horizontal divider — between rows */}
								{!isInLastRow && (
									<div className="hidden lg:block absolute bottom-0 start-0 w-full h-[1px] bg-gradient-to-r from-[--bg-color] via-[--border-color] to-[--bg-color]" />
								)}

								<Link
									href={`/projects/${project.slug}`}
									className="group flex flex-col h-full p-6 lg:p-8 gap-4"
								>
									<div className="relative aspect-[16/10] overflow-hidden bg-[--bg-elevated]">
										<Image
											src={project.image}
											alt={project.domainName}
											fill
											className="object-cover transition-transform duration-500 group-hover:scale-105"
											sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
										/>
										<div className="absolute top-3 left-3 px-3 py-1 bg-[--bg-color]/60 backdrop-blur-sm border border-[--text-color]/20 rounded-full">
											<span className="text-xs font-semibold text-[--text-color]">
												{project.projectType}
											</span>
										</div>
									</div>

									<div>
										<h3 className="text-lg font-semibold text-[--text-color]">
											{project.domainName}
										</h3>
										<p className="text-xs text-[--text-gray] mt-0.5">
											{name} · {designation} · {address}
										</p>
									</div>

									<p className="text-sm text-[--text-gray] line-clamp-3 leading-relaxed">
										“{quote}”
									</p>

									<div className="mt-auto flex items-center gap-1 text-sm font-medium text-[--text-color]/70 group-hover:text-[--text-color] transition-colors">
										<span>
											{t("testimonials.view_project", {
												defaultValue: "View project",
											})}
										</span>
										<Icon
											icon="mdi:arrow-right"
											className="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-1"
										/>
									</div>
								</Link>
							</div>
						);
					})}
				</div>
			</div>

			<Button className="mt-20" />
		</section>
	);
}
