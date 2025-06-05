"use client"

import { ReactNode } from "react";
import Image from "next/image";
import LogoWhite from "../../../public/LogoWhite.svg"
import LogoWordsWhite from "../../../public/LogoWordsWhite.svg"
import { FaBars, FaCross } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx"
import { useState } from "react";

export default function ChatLayout({ children }: { children: ReactNode }) {
    const [clicked, setClicked] = useState<boolean>(false)

    return (
        <div className="flex flex-row bg-[#1E1E1E]">
            <aside className="w-72 border-r border-r-neutral-700 md:flex md:flex-col bg-[#141414]
            hidden">
                <div className="flex flex-row self-center space-x-2 items-center p-4">
                    <Image
                    src={LogoWhite}
                    alt="icon"
                    width={32}
                    height={32}
                    />
                    <Image
                    src={LogoWordsWhite}
                    alt="name"
                    width={100}
                    height={28}
                    className="mt-2"
                    />
                </div>
            </aside>
            <div className="md:hidden absolute top-8 left-5 z-50">
                <FaBars
                className={`${clicked ? "hidden" : "visible"} cursor-pointer text-gray-200 hover:brightness-75
                transition ease-in-out duration-200`}
                size={24}
                onClick={() => setClicked(true)}/>
            </div>
            <aside 
            className={`fixed top-0 left-0 smll:w-64 w-[185px] h-full border-r border-r-neutral-700 flex flex-col
            bg-[#141414] z-50 md:hidden
            duration-300 ease-in-out
            ${clicked ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex flex-row space-x-2 justify-between items-center p-4">
                    <Image
                    src={LogoWhite}
                    alt="icon"
                    width={32}
                    height={32}
                    />
                    <RxCross2
                    className="cursor-pointer text-gray-200 hover:brightness-75
                    transition ease-in-out duration-200"
                    size={32}
                    onClick={() => setClicked(false)}/>
                </div>
            </aside>
            {clicked && (
            <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300"
            onClick={() => setClicked(false)}
            aria-label="Close menu overlay"
            />
            )}
            <main className="w-full ">
                {children}
            </main>
        </div>
    )
}