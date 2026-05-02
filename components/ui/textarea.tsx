"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
	HTMLTextAreaElement,
	React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
	const radius = 100;
	const [visible, setVisible] = React.useState(false);

	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	function handleMouseMove({
		currentTarget,
		clientX,
		clientY,
	}: React.MouseEvent<HTMLDivElement>) {
		const { left, top } = currentTarget.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}

	return (
		<motion.div
			style={{
				background: useMotionTemplate`
        radial-gradient(
          ${visible ? `${radius}px` : "0px"} circle at ${mouseX}px ${mouseY}px,
          #3b82f6,
          transparent 80%
        )
      `,
			}}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setVisible(true)}
			onMouseLeave={() => setVisible(false)}
			className="group/input rounded-xl p-[2px] transition duration-300"
		>
			<textarea
				className={cn(
					"shadow-input placeholder:text-[--text-muted] flex min-h-[120px] w-full rounded-xl border-none px-3 py-2 text-sm transition duration-400 group-hover/input:shadow-none focus-visible:ring-[2px] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 bg-[--bg-elevated] text-[--text-color] shadow-[0px_0px_1px_1px_var(--border-color)] focus-visible:ring-[--secondary-color] resize-y",
					className,
				)}
				ref={ref}
				{...props}
			/>
		</motion.div>
	);
});
Textarea.displayName = "Textarea";

export { Textarea };
