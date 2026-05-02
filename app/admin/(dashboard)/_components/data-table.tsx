import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { formatDate } from "./format";

export type DataTableColumn<T> = {
	header: React.ReactNode;
	cell: (row: T) => React.ReactNode;
	headerClassName?: string;
	cellClassName?: string;
};

export function DataTable<T>({
	columns,
	rows,
	rowKey,
	emptyLabel,
}: {
	columns: DataTableColumn<T>[];
	rows: T[];
	rowKey: (row: T, index: number) => React.Key;
	emptyLabel: string;
}) {
	return (
		<div className="overflow-hidden rounded-xl border border-[--border-color] bg-[--bg-elevated] [&_tr]:border-[--border-color] [&_tr]:!border-b [&_tbody_tr:last-child]:!border-b-0 [&_thead_tr]:bg-[--bg-color]/40">
			<Table>
				<TableHeader>
					<TableRow>
						{columns.map((col, i) => (
							<TableHead key={i} className={col.headerClassName}>
								{col.header}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{rows.length === 0 ? (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className="py-8 text-center text-sm text-[--text-muted]"
							>
								{emptyLabel}
							</TableCell>
						</TableRow>
					) : (
						rows.map((row, rowIdx) => (
							<TableRow key={rowKey(row, rowIdx)}>
								{columns.map((col, colIdx) => (
									<TableCell key={colIdx} className={col.cellClassName}>
										{col.cell(row)}
									</TableCell>
								))}
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}

// --- Column cell helpers --------------------------------------------------

export function MailtoLink({ email }: { email: string }) {
	return (
		<a href={`mailto:${email}`} className="hover:underline">
			{email}
		</a>
	);
}

export function DateCell({
	value,
	className,
}: {
	value: string;
	className?: string;
}) {
	return (
		<span className={cn("whitespace-nowrap text-[--text-muted]", className)}>
			{formatDate(value)}
		</span>
	);
}
