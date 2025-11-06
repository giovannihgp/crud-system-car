import { useEffect, useState, type ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { clsx } from "clsx";

export const darkVariants = tv({
    base: `
        rounded-lg font-medium border transition
    `,
    variants: {
        variant: {
            primary: `
                border-gray-300 bg-white text-gray-800 
                hover:bg-gray-100 dark:bg-gray-800 
                dark:text-gray-100 dark:border-gray-600 
                dark:hover:bg-gray-700
            `,
        },
        size: {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-4 text-base",
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "sm",
    },
});

interface ButtonDarkProps
    extends VariantProps<typeof darkVariants>,
        Omit<ComponentProps<"button">, "variant" | "size"> {
            className?: string;
        }

export default function DarkModeButton({
    variant,
    size,
    className,
    ...props
} : ButtonDarkProps) {
    
    const [darkMode, setDarkMode] = useState(
        () => localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <button 
            {...props}
            className={clsx(darkVariants({ size, variant }), className)}
            onClick={() => setDarkMode(!darkMode)}
        >
            {darkMode ? "Dark" : "Light"}
        </button>
    );
}