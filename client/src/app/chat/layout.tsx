"use client"

import { ReactNode, useEffect } from "react";
import Image from "next/image";
import LogoWhite from "../../../public/LogoWhite.svg"
import LogoWordsWhite from "../../../public/LogoWordsWhite.svg"
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx"
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { EssayData } from "../../../../@types";
import { useRouter } from "next/navigation";
import { IoCreateOutline } from "react-icons/io5";
import BigButton from "@/components/BigButton";

export default function ChatLayout({ children }: { children: ReactNode }) {
    const [clicked, setClicked] = useState<boolean>(false)
    const [essays, setEssays] = useState<EssayData[]>([])
    const [initialAmount, setInitialAmount] = useState<number>(15)
    const [hasMore, setHasMore] = useState<boolean>(false)

    const router = useRouter()

    const { mutate: getNEssays, isPending } = useMutation({
        mutationFn: async () => {
            return await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/user/get-n-essays`,
                { n: initialAmount },
                { withCredentials: true }
            )
        },
        onSuccess: (data) => {
            setInitialAmount(prev => prev + 20)

            setEssays(data.data.essays)
            setHasMore(data.data.hasMore)
        },
        onError: (error) => {
            console.log("Error fetching user's essays:", error)
        }
    })

    useEffect(() => {
        getNEssays()
    }, [])

    return (
        <div className="flex flex-row bg-[#1E1E1E]">
            <aside className="hidden sdbr:fixed sdbr:top-0 sdbr:left-0 sdbr:h-full sdbr:w-64 sdbr:flex
            sdbr:flex-col border-r border-r-neutral-700 bg-[#141414] z-30
            overflow-y-auto scrollbar-thumb-gray-500 scrollbar-track-[#3b3b3b] scrollbar-thin">
                <div className="flex flex-col sticky top-0 z-50 mb-6 border-b border-b-[#2E2E2E] bg-[#141414]">
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
                    <div className="flex flex-row items-center space-x-2 ml-1 mr-2 mt-2 mb-1
                    rounded-lg cursor-pointer hover:bg-[#1E1E1E] p-2 transition-all
                    ease-in-out duration-250"
                    onClick={() => router.push('/chat/nowy')}>
                        <IoCreateOutline
                        size={28}
                        className="text-white"
                        />
                        <p className="text-white font-heming relative top-[2px]">
                            Nowa rozprawka
                        </p>
                    </div>
                </div>
                {(essays.length > 0) &&
                <div className="mt-2 flex flex-col space-y-2 relative z-60">
                    <h2 className="ml-3 font-heming text-white/50">
                        Rozprawki
                    </h2>
                    <div className="flex flex-col space-y-2">
                        {essays.map((e, i) => (
                            <p
                            key={i}
                            className="text-white rounded-lg cursor-pointer ml-1 mr-2 text-[15px]
                            hover:bg-[#1E1E1E] p-2 transition-all ease-in-out duration-250"
                            onClick={() => router.push(`/chat/${e.urlIdentifier}`)}>
                                {e.title.length > 27 ? e.title.substring(0, 27) + "..." : e.title}
                            </p>
                        ))}
                        {hasMore &&
                        <>
                            <BigButton
                            text='Więcej...'
                            width="w-48"
                            className='my-2 self-center'
                            bg="bg-[#2A2A2A]/60"
                            type='submit'
                            loading={isPending}
                            onPress={() => getNEssays()}
                            />
                            <div className="my-2"></div>
                        </>
                        }
                    </div>
                </div>
                }
            </aside>
            <div className="sdbr:hidden absolute top-8 left-5 z-50">
                <FaBars
                className={`${clicked ? "hidden" : "visible"} cursor-pointer text-gray-200 hover:brightness-75
                transition ease-in-out duration-200`}
                size={32}
                onClick={() => setClicked(true)}/>
            </div>
            <aside 
            className={`fixed top-0 left-0 smll:w-64 w-[185px] overflow-y-auto max-h-screen border-r border-r-neutral-700 flex flex-col
            scrollbar-thumb-gray-500 scrollbar-track-[#3b3b3b] scrollbar-thin bg-[#141414] z-50 md:hidden
            duration-300 ease-in-out
            ${clicked ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex flex-col sticky top-0 z-50 mb-6 border-b border-b-[#2E2E2E] bg-[#141414]">
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
                    <div className="flex flex-row items-center space-x-2 mx-2
                        rounded-lg cursor-pointer hover:bg-[#1E1E1E] p-2 transition-all
                        ease-in-out duration-250"
                        onClick={() => router.push('/chat/nowy')}>
                        <IoCreateOutline
                        size={28}
                        className="text-white"
                        />
                        <p className="text-white font-heming relative top-[2px]">
                            Nowa rozprawka
                        </p>
                    </div>
                </div>
                {(essays.length > 0) &&
                <div className="mt-2 flex flex-col space-y-2 relative z-60">
                    <h2 className="ml-4 font-heming text-white/50">
                        Rozprawki
                    </h2>
                    {essays.map((e, i) => (
                        <p
                        key={i}
                        className="text-white font-thin rounded-lg cursor-pointer mx-2 text-[15px]
                        hover:bg-[#1E1E1E] p-2 transition-all ease-in-out duration-250"
                        onClick={() => router.push(`/chat/${e.urlIdentifier}`)}>
                            {e.title.length > 26 ? e.title.substring(0, 27) + "..." : e.title}
                        </p>
                    ))}
                </div>
                }
            </aside>
            {clicked && (
            <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300"
            onClick={() => setClicked(false)}
            aria-label="Close menu overlay"
            />
            )}
            <main className="notebook-grid w-full sdbr:ml-64 h-screen overflow-y-auto scrollbar-thumb-gray-500 scrollbar-track-[#3b3b3b] scrollbar-thin">
                {children}
            </main>
        </div>
    )
}