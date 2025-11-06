import { type ComponentProps } from "react";
import {tv, type VariantProps} from "tailwind-variants";
import { clsx } from "clsx";

export const inputVariants = tv({
	base: "flex flex-col gap-1 rounded-md border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500",
	variants: {
		size: {
            none: "text-base",
            md: "h-10 px-3 text-base",
            lg: "h-12 px-4 text-lg",
        },
        disabled: {
            true: "opacity-50 pointer-events-none bg-gray-100",
        },
	},
	defaultVariants: {
		size: "none",
        disabled: false,
	},
});

interface InputTextProps 
    extends VariantProps<typeof inputVariants>, 
        Omit<ComponentProps<"input">, "size" | "disabled"> {
	className?: string;
}

export default function InputText({
    size,
    disabled,
	className,
	...props
}: InputTextProps) {
	return (
        <input 
            {...props}
            disabled={disabled}
            className={clsx(inputVariants({ size, disabled }), className )}
        />
	);
}