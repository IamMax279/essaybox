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
import type { EssayData, UserData } from "../../../../@types";
import { useRouter } from "next/navigation";
import { IoCreateOutline } from "react-icons/io5";
import BigButton from "@/components/BigButton";
import { EssayListContext } from "@/providers/EssayListProvider";
import { MdAccountCircle } from "react-icons/md";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter
} from "@heroui/modal";
import { Button } from "@nextui-org/button"
import SmallButton from "@/components/SmallButton";
import { FaCheck } from "react-icons/fa6";

export default function ChatLayout({ children }: { children: ReactNode }) {
    const [clicked, setClicked] = useState<boolean>(false)
    const [essays, setEssays] = useState<EssayData[]>([])
    const [initialAmount, setInitialAmount] = useState<number>(20)
    const [hasMore, setHasMore] = useState<boolean>(false)
    const [accountActive, setAccountActive] = useState<boolean>(false)
    const [userData, setUserData] = useState<UserData | null>(null)
    const [options, setOptions] = useState<'konto' | 'subskrypcje'>('konto')

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

    const { mutate: getUserAccountData } = useMutation({
        mutationFn: async () => {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/user/get-user-account-data`,
                { withCredentials: true }
            )
            return response.data
        },
        onSuccess: (data) => {
            console.log("response:", data)
            setUserData(data.userData)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const { mutate: subscriptionRedirect } = useMutation({
        mutationFn: async () => {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/payments/subscribe`,
                { withCredentials: true }
            )
            return response.data
        },
        onSuccess: (data) => {
            window.location.href = data.url
        },
        onError: (error) => {
            console.log("ERROROR", error)
        }
    })

    const { mutate: logOut } = useMutation({
        mutationFn: async () => {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/user/logout`,
                { withCredentials: true }
            )
            return response.data
        },
        onSuccess: (data) => {
            window.location.href = '/sign-in'
        },
        onError: (error) => {
            console.error(error)
        }
    })

    useEffect(() => {
        getNEssays()
        getUserAccountData()
    }, [])

    const refetchEssays = () => getNEssays()

    return (
        <EssayListContext value={{ essays, setEssays, refetchEssays }}>
            <div className="flex flex-row bg-[#1E1E1E] relative">
                <div className="absolute top-8 sdbr:right-8 right-5">
                    <MdAccountCircle
                    size={36}
                    className="text-gray-200 cursor-pointer hover:brightness-75
                    transition ease-in-out duration-200"
                    onClick={() => setAccountActive(true)}
                    />
                </div>
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
                                <div key={i}>
                                    <p
                                    className="text-white rounded-lg cursor-pointer ml-1 mr-2 text-[15px]
                                    hover:bg-[#1E1E1E] p-2 transition-all ease-in-out duration-250"
                                    onClick={() => router.push(`/chat/${e.urlIdentifier}`)}>
                                        {e.title.length > 26 ? e.title.substring(0, 26) + "..." : e.title}
                                    </p>
                                    {i === essays.length - 1 &&
                                    <div className="my-2"></div>
                                    }
                                </div>
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
                        <div className="flex flex-row items-center space-x-2 mx-2 mb-1
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
                        <div className="flex flex-col space-y-2">
                            {essays.map((e, i) => (
                                <div key={i}>
                                    <p
                                    className="text-white font-thin rounded-lg cursor-pointer mx-2 text-[15px]
                                    hover:bg-[#1E1E1E] p-2 transition-all ease-in-out duration-250"
                                    onClick={() => router.push(`/chat/${e.urlIdentifier}`)}>
                                        {e.title.length > 18 ? e.title.substring(0, 18) + "..." : e.title}
                                    </p>
                                    {i === essays.length - 1 &&
                                    <div className="my-2"></div>
                                    }
                                </div>
                            ))}
                            {hasMore &&
                            <>
                                <BigButton
                                text='Więcej...'
                                width="md:w-48 w-36"
                                className='mb-2 self-center'
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
            {accountActive &&
            <Modal
            isOpen={true}
            isDismissable={true}
            onOpenChange={setAccountActive}
            hideCloseButton={true}
            size="4xl"
            className={`flex self-center mx-4 h-96 shadow-[0_2px_16px_0_#121212]
            bg-[#1E1E1E]/90 border border-neutral-700 ${options === 'subskrypcje' ? "h-64" : ""}`}
            >
                <ModalContent className='pt-4 pb-2'>
                    <>
                    <ModalBody
                    className={`flex flex-row relative`}>
                        <RxCross2
                        className="absolute top-2 right-4 cursor-pointer text-gray-200 hover:brightness-75
                        transition ease-in-out duration-200"
                        size={30}
                        onClick={() => setAccountActive(false)}
                        />
                        <div className={`${options === 'subskrypcje' ? "w-[120px]" : "w-[136px]"} border-r border-r-neutral-700
                        ${options === 'subskrypcje' ? 'relative bottom-2': ''}`}>
                            {['konto', 'subskrypcje'].map((o, i) => (
                                <div
                                key={i}
                                className={`mb-2 text-white hover:brightness-75 transition-all
                                duration-200 ease-in-out cursor-pointer font-heming
                                ${o === 'subskrypcje' ? "-mr-2" : ""}`}
                                onClick={() => setOptions(o as 'konto' | 'subskrypcje')}>
                                    {o[0].toUpperCase() + o.substring(1)}
                                </div>
                            ))}
                        </div>
                        {options === 'konto' ? 
                        <div className="flex flex-col w-full space-y-4">
                            <div className="flex flex-row">
                                <h1 className="font-heming text-2xl text-white">
                                    D
                                </h1>
                                <h1 className="font-heming text-2xl text-white relative right-[3px]">
                                    ane Konta
                                </h1>
                            </div>
                            <div className="flex flex-col w-full mt-2">
                                <label className="text-white font-heming">
                                    E-mail
                                </label>
                                <div className="text-white font-outfit mt-1 p-2 border border-neutral-700 rounded-lg w-full">
                                    {userData?.email}
                                </div>
                            </div>
                            {userData?.provider !== 'google' &&
                            <div className="flex flex-col w-full mt-2">
                                <label className="text-white font-heming">
                                    Hasło
                                </label>
                                <div className="text-white font-outfit mt-1 p-2 border border-neutral-700 rounded-lg w-full">
                                    <div className="flex flex-row items-center justify-between">
                                        <p>●●●●●●●●●</p>
                                        <SmallButton
                                        text="Zmień hasło"
                                        onPress={() => router.push('/reset-password')}
                                        />
                                    </div>
                                </div>
                            </div>
                            }
                            <SmallButton
                            text="Wyloguj"
                            className="text-white"
                            width="w-32"
                            onPress={() => logOut()}
                            />
                            <SmallButton
                            text="Usuń konto"
                            className="text-white bg-red-800"
                            width="w-32"
                            border={false}
                            onPress={() => router.push('/reset-password')}
                            />
                        </div>
                        :
                        <div>
                            <div className="border border-bigbutton/70 rounded-lg h-full bg-[#1E1E1E] w-[330px] p-4
                            flex flex-col relative bottom-2">
                                <div className="flex flex-row justify-between items-center">
                                    <p className="font-heming text-3xl text-white">
                                        Pro
                                    </p>
                                    <p className="font-heming text-white">
                                        39.99zł/msc
                                    </p>
                                </div>
                                <div className="flex flex-row items-center text-bigbutton mt-2">
                                    <FaCheck
                                    size={24}
                                    />
                                    <p className="ml-2 text-white relative top-[2px]">
                                        Do 100 rozprawek miesięcznie
                                    </p>
                                </div>
                                <div className="flex flex-row items-center text-bigbutton mt-2">
                                    <FaCheck
                                    size={24}
                                    />
                                    <p className="ml-2 text-white relative top-[2px]">
                                        Eksportowanie rozprawek do PDF
                                    </p>
                                </div>
                                <div className="flex flex-row items-center text-bigbutton mt-2">
                                    <FaCheck
                                    size={24}
                                    />
                                    <p className="ml-2 text-white relative top-[2px]">
                                        Opcja generowania 3 akapitów
                                    </p>
                                </div>
                                <BigButton
                                text="Subskrybuj"
                                width="w-full"
                                className="mt-4"
                                />
                            </div>
                            {/* TODO: Subskrypcje */}
                        </div>
                        }
                    </ModalBody>
                    </>
                </ModalContent>
            </Modal>
            }
        </EssayListContext>
    )
}