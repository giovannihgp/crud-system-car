import { useTheme } from "../../contexts/ThemeContext";

export default function PasswordIcon(
    {
        text,
        classDiv,
        classIcon
    } : {
        text?: string,
        classDiv?: string,
        classIcon?: string
    }
) {
    const { dark } = useTheme();
    return (
        <div className={classDiv}>
            <svg
                className={classIcon}
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 256 256"
                fill="currentColor"
                role="img"
                aria-hidden="true"
            >
                <path d="M48,56V200a8,8,0,0,1-16,0V56a8,8,0,0,1,16,0Zm92,54.5L120,117V96a8,8,0,0,0-16,0v21L84,110.5a8,8,0,0,0-5,15.22l20,6.49-12.34,17a8,8,0,1,0,12.94,9.4l12.34-17,12.34,17a8,8,0,1,0,12.94-9.4l-12.34-17,20-6.49A8,8,0,0,0,140,110.5ZM246,115.64A8,8,0,0,0,236,110.5L216,117V96a8,8,0,0,0-16,0v21l-20-6.49a8,8,0,0,0-4.95,15.22l20,6.49-12.34,17a8,8,0,1,0,12.94,9.4l12.34-17,12.34,17a8,8,0,1,0,12.94-9.4l-12.34-17,20-6.49A8,8,0,0,0,246,115.64Z"></path>
            </svg>
            {text && <p className={`font-medium ${dark ? "text-gray-100" : "text-gray-700"}`}>{text}</p>}
        </div>
    );
}