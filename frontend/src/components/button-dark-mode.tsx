import { useEffect, useState } from "react";
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
    Omit<React.ComponentProps<"button">, "variant" | "size"> {
  className?: string;
}

export default function DarkModeButton({
  variant,
  size,
  className,
  ...props
}: ButtonDarkProps) {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  // Detecta tema salvo ou do sistema
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setDarkMode(saved === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
    }
  }, []);

  // Aplica tema
  useEffect(() => {
    if (darkMode === null) return; // Evita piscar antes de saber o tema
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  if (darkMode === null) return null; // opcional: evita renderizar botão antes de definir o tema

  return (
    <button
      {...props}
      className={clsx(darkVariants({ size, variant }), className)}
      onClick={(e) => {
        props.onClick?.(e);
        setDarkMode(!darkMode);
      }}
    >
      {darkMode ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
