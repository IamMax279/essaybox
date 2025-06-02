import { ReactNode } from "react";
import Image from "next/image";
import LogoWhite from "../../../public/LogoWhite.svg"
import LogoWordsWhite from "../../../public/LogoWordsWhite.svg"

export default function ChatLayout({ children }: { children: ReactNode }) {
    return (
        <div className="h-screen flex flex-row bg-[#1E1E1E]">
            <aside className="w-64 border-r border-r-neutral-700 flex flex-col bg-[#141414]">
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
            <main className="w-full">
                {children}
            </main>
        </div>
    )
}