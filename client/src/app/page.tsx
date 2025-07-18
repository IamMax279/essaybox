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
import { GoDotFill } from "react-icons/go";
import { useEffect, useState } from "react";

export default function Home() {
  const [animation, setAnimation] = useState<number>(3)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => setAnimation(animation + 1), 10000)
    return () => clearInterval(timer)
  }, [animation])

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
      <section className="xl:w-1/2 bg-[#1E1E1E] flex flex-col min-h-screen xl:h-full justify-between relative">
        {animation % 3 === 1 ?
        <div className="flex flex-col justify-center items-center min-h-screen xl:h-full"
        key={animation}>
          <Image
          src={DisplayInputField1}
          alt="input1"
          className="relative xl:bottom-8 xl:py-0 sm:w-[578px] xsmll:w-[420px] w-[350px] py-6 animate__animated animate__fadeInUp"
          />
          <div className="flex flex-row space-x-4 relative animate__animated animate__delay-1s animate__fadeInUp">
            <Image
            src={DisplayOutput1}
            alt="output1"
            className="relative sm:right-8 right-7 pb-6 xl:pb-0 sm:w-[513px] xsmll:w-[380px] w-[300px]"
            />
            <Image
            src={LogoWhite}
            alt="logo"
            className="absolute top-0 sm:-right-8 -right-7 sm:w-[52px] sm:h-[52px] w-[40px] h-[40px]"
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
          className="relative xl:bottom-8 xl:py-0 sm:w-[578px] xsmll:w-[420px] w-[350px] py-6 animate__animated animate__fadeInUp"
          />
          <div className="flex flex-row space-x-4 relative animate__animated animate__delay-1s animate__fadeInUp">
            <Image
            src={DisplayOutput2}
            alt="output1"
            className="relative sm:right-8 right-7 pb-6 xl:pb-0 sm:w-[513px] xsmll:w-[380px] w-[300px]"
            />
            <Image
            src={LogoWhite}
            alt="logo"
            className="absolute top-0 sm:-right-8 -right-7 sm:w-[52px] sm:h-[52px] w-[40px] h-[40px]"
            />
          </div>
        </div>
        :
        <div className="flex flex-col justify-center items-center min-h-screen xl:h-full"
        key={animation}>
          <Image
          src={DisplayInputField3}
          alt="input1"
          className="relative xl:bottom-8 xl:py-0 sm:w-[578px] xsmll:w-[420px] w-[350px] py-6 animate__animated animate__fadeInUp"
          />
          <div className="flex flex-row space-x-4 relative animate__animated animate__delay-1s animate__fadeInUp">
            <Image
            src={DisplayOutput3}
            alt="output1"
            className="relative sm:right-8 right-7 pb-6 xl:pb-0 sm:w-[513px] xsmll:w-[380px] w-[300px]"
            />
            <Image
            src={LogoWhite}
            alt="logo"
            className="absolute top-0 sm:-right-8 -right-7 sm:w-[52px] sm:h-[52px] w-[40px] h-[40px]"
            />
          </div>
        </div>
        }
        <div className="flex flex-row space-x-[2px] justify-center items-center absolute bottom-16 left-1/2">
          {[0, 1, 2].map((i) => (
            <GoDotFill
              key={i}
              size={14}
              className={`cursor-pointer hover:text-gray-500 transition-all duration-200 ease-in-out
              ${((animation % 3) === ((i + 1) % 3) ? "text-gray-600" : "text-gray-400")}`}
              onClick={() => setAnimation(i + 1)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
