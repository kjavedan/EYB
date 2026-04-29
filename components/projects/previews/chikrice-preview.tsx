"use client";

export function ChikricePreview() {
	return (
		<div className="absolute inset-0 flex items-center justify-center bg-[--bg-color]">
			<svg
				viewBox="0 0 2000 700"
				className="h-auto w-full text-[--text-color]"
				preserveAspectRatio="xMidYMid meet"
				aria-hidden
			>
				<defs>
					<linearGradient
						id="cr-top"
						x1="0"
						y1="0"
						x2="1000"
						y2="315"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.05" />
						<stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.4" />
						<stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.9" />
					</linearGradient>
					<linearGradient
						id="cr-mid"
						x1="0"
						y1="0"
						x2="1000"
						y2="0"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0%" stopColor="#f97316" stopOpacity="0.05" />
						<stop offset="50%" stopColor="#f97316" stopOpacity="0.4" />
						<stop offset="100%" stopColor="#f97316" stopOpacity="0.9" />
					</linearGradient>
					<linearGradient
						id="cr-bot"
						x1="0"
						y1="700"
						x2="1000"
						y2="385"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0%" stopColor="#ef4444" stopOpacity="0.05" />
						<stop offset="50%" stopColor="#ef4444" stopOpacity="0.4" />
						<stop offset="100%" stopColor="#ef4444" stopOpacity="0.9" />
					</linearGradient>
					<linearGradient
						id="cr-out"
						x1="1000"
						y1="0"
						x2="2000"
						y2="0"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
						<stop offset="50%" stopColor="#10b981" stopOpacity="0.4" />
						<stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
					</linearGradient>
				</defs>

				<path
					id="cr-path-top"
					d="M 0 0 Q 300 315 1000 315"
					stroke="url(#cr-top)"
					strokeWidth="2"
					fill="none"
				/>
				<path
					id="cr-path-mid"
					d="M 0 350 L 1000 350"
					stroke="url(#cr-mid)"
					strokeWidth="2"
					fill="none"
				/>
				<path
					id="cr-path-bot"
					d="M 0 700 Q 300 385 1000 385"
					stroke="url(#cr-bot)"
					strokeWidth="2"
					fill="none"
				/>
				<path
					id="cr-path-out"
					d="M 1000 350 L 2000 350"
					stroke="url(#cr-out)"
					strokeWidth="2"
					fill="none"
				/>

				<text fontSize="60" textAnchor="middle" dy="-5">
					🍚
					<animateMotion dur="3s" repeatCount="indefinite" rotate="auto">
						<mpath href="#cr-path-top" />
					</animateMotion>
				</text>
				<text fontSize="60" textAnchor="middle" dy="-5">
					🫒
					<animateMotion
						dur="3s"
						repeatCount="indefinite"
						rotate="auto"
						begin="0.5s"
					>
						<mpath href="#cr-path-mid" />
					</animateMotion>
				</text>
				<text fontSize="60" textAnchor="middle" dy="-5">
					🥩
					<animateMotion
						dur="4s"
						repeatCount="indefinite"
						rotate="auto"
						begin="1s"
					>
						<mpath href="#cr-path-bot" />
					</animateMotion>
				</text>

				<circle r="8" fill="#ef4444">
					<animateMotion dur="5s" repeatCount="indefinite">
						<mpath href="#cr-path-out" />
					</animateMotion>
				</circle>
				<text fill="#919EAB" fontSize="22" textAnchor="middle" dy="35">
					<animateMotion dur="5s" repeatCount="indefinite">
						<mpath href="#cr-path-out" />
					</animateMotion>
					pro: 3
				</text>

				<circle r="8" fill="#0ea5e9">
					<animateMotion dur="5s" repeatCount="indefinite" begin="0.5s">
						<mpath href="#cr-path-out" />
					</animateMotion>
				</circle>
				<text fill="#919EAB" fontSize="22" textAnchor="middle" dy="-35">
					<animateMotion dur="5s" repeatCount="indefinite" begin="0.5s">
						<mpath href="#cr-path-out" />
					</animateMotion>
					carb: 2
				</text>

				<circle r="8" fill="#f59e0b">
					<animateMotion dur="5s" repeatCount="indefinite" begin="1s">
						<mpath href="#cr-path-out" />
					</animateMotion>
				</circle>
				<text fill="#919EAB" fontSize="22" textAnchor="middle" dy="35">
					<animateMotion dur="5s" repeatCount="indefinite" begin="1s">
						<mpath href="#cr-path-out" />
					</animateMotion>
					fat: 5
				</text>

				<rect
					x="900"
					y="250"
					width="200"
					height="200"
					rx="20"
					ry="20"
					fill="currentColor"
				/>
				<text
					x="1000"
					y="358"
					textAnchor="middle"
					fontSize="24"
					fontWeight="bold"
					fill="var(--bg-color)"
					fontFamily="system-ui, -apple-system, sans-serif"
				>
					CHIKRICE
				</text>
			</svg>
		</div>
	);
}
