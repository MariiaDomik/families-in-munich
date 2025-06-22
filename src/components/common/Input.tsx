import { joinClassnames } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    name?: string;
    type?: string;
    containerStyle?: string;
}

const baseInputStyle = "w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400";

export default function Input({ children, label, name, type='text', className, containerStyle, ...props } : InputProps) {
    return (
        <div className={joinClassnames("flex flex-col gap-2", containerStyle)}>
            {label && (
                <label 
                    className="text-sm font-medium text-gray-700 mb-1" 
                    htmlFor={name}
                >
                    {label}
                </label>
            )}
            <input 
                name={name} 
                type={type} 
                id={name}
                className={joinClassnames(baseInputStyle, className)} 
                {...props} 
            />
            {children}
        </div>
    )
}