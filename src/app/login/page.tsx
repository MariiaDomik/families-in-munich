import AuthForm, { AuthFormType } from "@/components/auth/AuthForm";
import Link from "next/link";

export default function LoginPage() {
    return (
        <AuthForm authFormType={AuthFormType.Login}/>
    )
}