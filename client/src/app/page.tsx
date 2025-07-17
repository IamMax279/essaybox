"use client"

import Image from "next/image";
import Logo from "../../public/Logo.svg"
import LogoWords from "../../public/LogoWords.svg"
import BigButton from "@/components/BigButton";
import { useRouter } from "next/navigation";
import { useAnimation } from "@/hooks/useAnimation";
import LogoWhite from "../../public/LogoWhite.svg"
import DisplayInputField1 from "../../public/DisplayInputField1.svg"
import DisplayInputField2 from "../../public/DisplayInputField2.svg"
import DisplayInputField3 from "../../public/DisplayInputField3.svg"
import DisplayOutput1 from "../../public/DisplayOutput1.svg"
import DisplayOutput2 from "../../public/DisplayOutput2.svg"
import DisplayOutput3 from "../../public/DisplayOutput3.svg"
import "animate.css";

export default function Home() {
  const router = useRouter()
  const animation = useAnimation(3, 10000)

  return (
    <div className="flex xl:flex-row flex-col xl:overflow-y-hidden">
      <section className="xl:h-screen xl:w-1/2 flex flex-col items-center p-4 xl:border-r
      xl:border-r-gray-200 justify-between min-h-[80vh]">
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
      <section className="xl:w-1/2 bg-[#1E1E1E]">
        {animation % 3 === 1 ?
        <div className="flex flex-col justify-center items-center min-h-screen xl:h-full"
        key={animation}>
          <Image
          src={DisplayInputField1}
          alt="input1"
          className="relative xl:bottom-8 xl:py-0 pt-y animate__animated animate__fadeInUp"
          />
          <div className="flex flex-row space-x-4 relative animate__animated animate__delay-1s animate__fadeInUp">
            <Image
            src={DisplayOutput1}
            alt="output1"
            className="relative right-8 pb-6 xl:pb-0"
            />
            <Image
            src={LogoWhite}
            alt="logo"
            width={52}
            height={52}
            className="absolute top-0 -right-8"
            />
          </div>
        </div>
        :
        animation % 3 === 2 ?
        <div className="flex flex-col justify-center items-center min-h-screen xl:h-full"
        key={animation}>
          <Image
          src={DisplayInputField2}
          alt="input1"
          className="relative xl:bottom-8 xl:py-0 py-6 animate__animated animate__fadeInUp"
          />
          <div className="flex flex-row space-x-4 relative animate__animated animate__delay-1s animate__fadeInUp">
            <Image
            src={DisplayOutput2}
            alt="output1"
            className="relative right-8 pb-6 xl:pb-0"
            />
            <Image
            src={LogoWhite}
            alt="logo"
            width={52}
            height={52}
            className="absolute top-0 -right-8"
            />
          </div>
        </div>
        :
        <div className="flex flex-col justify-center items-center min-h-screen xl:h-full"
        key={animation}>
          <Image
          src={DisplayInputField3}
          alt="input1"
          className="relative xl:bottom-8 xl:py-0 py-6 animate__animated animate__fadeInUp"
          />
          <div className="flex flex-row space-x-4 relative animate__animated animate__delay-1s animate__fadeInUp">
            <Image
            src={DisplayOutput3}
            alt="output1"
            className="relative right-8 pb-6 xl:pb-0"
            />
            <Image
            src={LogoWhite}
            alt="logo"
            width={52}
            height={52}
            className="absolute top-0 -right-8"
            />
          </div>
        </div>
        }
      </section>
    </div>
  );
}
