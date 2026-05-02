import {
	type ContactMessageRow,
	listContactMessages,
} from "@/lib/repos/contact_messages";

import {
	DataTable,
	type DataTableColumn,
	DateCell,
	MailtoLink,
} from "../_components/data-table";
import { fullName } from "../_components/format";
import { PageHeader } from "../_components/page-header";

export const dynamic = "force-dynamic";

const columns: DataTableColumn<ContactMessageRow>[] = [
	{
		header: "Received",
		headerClassName: "w-[160px]",
		cell: (m) => <DateCell value={m.created_at} />,
	},
	{ header: "Name", cell: (m) => fullName(m.first_name, m.last_name) },
	{ header: "Email", cell: (m) => <MailtoLink email={m.email} /> },
	{
		header: "Message",
		cellClassName: "max-w-md whitespace-pre-wrap",
		cell: (m) => m.message,
	},
];

export default async function AdminMessagesPage() {
	const messages = await listContactMessages();

	return (
		<>
			<PageHeader
				title="Contact messages"
				subtitle="Most recent first"
				count={messages.length}
			/>
			<DataTable
				columns={columns}
				rows={messages}
				rowKey={(m) => m.id}
				emptyLabel="No messages yet."
			/>
		</>
	);
}
