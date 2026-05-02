import {
	type SubscriberRow,
	listSubscribers,
} from "@/lib/repos/newsletter_subscribers";

import {
	DataTable,
	type DataTableColumn,
	DateCell,
	MailtoLink,
} from "../_components/data-table";
import { fullName } from "../_components/format";
import { PageHeader } from "../_components/page-header";

export const dynamic = "force-dynamic";

const columns: DataTableColumn<SubscriberRow>[] = [
	{
		header: "Subscribed",
		headerClassName: "w-[160px]",
		cell: (s) => <DateCell value={s.created_at} />,
	},
	{ header: "Name", cell: (s) => fullName(s.first_name, s.last_name) },
	{ header: "Email", cell: (s) => <MailtoLink email={s.email} /> },
];

export default async function AdminSubscribersPage() {
	const subscribers = await listSubscribers();

	return (
		<>
			<PageHeader
				title="Newsletter subscribers"
				subtitle="Most recent first"
				count={subscribers.length}
			/>
			<DataTable
				columns={columns}
				rows={subscribers}
				rowKey={(s) => s.id}
				emptyLabel="No subscribers yet."
			/>
		</>
	);
}
