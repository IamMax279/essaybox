"use client"

import { useMutation } from "@tanstack/react-query"
import React, { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import BigButton from "@/components/BigButton"
import Image from "next/image"
import Logo from "../../../public/Logo.svg"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"

export default function DeleteAccount() {
    const [password, setPassword] = useState<string>("")
    const [deleteError, setDeleteError] = useState<string | null>(null)
    const [secure, setSecure] = useState<boolean>(true)

    const router = useRouter()

    const { mutate: handleDelete, isPending } = useMutation({
        mutationFn: async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/user/delete-account`,
                { password },
                { withCredentials: true }
            )

            return response.data
        },
        onSuccess: (data) => {
            console.log("data:", data)
            if (data.success) {
                router.replace('/sign-in')
            }
        },
        onError: (error: any) => {
            console.log("error:", error)
            setDeleteError(error.response.data.message || error.message)
        }
    })

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Image
            src={Logo}
            alt="logo"
            width={80}
            height={80}/>
            <form
            className="flex flex-col items-center border border-gray-300
            rounded-lg mt-6 p-4 sm:w-96 w-72"
            onSubmit={(e) => handleDelete(e)}>
                <h2 className="text-3xl font-medium">
                    Usuwanie konta
                </h2>
                    <div className="flex flex-row items-center relative mt-4">
                        <input
                        type={secure ? "password" : "text"}
                        placeholder="Hasło"
                        className={`border border-gray-200 min-w-64 py-2 px-3 rounded-lg outline-none
                        font-base sm:w-[344px] w-[248px] focus:outline-none focus:ring-2 focus:ring-blue-300
                        transition flex self-center`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        {secure ?
                        <FaRegEye
                        size={20}
                        className="absolute top-[10px] right-4 cursor-pointer"
                        onClick={() => setSecure(false)}/>
                        :
                        <FaRegEyeSlash
                        size={20}
                        className="absolute top-[10px] right-4 cursor-pointer"
                        onClick={() => setSecure(true)}/>
                        }
                    </div>
                {deleteError &&
                <p className="flex self-center text-red-500 -mb-1 mt-2 text-center">
                    {deleteError}
                </p>
                }
                <p className="text-bigbutton cursor-pointer hover:brightness-110 transition duration-200
                flex self-center mt-2"
                onClick={() => router.push('/forgot-password')}>
                    Nie pamiętam hasła
                </p>
                <BigButton
                text="Dalej"
                width="sm:w-[344px] w-[248px]"
                onPress={() => {}}
                className="mt-3"
                loading={isPending}
                type="submit"
                />
            </form>
        </div>
    )
}