import { loginUser } from "@/actions/user";
import FormWrapper from "../common/FormWrapper";
import staticData from "@/services/staticData";
import Input from "../common/Input";
import Button from "../common/Button/Button";
import { ButtonType } from "../common/Button/button.types";

export default function LoginForm() {
    const language = "ENG";
    const data = staticData[language].login;

    const loginSubmit = async (formData: FormData) => {
        "use server"
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        await loginUser();
    }

    return (
        <FormWrapper title={data.title} hadleSubmit={loginSubmit}>
            <Input
                type="text"
                label="Name"
                name="name"
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
    )
}