'use client';
import FormWrapper from "../common/FormWrapper";
import staticData from "@/services/staticData";
import Input from "../common/Input";
import Button from "../common/Button/Button";
import { ButtonType } from "../common/Button/button.types";
import GoogleAuthButton from "../auth/GoogleAuthButton";
import { signIn } from "next-auth/react";
import { useState } from "react";
import router from "next/router";

export default function LoginForm() {
    const language = "ENG";
    const data = staticData[language].login;
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const result = await signIn("credentials", {
            email,
            password,
            redirect: true,
        });
        if (result?.error) {
            setError(error);
        } else {
            setError("Login successful");
            router.push("/");
        }
    };

    return (
        <div>
        <FormWrapper title={data.title} className="space-y-6" onSubmit={handleSubmit}>
            <Input
                type="text"
                label="Email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your name here..."
                containerStyle="mb-4 text-left"
                required
            />
            <Input
                type="password"
                label="Password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                containerStyle="mb-6 text-left"
                required
            />

            <Button
                type="submit"
                buttonType={ButtonType.Primary}
                className="w-full"
            >
                {data.btn}
            </Button>


        </FormWrapper>
            <GoogleAuthButton />
            </div>
    )
}