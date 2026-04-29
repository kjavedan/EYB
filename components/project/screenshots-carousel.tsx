"use client";

import { useEffect, useRef, useState } from "react";

import { ImageLightbox } from "./image-lightbox";

const CLICK_THRESHOLD = 5;

export function ScreenshotsCarousel({ images }: { images: string[] }) {
	const scrollRef = useRef<HTMLDivElement>(null);
	const dragState = useRef({
		isDown: false,
		startX: 0,
		scrollLeft: 0,
		moved: false,
	});
	const rafRef = useRef<number | null>(null);
	const [progress, setProgress] = useState({ position: 0, ratio: 1 });
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

	useEffect(() => {
		const el = scrollRef.current;
		if (!el) return;

		const update = () => {
			const max = el.scrollWidth - el.clientWidth;
			if (max <= 0) {
				setProgress({ position: 0, ratio: 1 });
				return;
			}
			const ratio = el.clientWidth / el.scrollWidth;
			// In RTL, modern browsers report scrollLeft as 0 at the visual start
			// (right edge) and grow it negative as you scroll toward the end.
			// Take the absolute value so progress reads 0→1 in both directions.
			const position = Math.abs(el.scrollLeft) / max;
			setProgress({ position, ratio });
		};

		update();
		el.addEventListener("scroll", update, { passive: true });
		window.addEventListener("resize", update);
		return () => {
			el.removeEventListener("scroll", update);
			window.removeEventListener("resize", update);
		};
	}, [images.length]);

	if (!images.length) return null;

	const thumbWidth = `${Math.max(progress.ratio * 100, 12)}%`;
	const thumbOffset = `${
		progress.position * (100 - Math.max(progress.ratio * 100, 12))
	}%`;

	const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		// Let native touch scroll handle mobile — it has built-in momentum.
		if (e.pointerType === "touch") return;
		const el = scrollRef.current;
		if (!el) return;
		dragState.current = {
			isDown: true,
			startX: e.pageX,
			scrollLeft: el.scrollLeft,
			moved: false,
		};
		// Don't capture the pointer or change cursor yet — wait until movement
		// crosses the threshold. Otherwise a plain click would be redirected
		// to the scroll container and the inner button's click never fires.
	};

	const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
		if (!dragState.current.isDown) return;
		const el = scrollRef.current;
		if (!el) return;
		const walk = e.pageX - dragState.current.startX;
		if (!dragState.current.moved && Math.abs(walk) > CLICK_THRESHOLD) {
			dragState.current.moved = true;
			// Now we know it's a real drag — switch into drag mode.
			el.style.scrollSnapType = "none";
			el.style.scrollBehavior = "auto";
			el.style.cursor = "grabbing";
			el.setPointerCapture(e.pointerId);
		}
		if (!dragState.current.moved) return;
		// Batch scrollLeft writes into a single rAF tick.
		if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
		rafRef.current = requestAnimationFrame(() => {
			rafRef.current = null;
			if (scrollRef.current) {
				scrollRef.current.scrollLeft = dragState.current.scrollLeft - walk;
			}
		});
	};

	const finishDrag = (e: React.PointerEvent<HTMLDivElement>) => {
		if (!dragState.current.isDown) return;
		const wasDragging = dragState.current.moved;
		dragState.current.isDown = false;
		const el = scrollRef.current;
		if (el && wasDragging) {
			el.style.scrollSnapType = "";
			el.style.scrollBehavior = "";
			el.style.cursor = "";
			el.releasePointerCapture(e.pointerId);
		}
	};

	const onImageClick = (e: React.MouseEvent, i: number) => {
		// Suppress clicks that follow a drag.
		if (dragState.current.moved) {
			e.preventDefault();
			return;
		}
		setLightboxIndex(i);
	};

	return (
		<div className="w-full">
			<div
				ref={scrollRef}
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={finishDrag}
				onPointerCancel={finishDrag}
				className="flex h-72 cursor-grab snap-x snap-mandatory scroll-smooth gap-4 overflow-x-auto pb-1 select-none lg:h-96 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
			>
				{images.map((src, i) => (
					<button
						key={`${src}-${i}`}
						type="button"
						onClick={(e) => onImageClick(e, i)}
						className="relative h-full flex-shrink-0 snap-start overflow-hidden rounded-2xl bg-[--bg-elevated] focus:outline-none focus-visible:ring-2 focus-visible:ring-[--text-color]"
						aria-label={`Open screenshot ${i + 1} of ${images.length}`}
					>
						<img
							src={src}
							alt=""
							draggable={false}
							className="h-full w-auto select-none object-contain"
						/>
					</button>
				))}
			</div>

			{progress.ratio < 1 && (
				<div className="mx-auto mt-5 h-1 w-40 overflow-hidden rounded-full bg-[--border-color]">
					<div
						className="h-full rounded-full bg-[--text-color] transition-[margin-inline-start] duration-150 ease-out"
						style={{ width: thumbWidth, marginInlineStart: thumbOffset }}
					/>
				</div>
			)}

			{lightboxIndex !== null && (
				<ImageLightbox
					images={images}
					startIndex={lightboxIndex}
					onClose={() => setLightboxIndex(null)}
				/>
			)}
		</div>
	);
}
