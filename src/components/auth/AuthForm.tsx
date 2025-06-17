import Link from "next/link";
import Input from "../common/Input";
import Button from "../common/Button/Button";
import { ButtonType } from "../common/Button/button.types";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export enum AuthFormType {
    Register = "register",
    Login = "login"
}

interface AuthFormProps {
    authFormType: AuthFormType;
}

export default function AuthForm({ authFormType } : AuthFormProps) {

    return (
        <div className="flex items-center justify-center min-h-screen ">
    
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
    
            {/* Header with Tabs */}
            <div className="grid grid-cols-2 text-center  bg-amber-200 text-amber-900" 
             >
              <Link href="/login" className="flex-1 py-4 font-medium">
                  Sign In
              </Link>
    
              <p className="flex-1 py-4 font-medium bg-white text-green-600">Sign Up</p>
            </div>
    
          {(authFormType == AuthFormType.Login) ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
    )
}