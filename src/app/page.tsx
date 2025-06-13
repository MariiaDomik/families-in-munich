import Button from "@/components/common/Button/Button";
import { ButtonType } from "@/components/common/Button/button.types";
import staticData from "@/services/staticData";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const language = "ENG";
  const data = staticData[language].home;
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-1/2 m-auto">
      <h1>{data.h1}</h1>
      <p>{data.description}</p>
      <Link href={"/start"}>
        <Button>{data.btn_start}</Button>
      </Link>
      <Link href={"/login"}>
        <Button buttonType={ButtonType.Secondary}>{data.btn_login}</Button>
      </Link>
      <Link href={"/register"}>
        <Button buttonType={ButtonType.Secondary}>{data.btn_register}</Button>
      </Link>
    </div>
  );
}
