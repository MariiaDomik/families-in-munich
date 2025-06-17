import { joinClassnames } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    name?: string;
    type?: string;
    containerStyle?: string;
}

const baseInputStyle = "border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm";

export default function Input({ children, label, name, type='text', className, containerStyle, ...props } : InputProps) {
    return (
        <div className={joinClassnames("flex flex-col gap-1", containerStyle)}>
            {label && <label className="text-sm font-medium text-gray-700"
            htmlFor={name}>{label}</label>}
            <input name={name} type={type} id={name}
            className={joinClassnames(baseInputStyle, className)} {...props} >
            </input>
            {children}
        </div>
    )
}