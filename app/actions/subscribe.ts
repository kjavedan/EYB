"use server";

import {
	FROM_ADDRESS,
	NEWSLETTER_DISCOUNT_TEMPLATE_ID,
	SUPPORT_EMAIL,
	ownerSubscribeNotificationHtml,
	resend,
} from "@/lib/email";
import { createSubscriber } from "@/lib/repos/newsletter_subscribers";
import { formDataToObject, subscribeSchema } from "@/lib/validation";

export type SubscribeResult =
	| { ok: true }
	| { ok: false; reason: "duplicate" | "error" };

export async function subscribe(formData: FormData): Promise<SubscribeResult> {
	const parsed = subscribeSchema.safeParse(formDataToObject(formData));
	if (!parsed.success) {
		return { ok: false, reason: "error" };
	}

	const result = await createSubscriber(parsed.data);
	if (!result.ok) return { ok: false, reason: "error" };
	if (result.duplicate) return { ok: false, reason: "duplicate" };

	const discountPromise = resend.emails.send(
		{
			from: FROM_ADDRESS,
			to: [parsed.data.email],
			template: {
				id: NEWSLETTER_DISCOUNT_TEMPLATE_ID,
				variables: { name: parsed.data.first_name },
			},
		},
		{ idempotencyKey: `subscribe-discount/${parsed.data.email}` },
	);

	const ownerPromise = resend.emails.send({
		from: FROM_ADDRESS,
		to: [SUPPORT_EMAIL],
		replyTo: parsed.data.email,
		subject: `New newsletter subscriber: ${parsed.data.first_name}`,
		html: ownerSubscribeNotificationHtml({
			firstName: parsed.data.first_name,
			lastName: parsed.data.last_name,
			email: parsed.data.email,
		}),
	});

	const [discountResult, ownerResult] = await Promise.all([
		discountPromise,
		ownerPromise,
	]);

	if (discountResult.error) {
		console.error("subscribe discount email error:", discountResult.error);
	}
	if (ownerResult.error) {
		console.error("owner subscribe notification error:", ownerResult.error);
	}

	return { ok: true };
}
