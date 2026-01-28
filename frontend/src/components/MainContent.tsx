import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { clsx } from "clsx";
import { useTheme } from "../contexts/ThemeContext";

export const mainVariants = tv({
    base: "w-full transition-colors",
    variants: {
        variant: {
            primary: "",
            secondary: "",
        },
        theme: {
            light: "",
            dark: "",
        }
    },
    compoundVariants: [
        {
            variant: "primary",
            theme: "light",
            className: "bg-gray-100 text-gray-900",
        },
        {
            variant: "primary",
            theme: "dark",
            className: "bg-zinc-900 text-gray-200",
        },
        {
            variant: "secondary",
            theme: "light",
            className: "bg-purple-700 text-white",
        },
        {
            variant: "secondary",
            theme: "dark",
            className: "bg-purple-900 text-white",
        },
    ],
    defaultVariants: {
        variant: "primary",
        theme: "light",
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
    const { dark } = useTheme();
    return React.createElement(
        as,
        {
            className: clsx(
                mainVariants({ 
                    variant,
                    theme: dark ? "dark" : "light",
                }), 
                className
            ),
            ...props,
        },
        children
    );
}