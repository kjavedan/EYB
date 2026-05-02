"use client";

import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type Status = "available" | "taken" | "unknown" | "invalid";

type DomainResult = { name: string; status: Status; reason?: string };
type SocialResult = {
	platform: SocialPlatform;
	status: Status;
	reason?: string;
};
type SocialPlatform = "instagram" | "facebook" | "tiktok" | "snapchat";

type ApiResponse = {
	mode: "domain" | "name";
	domains: DomainResult[];
	socials?: SocialResult[];
};

const SOCIAL_ICONS: Record<SocialPlatform, string> = {
	instagram: "mdi:instagram",
	facebook: "ic:baseline-facebook",
	tiktok: "ic:baseline-tiktok",
	snapchat: "mdi:snapchat",
};

const STATUS_TEXT: Record<Status, string> = {
	available: "text-emerald-500",
	taken: "text-rose-500",
	unknown: "text-[--text-muted]",
	invalid: "text-[--text-muted]",
};

const STATUS_ICONS: Record<Status, string> = {
	available: "mdi:check-circle",
	taken: "mdi:close-circle",
	unknown: "mdi:help-circle",
	invalid: "mdi:cancel",
};

export default function BrandAvailabilityChecker() {
	const { t } = useTranslation();
	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<ApiResponse | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const trimmed = query.trim();
		if (!trimmed || loading) return;

		setLoading(true);
		setError(null);
		setResult(null);

		try {
			const res = await fetch("/api/brand-online-status", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ query: trimmed }),
			});
			const data = await res.json();
			if (!res.ok) {
				setError(t("brandChecker.errors.invalid"));
			} else {
				setResult(data as ApiResponse);
			}
		} catch {
			setError(t("brandChecker.errors.generic"));
		} finally {
			setLoading(false);
		}
	};

	return (
		<section id="brand-availability" className="py-20">
			<div className="w-full max-w-5xl mx-auto px-4">
				<SectionHeading>{t("brandChecker.title")}</SectionHeading>
				<p className="text-center text-base lg:text-lg text-[--text-muted] mt-4 max-w-2xl mx-auto">
					{t("brandChecker.subtitle")}
				</p>

				<form
					onSubmit={handleSubmit}
					className="mt-10 flex flex-col gap-3 max-w-2xl mx-auto"
					style={{ direction: "ltr" }}
				>
					<div className="relative w-full">
						<input
							type="text"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder={t("brandChecker.placeholder")}
							disabled={loading}
							className="w-full h-14 lg:h-16 ps-5 pe-36 text-base lg:text-lg rounded-full bg-[--bg-elevated] border border-[--border-color] text-[--text-color] outline-none focus:border-[--secondary-color] focus:ring-2 focus:ring-[--secondary-color] transition disabled:opacity-60"
							aria-label={t("brandChecker.placeholder")}
						/>
						<button
							type="submit"
							disabled={loading || !query.trim()}
							className="absolute end-2 top-1/2 -translate-y-1/2 h-10 lg:h-12 px-5 lg:px-6 rounded-full bg-[--button-bg] text-[--button-text] text-sm lg:text-base font-medium flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition"
						>
							{loading ? (
								<>
									<Icon icon="line-md:loading-loop" className="text-lg" />
									<span>{t("brandChecker.checking")}</span>
								</>
							) : (
								<span>{t("brandChecker.check")}</span>
							)}
						</button>
					</div>
					<p className="text-sm text-[--text-muted] text-start px-2 leading-relaxed">
						{t("brandChecker.helper")}
					</p>
				</form>

				<AnimatePresence mode="wait">
					{error && (
						<motion.div
							key="error"
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 8 }}
							className="mt-6 text-center text-rose-500"
						>
							{error}
						</motion.div>
					)}

					{result && (
						<motion.div
							key="result"
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 8 }}
							transition={{ duration: 0.25 }}
							className="mt-12 flex flex-col gap-10"
						>
							<ResultGroup
								title={t("brandChecker.groups.domains")}
								columns="domains"
							>
								{result.domains.map((d, i) => (
									<DomainCard
										key={d.name}
										domain={d}
										index={i}
									/>
								))}
							</ResultGroup>
							{result.socials && result.socials.length > 0 && (
								<ResultGroup
									title={t("brandChecker.groups.socials")}
									columns="socials"
								>
									{result.socials.map((s, i) => (
										<SocialCard
											key={s.platform}
											social={s}
											index={i}
										/>
									))}
								</ResultGroup>
							)}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</section>
	);
}

function ResultGroup({
	title,
	columns,
	children,
}: {
	title: string;
	columns: "domains" | "socials";
	children: React.ReactNode;
}) {
	const gridClass =
		columns === "domains"
			? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
			: "grid grid-cols-2 lg:grid-cols-4";

	return (
		<div>
			<h3 className="text-center text-sm lg:text-base font-bold text-[--text-muted] mb-5 uppercase tracking-[0.2em]">
				{title}
			</h3>
			<div className="grid-wrapper">
				<div className="relative grid-container">
					<div className={gridClass}>{children}</div>
				</div>
			</div>
		</div>
	);
}

function StatusLine({
	status,
	reason,
}: {
	status: Status;
	reason?: string;
}) {
	const { t } = useTranslation();
	return (
		<div className="flex flex-col items-center gap-1">
			<div
				className={cn(
					"flex items-center gap-1 text-xs lg:text-sm font-medium",
					STATUS_TEXT[status],
				)}
			>
				<Icon icon={STATUS_ICONS[status]} className="text-base" />
				<span>{t(`brandChecker.status.${status}`)}</span>
			</div>
			{status === "invalid" && reason && (
				<span className="text-[10px] lg:text-xs text-[--text-muted] leading-snug">
					{t(`brandChecker.reasons.${reason}`)}
				</span>
			)}
		</div>
	);
}

function ResultCell({
	index,
	children,
}: {
	index: number;
	children: React.ReactNode;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 6 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.25, delay: index * 0.04, ease: "easeOut" }}
			className="relative flex flex-col items-center text-center gap-3 px-3 py-6 lg:px-4 lg:py-8"
		>
			{/* Vertical gradient divider on the right of every cell. The
			    rightmost cells overlap with grid-container::after, which is the
			    same gradient — visually a single line. */}
			<div className="absolute top-0 end-0 h-full w-px bg-gradient-to-b from-[--bg-color] via-[--border-color] to-[--bg-color]" />
			{/* Horizontal gradient divider on the bottom of every cell. */}
			<div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-[--bg-color] via-[--border-color] to-[--bg-color]" />
			{children}
		</motion.div>
	);
}

function DomainCard({
	domain,
	index,
}: {
	domain: DomainResult;
	index: number;
}) {
	const dot = domain.name.lastIndexOf(".");
	const name = dot >= 0 ? domain.name.slice(0, dot) : domain.name;
	const tld = dot >= 0 ? domain.name.slice(dot) : "";
	const isAvailable = domain.status === "available";

	return (
		<ResultCell index={index}>
			<Icon icon="mdi:web" className="text-2xl text-[--text-muted]" />
			<div
				className="text-sm lg:text-base font-semibold truncate w-full"
				style={{ direction: "ltr" }}
			>
				<span className="text-[--text-color]">{name}</span>
				<span
					className={
						isAvailable
							? "text-[--secondary-color]"
							: "text-[--text-muted]"
					}
				>
					{tld}
				</span>
			</div>
			<StatusLine status={domain.status} reason={domain.reason} />
		</ResultCell>
	);
}

function SocialCard({
	social,
	index,
}: {
	social: SocialResult;
	index: number;
}) {
	const { t } = useTranslation();
	return (
		<ResultCell index={index}>
			<Icon
				icon={SOCIAL_ICONS[social.platform]}
				className="text-3xl lg:text-4xl text-[--text-color]"
			/>
			<span className="text-sm lg:text-base font-semibold text-[--text-color]">
				{t(`brandChecker.platforms.${social.platform}`)}
			</span>
			<StatusLine status={social.status} reason={social.reason} />
		</ResultCell>
	);
}
