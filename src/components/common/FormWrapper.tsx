interface FormWrapperProps extends React.FormHTMLAttributes<HTMLFormElement>{
    title?: string;
    children: React.ReactNode;
    className?: string;   
}

export default function FormWrapper({ title, children, className, ...props} : FormWrapperProps ) {
    return (
        <div className="p-6">
            <h2>{title}</h2>
            <form className={className} {...props}>
                {children}
            </form>
        </div>
    )
}