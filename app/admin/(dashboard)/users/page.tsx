import { type UserRow, listUsers } from "@/lib/repos/users";

import {
	DataTable,
	type DataTableColumn,
	MailtoLink,
} from "../_components/data-table";
import { fullName } from "../_components/format";
import { PageHeader } from "../_components/page-header";

export const dynamic = "force-dynamic";

const columns: DataTableColumn<UserRow>[] = [
	{ header: "Name", cell: (u) => fullName(u.first_name, u.last_name) },
	{ header: "Email", cell: (u) => <MailtoLink email={u.email} /> },
];

export default async function AdminUsersPage() {
	const users = await listUsers();

	return (
		<>
			<PageHeader
				title="Users"
				subtitle="Leads captured by the contact form"
				count={users.length}
			/>
			<DataTable
				columns={columns}
				rows={users}
				rowKey={(u) => u.email}
				emptyLabel="No users yet."
			/>
		</>
	);
}
