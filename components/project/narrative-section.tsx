import { Icon } from "@iconify/react";

/**
 * "01 — The Challenge" / "02 — What we built" panels on the project detail
 * page. Numbered narrative blocks with a square icon on the left.
 */
export function NarrativeSection({
	number,
	icon,
	heading,
	body,
}: {
	number: string;
	icon: string;
	heading: string;
	body: string;
}) {
	return (
		<section className="mb-20">
			<div className="flex items-start gap-4 lg:gap-6">
				<div className="hidden sm:flex flex-shrink-0 w-14 h-14 rounded-2xl border border-[--border-color] bg-[--text-color]/[0.02] items-center justify-center">
					<Icon
						icon={icon}
						className="w-7 h-7 text-purple-700 dark:text-purple-300"
					/>
				</div>
				<div className="flex-1">
					<div className="flex items-baseline gap-3 mb-3">
						<span className="text-xs font-mono text-[--text-gray]">
							{number}
						</span>
						<h2 className="text-2xl lg:text-3xl font-bold">{heading}</h2>
					</div>
					<p className="text-base lg:text-lg text-[--text-gray] leading-relaxed">
						{body}
					</p>
				</div>
			</div>
		</section>
	);
}
