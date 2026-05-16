import type { ComponentType } from "react";

import { AiyifenPreview } from "./aiyifen-preview";
import { AlphaPreview } from "./alpha-preview";
import { ChikricePreview } from "./chikrice-preview";
import { HealthyplusPreview } from "./healthyplus-preview";
import { JojooshopPreview } from "./jojooshop-preview";
import { ResumeMakerPreview } from "./resume-maker-preview";
import { StreakPreview } from "./streak-preview";

export const previewBySlug: Record<string, ComponentType | undefined> = {
	alpha: AlphaPreview,
	streak: StreakPreview,
	jojooshop: JojooshopPreview,
	chikrice: ChikricePreview,
	"resume-maker": ResumeMakerPreview,
	healthyplus: HealthyplusPreview,
	aiyifen: AiyifenPreview,
};
