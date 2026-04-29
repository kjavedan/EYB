"use client";

import { useEffect, useState } from "react";

type Line =
	| { kind: "name"; text: string }
	| { kind: "subtitle"; text: string }
	| { kind: "rule" }
	| { kind: "section"; text: string }
	| { kind: "body"; text: string }
	| { kind: "link"; text: string };

const LINES: Line[] = [
	{ kind: "name", text: "JOHN DOE" },
	{ kind: "subtitle", text: "Full-Stack Engineer · Dubai" },
	{ kind: "rule" },
	{ kind: "section", text: "EXPERIENCE" },
	{ kind: "body", text: "Lead Engineer · Acme · 2022 — Now" },
	{ kind: "body", text: "Shipped AI resume tool used by 5k+ users." },
	{ kind: "body", text: "Cut infra cost by 40% via edge migration." },
	{ kind: "rule" },
	{ kind: "section", text: "SKILLS" },
	{ kind: "body", text: "TypeScript · React · Next.js · Postgres" },
	{ kind: "rule" },
	{ kind: "section", text: "LINKS" },
	{ kind: "link", text: "github.com/khaled" },
];

const TICK_MS = 380;
const HOLD_TICKS = 6;

export function ResumeMakerPreview() {
	const [step, setStep] = useState(0);

	useEffect(() => {
		const id = setInterval(() => {
			setStep((s) => (s >= LINES.length + HOLD_TICKS ? 0 : s + 1));
		}, TICK_MS);
		return () => clearInterval(id);
	}, []);

	const visible = Math.min(step, LINES.length);

	return (
		<div className="absolute inset-0 flex items-center justify-center bg-[--bg-color] p-3">
			<div className="relative flex aspect-[3/4] h-full max-h-full flex-col gap-[3px] overflow-hidden bg-white p-2.5 text-black shadow-md">
				<div className="absolute right-1.5 top-1.5 flex items-center gap-0.5 rounded-sm bg-blue-600 px-1 py-px text-[5px] font-bold tracking-wider text-white">
					<span>✦</span>
					<span>AI</span>
				</div>

				{LINES.map((line, i) => {
					const shown = i < visible;
					const isCursor = i === visible - 1;
					const baseStyle = {
						opacity: shown ? 1 : 0,
						transition: "opacity 200ms",
					};

					if (line.kind === "rule") {
						return (
							<div
								key={i}
								className="my-[2px] h-px bg-neutral-200"
								style={{ opacity: shown ? 1 : 0.25 }}
							/>
						);
					}

					if (line.kind === "name") {
						return (
							<div
								key={i}
								className="text-[8px] font-bold leading-tight tracking-tight"
								style={baseStyle}
							>
								{line.text}
								{isCursor && <Cursor />}
							</div>
						);
					}

					if (line.kind === "subtitle") {
						return (
							<div
								key={i}
								className="text-[5px] leading-tight text-neutral-500"
								style={baseStyle}
							>
								{line.text}
								{isCursor && <Cursor />}
							</div>
						);
					}

					if (line.kind === "section") {
						return (
							<div
								key={i}
								className="font-mono text-[5px] font-bold leading-tight tracking-[0.15em] text-neutral-900"
								style={baseStyle}
							>
								{line.text}
								{isCursor && <Cursor />}
							</div>
						);
					}

					if (line.kind === "link") {
						return (
							<div
								key={i}
								className="text-[5px] leading-tight text-blue-600 underline decoration-blue-600/40"
								style={baseStyle}
							>
								{line.text}
								{isCursor && <Cursor />}
							</div>
						);
					}

					return (
						<div
							key={i}
							className="text-[5px] leading-tight text-neutral-700"
							style={baseStyle}
						>
							{line.text}
							{isCursor && <Cursor />}
						</div>
					);
				})}
			</div>
		</div>
	);
}

function Cursor() {
	return (
		<span
			className="ml-px inline-block w-[1px] animate-pulse bg-blue-600 align-middle"
			style={{ height: "0.9em" }}
		/>
	);
}
