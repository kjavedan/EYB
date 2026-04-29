"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;

export function ImageLightbox({
	images,
	startIndex,
	onClose,
}: {
	images: string[];
	startIndex: number;
	onClose: () => void;
}) {
	const [index, setIndex] = useState(startIndex);
	const [scale, setScale] = useState(1);
	const containerRef = useRef<HTMLDivElement>(null);

	const goTo = useCallback(
		(delta: number) => {
			setIndex((i) => (i + delta + images.length) % images.length);
		},
		[images.length],
	);
	const zoomIn = useCallback(
		() => setScale((s) => Math.min(MAX_ZOOM, +(s + ZOOM_STEP).toFixed(2))),
		[],
	);
	const zoomOut = useCallback(
		() => setScale((s) => Math.max(MIN_ZOOM, +(s - ZOOM_STEP).toFixed(2))),
		[],
	);
	const resetZoom = useCallback(() => setScale(1), []);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
			else if (e.key === "ArrowLeft") goTo(-1);
			else if (e.key === "ArrowRight") goTo(1);
			else if (e.key === "+" || e.key === "=") zoomIn();
			else if (e.key === "-" || e.key === "_") zoomOut();
			else if (e.key === "0") resetZoom();
		};
		window.addEventListener("keydown", onKey);
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = prevOverflow;
		};
	}, [goTo, onClose, resetZoom, zoomIn, zoomOut]);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;
		const onWheel = (e: WheelEvent) => {
			e.preventDefault();
			setScale((s) => {
				const next = s - e.deltaY * 0.0025;
				return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, +next.toFixed(2)));
			});
		};
		el.addEventListener("wheel", onWheel, { passive: false });
		return () => el.removeEventListener("wheel", onWheel);
	}, []);

	useEffect(() => {
		setScale(1);
	}, [index]);

	const stop = (e: React.MouseEvent | React.PointerEvent) =>
		e.stopPropagation();

	return (
		<div
			ref={containerRef}
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
			onClick={onClose}
			onPointerDown={(e) => {
				if (e.target === e.currentTarget) onClose();
			}}
		>
			<motion.div
				className={scale > 1 ? "cursor-grab active:cursor-grabbing" : ""}
				animate={{ scale }}
				transition={{ type: "spring", stiffness: 220, damping: 24 }}
				drag={scale > 1}
				dragMomentum={false}
				dragElastic={0.1}
				onClick={stop}
				onPointerDown={stop}
			>
				<img
					src={images[index]}
					alt=""
					draggable={false}
					className="max-h-[88vh] max-w-[92vw] select-none"
				/>
			</motion.div>

			<button
				type="button"
				onClick={onClose}
				className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-white/25 bg-black/55 text-white shadow-lg shadow-black/40 backdrop-blur-md transition hover:bg-black/75 md:size-10"
				aria-label="Close"
			>
				✕
			</button>

			{images.length > 1 && (
				<>
					<button
						type="button"
						onClick={(e) => {
							stop(e);
							goTo(-1);
						}}
						className="absolute left-4 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/55 text-2xl text-white shadow-lg shadow-black/40 backdrop-blur-md transition hover:bg-black/75 md:size-10 md:text-xl"
						aria-label="Previous image"
					>
						‹
					</button>
					<button
						type="button"
						onClick={(e) => {
							stop(e);
							goTo(1);
						}}
						className="absolute right-4 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/55 text-2xl text-white shadow-lg shadow-black/40 backdrop-blur-md transition hover:bg-black/75 md:size-10 md:text-xl"
						aria-label="Next image"
					>
						›
					</button>
					<div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full border border-white/25 bg-black/55 px-3 py-1 text-xs text-white shadow-lg shadow-black/40 backdrop-blur-md">
						{index + 1} / {images.length}
					</div>
				</>
			)}

			<div
				className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/25 bg-black/55 p-1 text-white shadow-lg shadow-black/40 backdrop-blur-md"
				onClick={stop}
				onPointerDown={stop}
			>
				<button
					type="button"
					onClick={zoomOut}
					disabled={scale <= MIN_ZOOM}
					className="grid size-8 place-items-center rounded-full text-lg transition hover:bg-white/15 disabled:opacity-30"
					aria-label="Zoom out"
				>
					−
				</button>
				<button
					type="button"
					onClick={resetZoom}
					className="min-w-12 rounded-full px-2 text-xs font-medium tabular-nums transition hover:bg-white/15"
					aria-label="Reset zoom"
				>
					{Math.round(scale * 100)}%
				</button>
				<button
					type="button"
					onClick={zoomIn}
					disabled={scale >= MAX_ZOOM}
					className="grid size-8 place-items-center rounded-full text-lg transition hover:bg-white/15 disabled:opacity-30"
					aria-label="Zoom in"
				>
					+
				</button>
			</div>
		</div>
	);
}
