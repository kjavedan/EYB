type StandardEvent =
	| "Lead"
	| "Contact"
	| "Schedule"
	| "CompleteRegistration"
	| "SubmitApplication"
	| "ViewContent";

export function trackEvent(
	event: StandardEvent,
	params?: Record<string, unknown>,
): void {
	if (typeof window === "undefined") return;
	if (typeof window.fbq !== "function") return;
	window.fbq("track", event, params);
}
