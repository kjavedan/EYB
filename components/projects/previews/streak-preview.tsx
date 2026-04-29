"use client";

import { useEffect, useRef, useState } from "react";

const CUP_W = 14;
const CUP_H = 16;
const CUP_INTERIOR_TOP = 4;
const CUP_INTERIOR_BOTTOM = 13;
const CUP_INTERIOR_LEFT = 3;
const CUP_INTERIOR_RIGHT = 9;
const INTERIOR_ROWS = CUP_INTERIOR_BOTTOM - CUP_INTERIOR_TOP + 1;

const CYCLE_MS = 30_000;
const SESSION_SECONDS = 25 * 60;

const isCupEdge = (x: number, y: number) => {
	if (y === 2 && x >= 2 && x <= 10) return true;
	if (x === 2 && y >= 3 && y <= 13) return true;
	if (x === 10 && y >= 3 && y <= 13) return true;
	if (y === 14 && x >= 3 && x <= 9) return true;
	if (x === 12 && y >= 5 && y <= 11) return true;
	if (y === 5 && (x === 11 || x === 12)) return true;
	if (y === 11 && (x === 11 || x === 12)) return true;
	return false;
};

const isInterior = (x: number, y: number) =>
	x >= CUP_INTERIOR_LEFT &&
	x <= CUP_INTERIOR_RIGHT &&
	y >= CUP_INTERIOR_TOP &&
	y <= CUP_INTERIOR_BOTTOM;

const isSaucer = (x: number, y: number) =>
	y === 15 && x >= 1 && x <= 11;

function CoffeeCup({ fillRatio }: { fillRatio: number }) {
	const ratio = Math.max(0, Math.min(1, fillRatio));
	const filledRows = Math.round(ratio * INTERIOR_ROWS);
	const fillStartRow = CUP_INTERIOR_BOTTOM - filledRows + 1;

	const cells: { x: number; y: number; coffee: boolean }[] = [];
	for (let y = 0; y < CUP_H; y++) {
		for (let x = 0; x < CUP_W; x++) {
			if (isCupEdge(x, y) || isSaucer(x, y)) {
				cells.push({ x, y, coffee: false });
			} else if (isInterior(x, y) && y >= fillStartRow) {
				cells.push({ x, y, coffee: true });
			}
		}
	}

	return (
		<svg
			viewBox={`0 0 ${CUP_W} ${CUP_H}`}
			className="h-auto w-full"
			shapeRendering="crispEdges"
			aria-hidden
		>
			{cells.map((c, i) => (
				<rect
					key={i}
					x={c.x}
					y={c.y}
					width={1}
					height={1}
					fill={c.coffee ? "#6f4e37" : "currentColor"}
				/>
			))}
		</svg>
	);
}

export function StreakPreview() {
	const [progress, setProgress] = useState(0);
	const startRef = useRef(0);

	useEffect(() => {
		startRef.current = performance.now();
		let raf = 0;
		const tick = (now: number) => {
			const elapsed = now - startRef.current;
			setProgress((elapsed % CYCLE_MS) / CYCLE_MS);
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, []);

	const fillRatio = 1 - progress;
	const remaining = Math.max(0, Math.floor(fillRatio * SESSION_SECONDS));
	const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
	const ss = String(remaining % 60).padStart(2, "0");

	return (
		<div className="absolute inset-0 flex items-center justify-center bg-[--bg-color]">
			<div className="flex w-full max-w-[220px] flex-col items-center gap-2.5 px-4 text-[--text-color]">
				<p className="text-[9px] font-semibold tracking-[0.2em] text-[--text-gray]">
					FOCUS · 1 / 1
				</p>

				<div className="w-12 text-[--text-color]">
					<CoffeeCup fillRatio={fillRatio} />
				</div>

				<div className="font-mono text-2xl leading-none tabular-nums">
					{mm}:{ss}
				</div>

				<div className="flex gap-1.5 text-[9px] font-semibold tracking-[0.2em]">
					<div className="bg-[--text-color]/10 px-3 py-1.5 text-[--text-color]">
						STOP
					</div>
					<div className="bg-[--text-color] px-3 py-1.5 text-[--bg-color]">
						SKIP
					</div>
				</div>
			</div>
		</div>
	);
}
