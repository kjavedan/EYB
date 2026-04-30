"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { NarrativeSection } from "@/components/project/narrative-section";
import { ScreenshotsCarousel } from "@/components/project/screenshots-carousel";
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

	const tField = (key: string, fallback: string) =>
		t(`projects.${project.slug}.${key}`, { defaultValue: fallback });

	const projectType = tField("projectType", project.projectType);
	const summary = tField("summary", project.summary);
	const challenge = tField("challenge", project.challenge);
	const solution = tField("solution", project.solution);
	const timeline = tField("timeline", project.timeline);
	const year = tField("year", project.year);
	const services = project.services.map((s, i) => tField(`services.${i}`, s));
	const processSteps = project.process.map((step, i) => ({
		phase: tField(`process.${i}.phase`, step.phase),
		description: tField(`process.${i}.description`, step.description),
		duration: tField(`process.${i}.duration`, step.duration),
	}));
	const resultsItems = project.results.map((r, i) => ({
		value: tField(`results.${i}.value`, r.value),
		label: tField(`results.${i}.label`, r.label),
	}));

	return (
		<main className="min-h-screen text-[--text-color] pt-16">
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
					<span className="px-3 py-1 bg-brand-violet/15 border border-brand-violet/30 rounded-full text-xs font-semibold text-brand-blue dark:text-brand-violet">
						{projectType}
					</span>
					<span className="text-sm text-[--text-gray]">
						{project.domainName}
					</span>
				</div>

				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-3">
					<h1 className="text-4xl lg:text-5xl font-bold !mx-0">
						{project.domainName}
					</h1>
					<a
						href={project.siteUrl || "#"}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 px-6 py-3 bg-[--button-bg] text-[--button-text] rounded-full font-semibold hover:opacity-90 transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
					>
						<span>
							{t("project_detail.visit_site", {
								defaultValue: "Visit live site",
							})}
						</span>
						<Icon icon="mdi:open-in-new" className="w-4 h-4" />
					</a>
				</div>

				<p className="text-base lg:text-lg text-[--text-gray] mb-10 max-w-2xl leading-relaxed">
					{summary}
				</p>

				{project.videoUrl && (
					<div
						className={`relative aspect-[16/9] rounded-2xl overflow-hidden border border-[--border-color] bg-[--bg-elevated] ${
							project.screenshots?.length ? "mb-6" : "mb-20"
						}`}
					>
						<video
							src={project.videoUrl}
							poster={project.videoPoster}
							controls
							playsInline
							preload="metadata"
							className="absolute inset-0 w-full h-full object-cover"
						/>
					</div>
				)}

				{project.screenshots && project.screenshots.length > 0 && (
					<div className="mb-20">
						<ScreenshotsCarousel images={project.screenshots} />
					</div>
				)}

				{/* At-a-glance */}
				<section className="mb-20">
					<SectionTitle label={t("project_detail.at_a_glance")} />
					<StatGrid
						items={[
							{ label: t("project_detail.client_label"), value: name },
							{ label: t("project_detail.year"), value: year },
							{ label: t("project_detail.timeline"), value: timeline },
							{
								label: t("project_detail.services_label"),
								children: (
									<div className="flex flex-wrap gap-1.5">
										{services.map((service, i) => (
											<span
												key={i}
												className="text-xs font-medium px-2.5 py-1 rounded-full border border-[--border-color] bg-[--text-color]/[0.03]"
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
					body={challenge}
				/>

				<NarrativeSection
					number="02"
					icon="mdi:lightbulb-on-outline"
					heading={t("project_detail.solution_heading")}
					body={solution}
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
								className="flex items-center gap-2 px-4 py-2 rounded-full border border-[--border-color] bg-[--text-color]/[0.03]"
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
					<ol className="relative border-s border-[--border-color] ms-3 space-y-8">
						{processSteps.map((step, i) => (
							<li key={i} className="ps-8 relative">
								<span className="absolute -start-[13px] top-0 w-6 h-6 rounded-full bg-brand-violet/20 border border-brand-violet/40 flex items-center justify-center text-xs font-bold text-brand-blue dark:text-brand-violet">
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
						items={resultsItems.map((r) => ({
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
						<blockquote className="border-s-2 border-brand-violet/40 ps-6">
							<p className="text-xl lg:text-2xl italic text-[--text-color] leading-relaxed">
								“{quote}”
							</p>
							<footer className="mt-3 text-sm text-[--text-gray]">
								— {name}, {designation}
							</footer>
						</blockquote>
					</section>
				)}

				{/* CTA */}
				<section className="rounded-2xl border border-[--border-color] bg-[--text-color]/[0.02] p-12 lg:p-20 text-center">
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
