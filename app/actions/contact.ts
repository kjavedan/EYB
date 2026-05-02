"use server";

import {
	CONTACT_ACK_TEMPLATE_ID,
	FROM_ADDRESS,
	SUPPORT_EMAIL,
	ownerContactNotificationHtml,
	resend,
} from "@/lib/email";
import { createContactMessage } from "@/lib/repos/contact_messages";
import { createUser } from "@/lib/repos/users";
import { contactSchema, formDataToObject } from "@/lib/validation";

export type ContactResult =
	| { ok: true }
	| { ok: false; reason: "duplicate" | "error" };

export async function contact(formData: FormData): Promise<ContactResult> {
	const parsed = contactSchema.safeParse(formDataToObject(formData));
	if (!parsed.success) {
		return { ok: false, reason: "error" };
	}

	const userResult = await createUser({
		first_name: parsed.data.first_name,
		last_name: parsed.data.last_name,
		email: parsed.data.email,
	});
	if (!userResult.ok) return { ok: false, reason: "error" };
	// Duplicate is fine on the contact flow — they already exist as a lead,
	// we just want to acknowledge their new message.

	const messageResult = await createContactMessage(parsed.data);
	if (!messageResult.ok) return { ok: false, reason: "error" };

	const ackPromise = resend.emails.send(
		{
			from: FROM_ADDRESS,
			to: [parsed.data.email],
			template: {
				id: CONTACT_ACK_TEMPLATE_ID,
				variables: { name: parsed.data.first_name },
			},
		},
		{ idempotencyKey: `contact-ack/${parsed.data.email}/${Date.now()}` },
	);

	const ownerPromise = resend.emails.send({
		from: FROM_ADDRESS,
		to: [SUPPORT_EMAIL],
		replyTo: parsed.data.email,
		subject: `New contact form submission from ${parsed.data.first_name}`,
		html: ownerContactNotificationHtml({
			firstName: parsed.data.first_name,
			lastName: parsed.data.last_name,
			email: parsed.data.email,
			message: parsed.data.message,
		}),
	});

	const [ackResult, ownerResult] = await Promise.all([
		ackPromise,
		ownerPromise,
	]);

	if (ackResult.error) {
		console.error("contact ack email error:", ackResult.error);
	}
	if (ownerResult.error) {
		console.error("owner notification email error:", ownerResult.error);
	}

	return { ok: true };
}
