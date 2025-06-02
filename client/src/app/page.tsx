"use client"

import Image from "next/image";
import Logo from "../../public/Logo.svg"
import LogoWords from "../../public/LogoWords.svg"
import BigButton from "@/components/BigButton";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  return (
    <div className="flex flex-row">
      <section className="h-screen w-1/2 flex flex-col items-center p-4 border-r
      border-r-gray-200 justify-between">
        <div className="flex flex-row space-x-2 items-center">
          <Image
          src={Logo}
          alt="icon"
          width={40}
          height={40}
          />
          <Image
          src={LogoWords}
          alt="name"
          width={128}
          height={36}
          className="mt-2"
          />
        </div>
        <div className="flex flex-col space-y-5">
          <h1 className="w-3/4 font-heming text-center text-5xl flex self-center">
            Asystent AI do pisania rozprawek
          </h1>
          <p className="text-lg text-center w-1/2 flex self-center">
            EssayBox to chatbot AI, który pokazuje, jak pisać lepsze rozprawki – zgodnie z wymaganiami egzaminacyjnymi.
          </p>
          <BigButton
          text="Zacznij używać"
          width="w-[248px]"
          className="flex self-center"
          shadow={true}
          onPress={() => router.push('/sign-in')}
          />
        </div>
        <div></div>
      </section>
      <section className="w-1/2">

      </section>
    </div>
  );
}
