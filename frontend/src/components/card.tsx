import {type VariantProps, tv} from "tailwind-variants";
import React from "react";
import { clsx } from "clsx";

export const cardVariants = tv({
	base: `
        rounded-4xl
        transition-shadow
        duration-200
        hover:shadow-lg
		mx-auto
	`,
	variants: {
		variant: {
			none: "",
			default: "border border-blue-200 shadow-md",
			primary: "bg-blue-50 border border-blue-300",
		},
		size: {
			none: "",
			md: "p-4",
			lg: "p-6",
		},
	},
	defaultVariants: {
		size: "none",
		variant: "none",
	},
});

interface CardProps
	extends VariantProps<typeof cardVariants>,
		React.ComponentProps<"div"> {
	as?: keyof React.JSX.IntrinsicElements;
}

export default function Card({
	as = "div",
	size,
	variant,
	children,
	className,
	...props
} : CardProps) {
	return React.createElement(
		as,
		{
			className: clsx(cardVariants({size, variant }), className),
			...props,
		},
		children
	);
}
