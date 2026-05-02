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

const STATUS_PILL: Record<Status, string> = {
	available:
		"bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
	taken: "bg-rose-500/10 text-rose-500 border-rose-500/30",
	unknown:
		"bg-[--bg-overlay] text-[--text-muted] border-[--border-color]",
	invalid:
		"bg-[--bg-overlay] text-[--text-muted] border-[--border-color]",
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
			? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
			: "grid grid-cols-2 lg:grid-cols-4 gap-3";

	return (
		<div>
			<h3 className="text-lg lg:text-xl font-bold text-[--text-color] mb-4 flex items-center gap-2">
				<span className="h-px flex-1 bg-gradient-to-r from-transparent to-[--border-color]" />
				<span>{title}</span>
				<span className="h-px flex-1 bg-gradient-to-l from-transparent to-[--border-color]" />
			</h3>
			<div className={gridClass}>{children}</div>
		</div>
	);
}

function StatusPill({ status }: { status: Status }) {
	const { t } = useTranslation();
	return (
		<div
			className={cn(
				"inline-flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-medium",
				STATUS_PILL[status],
			)}
		>
			<Icon icon={STATUS_ICONS[status]} className="text-sm" />
			<span>{t(`brandChecker.status.${status}`)}</span>
		</div>
	);
}

function CardShell({
	index,
	status,
	children,
}: {
	index: number;
	status: Status;
	children: React.ReactNode;
}) {
	const accent =
		status === "available"
			? "before:opacity-100 before:bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_60%)]"
			: "before:opacity-0";

	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
			whileHover={{ y: -2 }}
			className={cn(
				"relative overflow-hidden rounded-2xl border border-[--border-color] bg-[--bg-elevated] p-4 lg:p-5",
				"before:absolute before:inset-0 before:pointer-events-none before:transition-opacity",
				accent,
			)}
		>
			<div className="relative">{children}</div>
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
	const { t } = useTranslation();
	const dot = domain.name.lastIndexOf(".");
	const name = dot >= 0 ? domain.name.slice(0, dot) : domain.name;
	const tld = dot >= 0 ? domain.name.slice(dot) : "";
	const tldColor =
		domain.status === "available"
			? "text-emerald-500"
			: "text-[--secondary-color]";

	return (
		<CardShell index={index} status={domain.status}>
			<div className="flex flex-col items-start gap-3" style={{ direction: "ltr" }}>
				<Icon icon="mdi:web" className="text-2xl text-[--text-muted]" />
				<div className="text-base lg:text-lg font-semibold text-[--text-color] truncate w-full">
					<span className="text-[--text-color]">{name}</span>
					<span className={tldColor}>{tld}</span>
				</div>
				<StatusPill status={domain.status} />
				{domain.status === "invalid" && domain.reason && (
					<span className="text-xs text-[--text-muted]">
						{t(`brandChecker.reasons.${domain.reason}`)}
					</span>
				)}
			</div>
		</CardShell>
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
		<CardShell index={index} status={social.status}>
			<div className="flex flex-col items-center text-center gap-2">
				<Icon
					icon={SOCIAL_ICONS[social.platform]}
					className="text-4xl lg:text-5xl text-[--text-color]"
				/>
				<span className="text-sm lg:text-base font-semibold text-[--text-color]">
					{t(`brandChecker.platforms.${social.platform}`)}
				</span>
				<StatusPill status={social.status} />
				{social.status === "invalid" && social.reason && (
					<span className="text-xs text-[--text-muted] leading-snug">
						{t(`brandChecker.reasons.${social.reason}`)}
					</span>
				)}
			</div>
		</CardShell>
	);
}
