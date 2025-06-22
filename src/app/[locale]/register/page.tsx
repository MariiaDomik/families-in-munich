import AuthForm, { AuthFormType } from "@/components/auth/AuthForm";

export default function RegisterPage() {
    return <AuthForm authFormType={AuthFormType.Register} />;
}