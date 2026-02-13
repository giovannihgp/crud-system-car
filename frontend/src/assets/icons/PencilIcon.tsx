import { useTheme } from "../../contexts/ThemeContext";

export default function PencilIcon(
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
                <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
            </svg>
            {text && <p className={`font-medium ${dark ? "text-gray-100" : "text-gray-700"}`}>{text}</p>}
        </div>
        
    );
}