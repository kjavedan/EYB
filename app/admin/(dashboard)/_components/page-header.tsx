export function PageHeader({
	title,
	subtitle,
	count,
}: {
	title: string;
	subtitle: string;
	count: number;
}) {
	return (
		<div className="mb-6 flex items-end justify-between">
			<div>
				<h1 className="text-xl font-semibold">{title}</h1>
				<p className="text-sm text-[--text-muted]">{subtitle}</p>
			</div>
			<span className="text-xs text-[--text-muted]">
				{count} {count === 1 ? "record" : "records"}
			</span>
		</div>
	);
}
