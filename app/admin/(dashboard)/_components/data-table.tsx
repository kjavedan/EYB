/**
 * Wrapper that scopes the shadcn Table border color to the theme's
 * `--border-color` token instead of Tailwind's default gray-200, which reads
 * as bright white in dark mode.
 */
export function DataTableShell({ children }: { children: React.ReactNode }) {
	return (
		<div className="overflow-hidden rounded-xl border border-[--border-color] bg-[--bg-elevated] [&_tr]:border-[--border-color] [&_tr]:!border-b [&_tbody_tr:last-child]:!border-b-0 [&_thead_tr]:bg-[--bg-color]/40">
			{children}
		</div>
	);
}
