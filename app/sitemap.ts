import type { MetadataRoute } from "next";

import { projects } from "@/lib/projects";

const baseUrl = "https://eyb.ae";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		...projects.map((p) => ({
			url: `${baseUrl}/projects/${p.slug}`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.5,
		})),
	];
}
