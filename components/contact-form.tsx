"use client";
import type React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export function ContactForm({
	actionTxt = "send",
}: {
	actionTxt: string;
}) {
	const { t, i18n } = useTranslation();
	const isRTL = i18n.language === "ar";

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Form submitted");
	};
	return (
		<div className="shadow-input !w-full mx-auto max-w-sm rounded-none md:rounded-2xl bg-black">
			<form onSubmit={handleSubmit} className="w-full">
				<div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:gap-2">
					<LabelInputContainer>
						<Label htmlFor="firstname">{t("contact_form.first_name")}</Label>
						<Input
							id="firstname"
							placeholder={t("contact_form.placeholder.first_name")}
							type="text"
							required
						/>
					</LabelInputContainer>
					<LabelInputContainer>
						<Label htmlFor="lastname">{t("contact_form.last_name")}</Label>
						<Input
							id="lastname"
							placeholder={t("contact_form.placeholder.last_name")}
							type="text"
						/>
					</LabelInputContainer>
				</div>
				<LabelInputContainer className="mb-4">
					<Label htmlFor="email">{t("contact_form.email")}</Label>
					<Input
						id="email"
						placeholder={t("contact_form.placeholder.email")}
						type="email"
						required
					/>
				</LabelInputContainer>

				<button
					className="group/btn mt-6 relative block h-10 w-full rounded-xl bg-gradient-to-br  font-medium text-white bg-zinc-800 from-zinc-900 to-zinc-900 shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
					type="submit"
					style={{ direction: "ltr" }}
				>
					{isRTL
						? `← ${t(`contact_form.${actionTxt}`)}`
						: `${t(`contact_form.${actionTxt}`)} →`}
					<BottomGradient />
				</button>

				<div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
			</form>
		</div>
	);
}

const BottomGradient = () => {
	return (
		<>
			<span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
			<span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
		</>
	);
};

const LabelInputContainer = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div className={cn("flex w-full flex-col space-y-2", className)}>
			{children}
		</div>
	);
};
