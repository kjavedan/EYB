"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import { STORAGE_KEYS } from "@/lib/config";
import { ContactForm } from "./contact-form";
import { Modal, ModalBody, ModalContent, useModal } from "./ui/animated-modal";

const SUBSCRIBED_KEY = STORAGE_KEYS.newsletterSubscribed;
const DISMISSED_KEY = STORAGE_KEYS.newsletterDismissedSession;

function SubscriptionModalContent() {
	const { open, setOpen } = useModal();
	const { t } = useTranslation();

	// Tracks whether the modal closed due to a successful subscribe vs a dismissal
	const successRef = useRef(false);
	// Tracks whether the modal was actually shown — so we don't write storage
	// flags on the initial mount when `open` starts false
	const hasBeenOpenedRef = useRef(false);

	// On mount: schedule opening the modal — unless the user has already
	// subscribed (localStorage, persistent) or dismissed it this session
	// (sessionStorage, cleared when the tab closes).
	useEffect(() => {
		if (typeof window === "undefined") return;
		if (localStorage.getItem(SUBSCRIBED_KEY)) return;
		if (sessionStorage.getItem(DISMISSED_KEY)) return;

		const timer = setTimeout(() => setOpen(true), 10000); // 10 seconds
		return () => clearTimeout(timer);
	}, [setOpen]);

	// React to open/close transitions to record the user's choice.
	useEffect(() => {
		if (typeof window === "undefined") return;
		if (open) {
			hasBeenOpenedRef.current = true;
			return;
		}
		if (!hasBeenOpenedRef.current) return;

		// Modal just closed
		if (successRef.current) {
			localStorage.setItem(SUBSCRIBED_KEY, "true");
		} else {
			sessionStorage.setItem(DISMISSED_KEY, "true");
		}
		hasBeenOpenedRef.current = false;
	}, [open]);

	const handleSuccess = () => {
		successRef.current = true;
		setOpen(false);
	};

	return (
		<ModalBody className="min-h-0">
			<ModalContent>
				<div className="space-y-2 mb-8">
					<h2 className="text-2xl font-bold text-[--text-color]">
						{t("subscribe.title", "Subscribe to Our Newsletter")}
					</h2>
					<p className="text-[--text-muted] text-sm">
						{t("subscribe.discount", "Get 10% Discount.")}
					</p>
				</div>
				<ContactForm flow="subscribe" onSuccess={handleSuccess} />
			</ModalContent>
		</ModalBody>
	);
}

export default function SubscribeForm() {
	return (
		<div>
			<Modal>
				<SubscriptionModalContent />
			</Modal>
		</div>
	);
}
