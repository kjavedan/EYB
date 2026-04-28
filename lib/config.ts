/**
 * Centralized constants used across the site.
 *
 * Anything that's a contact channel, social URL, or local-storage key should
 * live here so we don't have to grep five files when something changes.
 */

// --- Brand / contact channels ----------------------------------------------

export const PHONE_E164 = "+971502597949";
export const PHONE_DIGITS = "971502597949";

export const SCHEDULING_URL = "https://cal.com/khaled-2wiu0n/30min";
export const WHATSAPP_URL = `https://wa.me/${PHONE_DIGITS}`;
export const INSTAGRAM_URL = "https://www.instagram.com/eyb.ae";
export const LINKEDIN_URL = "https://www.linkedin.com/company/eyb-ae";

export const SUPPORT_EMAIL = "khaled@eyb.ae";
export const FROM_ADDRESS = `Khaled @ EYB <${SUPPORT_EMAIL}>`;

// --- Local-storage / session-storage keys ----------------------------------

export const STORAGE_KEYS = {
	language: "language",
	newsletterSubscribed: "eyb_newsletter_subscribed",
	newsletterDismissedSession: "eyb_newsletter_dismissed_session",
} as const;
