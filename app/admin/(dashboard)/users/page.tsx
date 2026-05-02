import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { listUsers } from "@/lib/repos/admin";

import { DataTableShell } from "../_components/data-table";
import { fullName } from "../_components/format";
import { PageHeader } from "../_components/page-header";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
	const users = await listUsers();

	return (
		<>
			<PageHeader
				title="Users"
				subtitle="Leads captured by the contact form"
				count={users.length}
			/>
			<DataTableShell>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{users.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={2}
									className="py-8 text-center text-sm text-[--text-muted]"
								>
									No users yet.
								</TableCell>
							</TableRow>
						) : (
							users.map((u) => (
								<TableRow key={u.email}>
									<TableCell>{fullName(u.first_name, u.last_name)}</TableCell>
									<TableCell>
										<a href={`mailto:${u.email}`} className="hover:underline">
											{u.email}
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
