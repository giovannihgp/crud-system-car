import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { clsx } from "clsx";

export const mainVariants = tv({
    base: "w-full transition-colors",
    variants: {
        variant: {
            "primary": "bg-gray-100 dark:bg-gray-900",
            "secondary": "bg-purple-700 dark:bg-purple-950",
        },
    },
    defaultVariants: {
        variant: "primary",
    },
});

interface MainContentProps extends VariantProps<typeof mainVariants> {
    as?: keyof React.JSX.IntrinsicElements;
    className?: string;
    children: React.ReactNode;
}

export default function MainContent({
    as = "main",
    variant,
    children,
    className,
    ...props
} : MainContentProps) {
    return React.createElement(
        as,
        {
            className: clsx(mainVariants({ variant }), className),
            ...props,
        },
        children
    );
}