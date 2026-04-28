import type { ReactNode } from "react";

/**
 * 2/4-column stat grid with consistent dividers. Used for both the
 * "At a glance" facts and the "Results" metrics on the project detail page.
 *
 * Each cell can render either a simple `{ label, value }` or arbitrary
 * children (for things like the Services pill row).
 */

export type StatItem = {
	label: ReactNode;
	value?: ReactNode;
	children?: ReactNode;
	emphasis?: "default" | "metric";
};

export function StatGrid({ items }: { items: StatItem[] }) {
	return (
		<div className="grid grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden border border-[--text-color]/10 divide-[--text-color]/10 lg:divide-x lg:divide-y-0 max-lg:divide-y max-lg:[&>*:nth-child(odd)]:border-e max-lg:[&>*:nth-child(odd)]:border-[--text-color]/10">
			{items.map((item, i) => (
				<StatCell key={i} {...item} />
			))}
		</div>
	);
}

function StatCell({ label, value, children, emphasis = "default" }: StatItem) {
	const valueClass =
		emphasis === "metric"
			? "text-2xl lg:text-3xl font-bold text-[--text-color]"
			: "text-base lg:text-lg font-semibold text-[--text-color]";

	const labelClass =
		emphasis === "metric"
			? "text-xs text-[--text-gray] leading-snug"
			: "text-xs uppercase tracking-wide text-[--text-gray]";

	if (emphasis === "metric") {
		return (
			<div className="bg-[--bg-color] p-5 lg:p-6 flex flex-col gap-1">
				<span className={valueClass}>{value}</span>
				<span className={labelClass}>{label}</span>
			</div>
		);
	}

	return (
		<div className="bg-[--bg-color] p-5 lg:p-6 flex flex-col gap-2">
			<span className={labelClass}>{label}</span>
			{children ?? <span className={valueClass}>{value}</span>}
		</div>
	);
}
