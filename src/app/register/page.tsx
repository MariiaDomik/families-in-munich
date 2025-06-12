import AuthForm, { AuthFormType} from "@/components/auth/AuthForm";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <AuthForm authFormType={AuthFormType.Register}/>
    )
}