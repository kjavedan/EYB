import { Icon } from "@iconify/react";

/**
 * Small uppercase eyebrow used at the top of each section on the project
 * detail page (e.g., "AT A GLANCE", "THE RESULTS").
 */
export function SectionTitle({
	icon,
	label,
}: {
	icon?: string;
	label: string;
}) {
	return (
		<div className="flex items-center gap-2 mb-4">
			{icon && (
				<Icon
					icon={icon}
					className="w-5 h-5 text-brand-blue dark:text-brand-violet"
				/>
			)}
			<h2 className="text-sm uppercase tracking-widest font-semibold text-[--text-gray]">
				{label}
			</h2>
		</div>
	);
}
