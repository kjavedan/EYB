import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { listContactMessages } from "@/lib/repos/admin";

import { DataTableShell } from "../_components/data-table";
import { formatDate, fullName } from "../_components/format";
import { PageHeader } from "../_components/page-header";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
	const messages = await listContactMessages();

	return (
		<>
			<PageHeader
				title="Contact messages"
				subtitle="Most recent first"
				count={messages.length}
			/>
			<DataTableShell>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[160px]">Received</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Message</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{messages.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={4}
									className="py-8 text-center text-sm text-[--text-muted]"
								>
									No messages yet.
								</TableCell>
							</TableRow>
						) : (
							messages.map((m) => (
								<TableRow key={m.id}>
									<TableCell className="whitespace-nowrap text-[--text-muted]">
										{formatDate(m.created_at)}
									</TableCell>
									<TableCell>{fullName(m.first_name, m.last_name)}</TableCell>
									<TableCell>
										<a href={`mailto:${m.email}`} className="hover:underline">
											{m.email}
										</a>
									</TableCell>
									<TableCell className="max-w-md whitespace-pre-wrap">
										{m.message}
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
