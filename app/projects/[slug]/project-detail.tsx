"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

import { getProjectBySlug } from "@/lib/projects";

export default function ProjectDetail({ slug }: { slug: string }) {
	const { t } = useTranslation();
	const project = getProjectBySlug(slug);

	if (!project) return null;

	const name = t(`testimonials.items.${project.i18nKey}.name`);
	const designation = t(`testimonials.items.${project.i18nKey}.designation`);
	const address = t(`testimonials.items.${project.i18nKey}.address`);
	const quote = t(`testimonials.items.${project.i18nKey}.quote`);
	const description = t(`testimonials.items.${project.i18nKey}.description`, {
		defaultValue: "",
	});

	return (
		<main className="min-h-screen text-white">
			<div className="max-w-screen-lg mx-auto px-4 py-12 lg:py-20">
				<Link
					href="/#Testimonials"
					className="inline-flex items-center gap-2 text-sm text-[--text-gray] hover:text-white transition-colors mb-8"
				>
					<Icon
						icon="mdi:arrow-left"
						className="w-4 h-4 rtl:rotate-180"
					/>
					<span>
						{t("project_detail.back", { defaultValue: "Back to projects" })}
					</span>
				</Link>

				<div className="flex flex-wrap items-center gap-3 mb-4">
					<span className="px-3 py-1 bg-purple-500/15 border border-purple-400/30 rounded-full text-xs font-semibold text-purple-200">
						{project.projectType}
					</span>
					<span className="text-sm text-[--text-gray]">
						{project.domainName}
					</span>
				</div>

				<h1 className="text-4xl lg:text-5xl font-bold mb-4">
					{project.domainName}
				</h1>

				<p className="text-[--text-gray] mb-8">
					{name} · {designation} · {address}
				</p>

				<div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 mb-10">
					<Image
						src={project.image}
						alt={project.domainName}
						fill
						className="object-cover"
						priority
						sizes="(max-width: 1024px) 100vw, 1024px"
					/>
				</div>

				<blockquote className="border-s-2 border-purple-400/40 ps-6 mb-10">
					<p className="text-xl lg:text-2xl italic text-white leading-relaxed">
						“{quote}”
					</p>
					<footer className="mt-3 text-sm text-[--text-gray]">
						— {name}, {designation}
					</footer>
				</blockquote>

				{description && (
					<div className="prose prose-invert max-w-none mb-10">
						<p className="text-base lg:text-lg text-[--text-gray] leading-relaxed whitespace-pre-line">
							{description}
						</p>
					</div>
				)}

				<a
					href={project.siteUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-colors"
				>
					<span>
						{t("project_detail.visit_site", {
							defaultValue: "Visit live site",
						})}
					</span>
					<Icon
						icon="mdi:open-in-new"
						className="w-4 h-4"
					/>
				</a>
			</div>
		</main>
	);
}
