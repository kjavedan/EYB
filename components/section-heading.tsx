import { cn } from "@/lib/utils";

/**
 * Big page-section heading shared by the home sections (Services, Pricing,
 * Projects, Contact). Centralizes the responsive font-size + leading scale
 * so changing the design language is a one-file edit.
 */
export function SectionHeading({
	children,
	className,
	id,
}: {
	children: React.ReactNode;
	className?: string;
	id?: string;
}) {
	return (
		<h2
			id={id}
			className={cn(
				"text-center uppercase text-4xl leading-[50px] lg:text-5xl xl:text-6xl lg:leading-[70px] xl:leading-[90px]",
				className,
			)}
		>
			{children}
		</h2>
	);
}
