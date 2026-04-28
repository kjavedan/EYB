"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { NarrativeSection } from "@/components/project/narrative-section";
import { SectionTitle } from "@/components/project/section-title";
import { StatGrid } from "@/components/project/stat-grid";
import { SCHEDULING_URL } from "@/lib/config";
import { getProjectBySlug } from "@/lib/projects";

export default function ProjectDetail({ slug }: { slug: string }) {
	const { t } = useTranslation();
	const project = getProjectBySlug(slug);

	if (!project) return null;

	const tk = (key: string) => t(`testimonials.items.${project.slug}.${key}`);
	const name = tk("name");
	const designation = tk("designation");
	const address = tk("address");
	const quote = tk("quote");

	return (
		<main className="min-h-screen text-[--text-color]">
			<div className="max-w-screen-lg mx-auto px-4 py-12 lg:py-20">
				<Link
					href="/#Testimonials"
					className="inline-flex items-center gap-2 text-sm text-[--text-gray] hover:text-[--text-color] transition-colors mb-8"
				>
					<Icon icon="mdi:arrow-left" className="w-4 h-4 rtl:rotate-180" />
					<span>
						{t("project_detail.back", { defaultValue: "Back to projects" })}
					</span>
				</Link>

				{/* Header */}
				<div className="flex flex-wrap items-center gap-3 mb-4">
					<span className="px-3 py-1 bg-purple-500/15 border border-purple-400/30 rounded-full text-xs font-semibold text-purple-700 dark:text-purple-200">
						{project.projectType}
					</span>
					<span className="text-sm text-[--text-gray]">
						{project.domainName}
					</span>
				</div>

				<h1 className="text-4xl lg:text-5xl font-bold mb-3">
					{project.domainName}
				</h1>

				<p className="text-base lg:text-lg text-[--text-gray] mb-10 max-w-2xl leading-relaxed">
					{project.summary}
				</p>

				<div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-[--text-color]/10 mb-20">
					<Image
						src={project.image}
						alt={project.domainName}
						fill
						className="object-cover"
						priority
						sizes="(max-width: 1024px) 100vw, 1024px"
					/>
				</div>

				{/* At-a-glance */}
				<section className="mb-20">
					<SectionTitle label={t("project_detail.at_a_glance")} />
					<StatGrid
						items={[
							{ label: t("project_detail.client_label"), value: name },
							{ label: t("project_detail.year"), value: project.year },
							{ label: t("project_detail.timeline"), value: project.timeline },
							{
								label: t("project_detail.services_label"),
								children: (
									<div className="flex flex-wrap gap-1.5">
										{project.services.map((service) => (
											<span
												key={service}
												className="text-xs font-medium px-2.5 py-1 rounded-full border border-[--text-color]/10 bg-[--text-color]/[0.03]"
											>
												{service}
											</span>
										))}
									</div>
								),
							},
						]}
					/>
					<p className="text-xs text-[--text-gray] mt-3">
						{designation} · {address}
					</p>
				</section>

				<NarrativeSection
					number="01"
					icon="mdi:alert-octagon-outline"
					heading={t("project_detail.challenge_heading")}
					body={project.challenge}
				/>

				<NarrativeSection
					number="02"
					icon="mdi:lightbulb-on-outline"
					heading={t("project_detail.solution_heading")}
					body={project.solution}
				/>

				{/* Tech stack */}
				<section className="mb-20">
					<SectionTitle
						icon="mdi:code-tags"
						label={t("project_detail.tech_heading")}
					/>
					<div className="flex flex-wrap gap-3">
						{project.techStack.map((tech) => (
							<div
								key={tech.name}
								className="flex items-center gap-2 px-4 py-2 rounded-full border border-[--text-color]/10 bg-[--text-color]/[0.03]"
							>
								<Icon icon={tech.icon} className="w-5 h-5" />
								<span className="text-sm font-medium">{tech.name}</span>
							</div>
						))}
					</div>
				</section>

				{/* Process / Timeline */}
				<section className="mb-20">
					<SectionTitle
						icon="mdi:timeline-outline"
						label={t("project_detail.process_heading")}
					/>
					<ol className="relative border-s border-[--text-color]/10 ms-3 space-y-8">
						{project.process.map((step, i) => (
							<li key={i} className="ps-8 relative">
								<span className="absolute -start-[13px] top-0 w-6 h-6 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-xs font-bold text-purple-700 dark:text-purple-200">
									{i + 1}
								</span>
								<div className="flex flex-wrap items-baseline gap-3 mb-1">
									<h3 className="text-lg font-semibold">{step.phase}</h3>
									<span className="text-xs text-[--text-gray]">
										{step.duration}
									</span>
								</div>
								<p className="text-sm text-[--text-gray] leading-relaxed">
									{step.description}
								</p>
							</li>
						))}
					</ol>
				</section>

				{/* Results */}
				<section className="mb-20">
					<SectionTitle
						icon="mdi:chart-line"
						label={t("project_detail.results_heading")}
					/>
					<StatGrid
						items={project.results.map((r) => ({
							label: r.label,
							value: r.value,
							emphasis: "metric",
						}))}
					/>
				</section>

				{/* Quote */}
				{quote && (
					<section className="mb-20">
						<SectionTitle
							icon="mdi:format-quote-open"
							label={t("project_detail.quote_heading")}
						/>
						<blockquote className="border-s-2 border-purple-400/40 ps-6">
							<p className="text-xl lg:text-2xl italic text-[--text-color] leading-relaxed">
								“{quote}”
							</p>
							<footer className="mt-3 text-sm text-[--text-gray]">
								— {name}, {designation}
							</footer>
						</blockquote>
					</section>
				)}

				<a
					href={project.siteUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-2 px-6 py-3 bg-[--button-bg] text-[--button-text] rounded-full font-semibold hover:opacity-90 transition-colors mb-20"
				>
					<span>
						{t("project_detail.visit_site", {
							defaultValue: "Visit live site",
						})}
					</span>
					<Icon icon="mdi:open-in-new" className="w-4 h-4" />
				</a>

				{/* CTA */}
				<section className="rounded-2xl border border-[--text-color]/10 bg-[--text-color]/[0.02] p-12 lg:p-20 text-center">
					<h2 className="text-2xl lg:text-3xl font-bold mb-3">
						{t("project_detail.cta_heading")}
					</h2>
					<p className="text-base text-[--text-gray] max-w-xl mx-auto mb-6 leading-relaxed">
						{t("project_detail.cta_body")}
					</p>
					<a
						href={SCHEDULING_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 px-6 py-3 bg-[--button-bg] text-[--button-text] rounded-full font-semibold hover:opacity-90 transition-colors"
					>
						<span>{t("project_detail.cta_button")}</span>
						<Icon icon="mdi:arrow-right" className="w-4 h-4 rtl:rotate-180" />
					</a>
				</section>
			</div>
		</main>
	);
}
