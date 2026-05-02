export function fullName(first: string, last: string | null): string {
	return [first, last].filter(Boolean).join(" ");
}

export function formatDate(value: string): string {
	const d = new Date(value);
	if (Number.isNaN(d.getTime())) return value;
	return d.toLocaleString("en-US", {
		dateStyle: "medium",
		timeStyle: "short",
	});
}
