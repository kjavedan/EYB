import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProjectBySlug, projects } from "@/lib/projects";

import ProjectDetail from "./project-detail";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
	return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
	params,
}: { params: Promise<Params> }): Promise<Metadata> {
	const { slug } = await params;
	const project = getProjectBySlug(slug);
	if (!project) return { title: "Project not found" };
	return {
		title: `${project.domainName} — EYB`,
		description: `Case study: ${project.domainName} (${project.projectType})`,
	};
}

export default async function ProjectPage({
	params,
}: { params: Promise<Params> }) {
	const { slug } = await params;
	const project = getProjectBySlug(slug);
	if (!project) notFound();

	return <ProjectDetail slug={project.slug} />;
}
