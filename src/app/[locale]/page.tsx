'use client'
import Button from "@/components/common/Button/Button";
import { ButtonType } from "@/components/common/Button/button.types";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const locale = useLocale();
  const t = useTranslations();
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-1/2 m-auto">
      <h1>{t('home.h1')}</h1>
      <p>{t('home.description')}</p>
      <Link href={`/${locale}/start`}>
        <Button>{t('home.btn_start')}</Button>
      </Link>
      <Link href={`/${locale}/login`}>
        <Button buttonType={ButtonType.Secondary}>{t('home.btn_login')}</Button>
      </Link>
      <Link href={`/${locale}/register`}>
        <Button buttonType={ButtonType.Secondary}>{t('home.btn_register')}</Button>
      </Link>
    </div>
  );
}
