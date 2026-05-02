"use client";

import { Icon } from "@iconify/react";
import type React from "react";
import { useActionState } from "react";
import { useTranslation } from "react-i18next";

import { contact } from "@/app/actions/contact";
import { subscribe } from "@/app/actions/subscribe";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type Flow = "subscribe" | "contact";

const FLOW_ACTIONS: Record<Flow, typeof subscribe | typeof contact> = {
	subscribe,
	contact,
};

const FLOW_SUBMIT_LABEL_KEY: Record<Flow, string> = {
	// Note: the existing translation key is the typo'd "subscibe" — kept here
	// to avoid touching every locale string. Renaming is a separate task.
	subscribe: "contact_form.subscibe",
	contact: "contact_form.send",
};

export function ContactForm({
	flow = "contact",
	onSuccess,
}: {
	flow?: Flow;
	onSuccess?: () => void;
}) {
	const { t, i18n } = useTranslation();
	const isRTL = i18n.language === "ar";
	const { toast } = useToast();

	async function handleSubmit(
		_state: unknown,
		formData: FormData,
	): Promise<void> {
		const firstName = (formData.get("first_name") as string) ?? "";

		try {
			const result = await FLOW_ACTIONS[flow](formData);

			if (result.ok) {
				toast({
					title: t(`contact_form.success.${flow}.title`),
					description: t(`contact_form.success.${flow}.description`, {
						name: firstName,
					}),
					variant: "default",
				});
				onSuccess?.();
				return;
			}

			if (result.reason === "duplicate") {
				toast({
					title: t(`contact_form.error.${flow}.title`),
					description: t("contact_form.error.subscribe.email_exists"),
					variant: "destructive",
				});
				return;
			}

			throw new Error("form submission failed");
		} catch (error) {
			console.error(error);
			toast({
				title: t(`contact_form.error.${flow}.title`),
				description: t(`contact_form.error.${flow}.description`, {
					name: firstName,
				}),
				variant: "destructive",
			});
		}
	}

	const [, formAction, isPending] = useActionState(handleSubmit, null);

	const submitLabel = t(FLOW_SUBMIT_LABEL_KEY[flow]);

	return (
		<div className="shadow-input !w-full mx-auto max-w-sm rounded-none md:rounded-2xl bg-[--bg-color]">
			<form action={formAction} className="w-full">
				<div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:gap-2">
					<LabelInputContainer>
						<Label htmlFor="first_name">{t("contact_form.first_name")}</Label>
						<Input
							name="first_name"
							placeholder={t("contact_form.placeholder.first_name")}
							type="text"
							required
						/>
					</LabelInputContainer>
					<LabelInputContainer>
						<Label htmlFor="last_name">{t("contact_form.last_name")}</Label>
						<Input
							name="last_name"
							placeholder={t("contact_form.placeholder.last_name")}
							type="text"
						/>
					</LabelInputContainer>
				</div>
				<LabelInputContainer className="mb-4">
					<Label htmlFor="email">{t("contact_form.email")}</Label>
					<Input
						name="email"
						placeholder={t("contact_form.placeholder.email")}
						type="email"
						required
					/>
				</LabelInputContainer>

				{flow === "contact" && (
					<LabelInputContainer className="mb-4">
						<Label htmlFor="message">{t("contact_form.message")}</Label>
						<Textarea
							name="message"
							placeholder={t("contact_form.placeholder.message")}
							required
							maxLength={2000}
						/>
					</LabelInputContainer>
				)}

				<button
					className="group/btn mt-6 relative block h-10 w-full rounded-xl font-medium bg-[--button-bg] text-[--button-text] hover:opacity-90 transition-opacity"
					type="submit"
					style={{ direction: "ltr" }}
					disabled={isPending}
				>
					{isPending ? (
						<Icon icon={"line-md:loading-loop"} className="mx-auto" />
					) : isRTL ? (
						`← ${submitLabel}`
					) : (
						`${submitLabel} →`
					)}

					<BottomGradient />
				</button>

				<div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
			</form>
		</div>
	);
}

const BottomGradient = () => (
	<>
		<span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
		<span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
	</>
);

const LabelInputContainer = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<div className={cn("flex w-full flex-col space-y-2", className)}>
		{children}
	</div>
);
