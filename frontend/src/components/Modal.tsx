import { type ReactNode, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
    const { dark } = useTheme();

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <div 
                className={`relative z-10 w-full max-w-lg rounded-2xl shadow-xl p-6 border ${dark ? "bg-zinc-800 border-neutral-700" : "border-gray-100 bg-white"}`}
                >
                {children}
            </div>
        </div>
    );
}
