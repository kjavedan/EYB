"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
	Modal,
	ModalBody,
	ModalContent,
	useModal,
} from "./ui/animated-modal";
import { ContactForm } from "./contact-form";

// Create a separate component for the modal content
function SubscriptionModalContent() {
	const { setOpen } = useModal();
	const { t } = useTranslation();

	useEffect(() => {
		const timer = setTimeout(() => {
			setOpen(true);
		}, 10000); // 10 seconds

		return () => clearTimeout(timer);
	}, [setOpen]);

	return (
		<>
			<ModalBody>
				<ModalContent>
					<div className="space-y-2 mb-8">
						<h2 className="text-2xl font-bold text-white">
							{t("subscribe.title", "Subscribe to Our Newsletter")}
						</h2>
						<p className="text-gray-300 text-sm">
							{t("subscribe.discount", "Get 10% Discount.")}
						</p>
					</div>
					<ContactForm actionTxt={"subscibe"} onSuccess={() => setOpen(false)} />
				</ModalContent>
				{/* <ModalFooter>
					<p className="text-sm text-center text-gray-400">
						By subscribing, you agree to our Privacy Policy and Terms of
						Service.
					</p>
				</ModalFooter> */}
			</ModalBody>
		</>
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
