import { z } from "zod";

/**
 * Schemas for user-facing form actions. Both `subscribe` and `contact` accept
 * the same fields, so we define one base schema and reuse it. Splitting them
 * makes future divergence (e.g., a "message" field on contact only) simple.
 */

const baseUserSchema = z.object({
	first_name: z.string().trim().min(1, "first_name is required").max(80),
	last_name: z
		.string()
		.trim()
		.max(80)
		.transform((v) => v || null)
		.nullable(),
	email: z.string().trim().toLowerCase().email("invalid email address"),
});

export const subscribeSchema = baseUserSchema;
export const contactSchema = baseUserSchema;

export type SubscribeInput = z.infer<typeof subscribeSchema>;
export type ContactInput = z.infer<typeof contactSchema>;

/**
 * Convert a FormData payload into a plain object. Multi-value entries are
 * collapsed to the last value — fine for our forms but a footgun if used
 * elsewhere.
 */
export function formDataToObject(formData: FormData): Record<string, unknown> {
	return Object.fromEntries(formData.entries());
}
