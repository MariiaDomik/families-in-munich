import Link from "next/link";
import Input from "../common/input/Input";
import Button from "../common/Button/Button";
import { ButtonType } from "../common/Button/button.types";

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
    
            {/* Form Body */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Create Account
              </h2>
    
              <form 
              // action={RegisterUser}
              >
                <div className="mb-4 text-left">
                  <Input
                    type="text"
                    label="Name"
                    name="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your name here..."
                    required
                  />
                </div>
    
                <div className="mb-4 text-left">
                  <Input
                    type="email"
                    label="E-mail"
                    name="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>
    
                <div className="mb-6 text-left">
                  <Input
                    type="password"
                    label="Password"
                    name="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
    
                <Button
                  type="submit"
                  buttonType={ButtonType.Primary}
                  className="w-full"
                  >
                  Sign up
                </Button>
              </form>
            </div>
          </div>
        </div>
    )
}