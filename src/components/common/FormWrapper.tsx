interface FormWrapperProps {
    title?: string;
    children: React.ReactNode;
    hadleSubmit: (formData: FormData) => Promise<void>;
}

export default function FormWrapper({ title, children, hadleSubmit } : FormWrapperProps ) {
    return (
        <div className="p-6">
            <h2>{title}</h2>
            <form className="" action={hadleSubmit}>
                {children}
            </form>
        </div>
    )
}