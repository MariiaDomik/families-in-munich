import { registerUser } from "@/actions/user";
import FormWrapper from "../common/FormWrapper";
import Input from "../common/Input";
import Button from "../common/Button/Button";
import { ButtonType } from "../common/Button/button.types";
import { useTranslations } from 'next-intl';

export default function RegisterForm() {
    const t = useTranslations();
    const registerSubmit = async (formData: FormData) => {
        "use server"
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        await registerUser({ email, password, name });
    }

    return (
        <FormWrapper title={t('registration.title')} action={registerSubmit}>
            <Input
                type="text"
                label={t('profile.children.name')}
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t('profile.children.name')}
                containerStyle="mb-4 text-left"
                required
            /><Input
                type="email"
                label="E-mail"
                name="email"
                containerStyle="mb-4 text-left"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
                required
            />
            <Input
                type="password"
                label={t('login.btn')}
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
                {t('registration.btn')}
            </Button>

        </FormWrapper>
    )
}