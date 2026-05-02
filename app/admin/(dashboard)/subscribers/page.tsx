import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { listSubscribers } from "@/lib/repos/admin";

import { DataTableShell } from "../_components/data-table";
import { formatDate, fullName } from "../_components/format";
import { PageHeader } from "../_components/page-header";

export const dynamic = "force-dynamic";

export default async function AdminSubscribersPage() {
	const subscribers = await listSubscribers();

	return (
		<>
			<PageHeader
				title="Newsletter subscribers"
				subtitle="Most recent first"
				count={subscribers.length}
			/>
			<DataTableShell>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[160px]">Subscribed</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{subscribers.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={3}
									className="py-8 text-center text-sm text-[--text-muted]"
								>
									No subscribers yet.
								</TableCell>
							</TableRow>
						) : (
							subscribers.map((s) => (
								<TableRow key={s.id}>
									<TableCell className="whitespace-nowrap text-[--text-muted]">
										{formatDate(s.created_at)}
									</TableCell>
									<TableCell>{fullName(s.first_name, s.last_name)}</TableCell>
									<TableCell>
										<a href={`mailto:${s.email}`} className="hover:underline">
											{s.email}
										</a>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</DataTableShell>
		</>
	);
}
