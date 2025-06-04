"use client"

import Logo from "../../../public/Logo.svg"
import Image from "next/image"
import { signinSchema } from "@/schemas/SignInSchema"
import { useFormik } from "formik"
import { SiGoogle } from "react-icons/si";
import BigButton from "@/components/BigButton"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export default function SignIn() {
    const [secure, setSecure] = useState<boolean>(true)
    const [signInError, setSignInError] = useState<string | null>(null)

    const router = useRouter()

        const { mutate: handleSignIn, isPending } = useMutation({
        mutationFn: async ({ email, password }: { email: string, password: string }) => {
            setSignInError(null)
            // await axios.post("/api/auth/sign-in", { email, password })
            await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/user/sign-in`,
                { email, password },
                { withCredentials: true }
            )
        },
        onSuccess: (data) => {
            router.push("/chat/nowy")
        },
        onError: (error: any) => {
            setSignInError(error.response?.data.message || error.message)
        }
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: signinSchema,
        onSubmit: (values) => handleSignIn({ email: values.email, password: values.password })
    })

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <Image
            src={Logo}
            alt="logo"
            width={80}
            height={80}/>
            <form
            className="flex flex-col items-center border border-gray-300
            rounded-lg mt-6 p-4 sm:w-96 w-72"
            onSubmit={formik.handleSubmit}>
                <h2 className="text-3xl font-medium">
                    Zaloguj się
                </h2>
                <div className="flex flex-row items-center py-2 px-3 mt-4 rounded-2xl border border-gray-300
                sm:w-[344px] w-[248px] justify-center cursor-pointer hover:brightness-90 bg-white transition
                duration-200 sm:space-x-0 space-x-1"
                onClick={() => window.location.href = "/api/auth/google"}>
                    <SiGoogle size={24} className="mr-2"/>
                    <p className="text-base font-heming">
                        Kontynuuj z Google
                    </p>
                </div>
                <div className="flex flex-row items-center justify-center space-x-1 sm:w-[344px]
                w-[248px] mt-3">
                    <div className="border-b border-black w-full"></div>
                    <p className="font-heming">LUB</p>
                    <div className="border-b border-black w-full"></div>
                </div>
                <div className="flex flex-col space-y-4 -mt-1">
                    <div>
                        <input
                        {...formik.getFieldProps('email')}
                        placeholder="Adres e-mail"
                        className={`border border-gray-200 min-w-64 mt-4 py-2 px-3 rounded-lg outline-none
                        font-base sm:w-[344px] w-[248px] focus:outline-none focus:ring-2 focus:ring-blue-300
                        transition self-center
                        ${formik.touched.email && formik.errors.email ? "border border-red-500" : undefined}`}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <span className="text-red-500 text-sm">
                                {formik.errors.email}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-row items-center relative">
                        <div>
                            <input
                            {...formik.getFieldProps('password')}
                            type={secure ? "password" : "text"}
                            placeholder="Hasło"
                            className={`border border-gray-200 min-w-64 py-2 px-3 rounded-lg outline-none
                            font-base sm:w-[344px] w-[248px] focus:outline-none focus:ring-2 focus:ring-blue-300
                            transition flex self-center
                            ${formik.touched.password && formik.errors.password ? "border border-red-500" : undefined}`}
                            />
                            {formik.touched.password && formik.errors.password && (
                            <span className="text-red-500 text-sm">
                                {formik.errors.password}
                            </span>
                        )}
                        </div>
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
                </div>
                {signInError &&
                <p className="flex self-center text-red-500 -mb-1 mt-2 text-center">
                    {signInError}
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
            <div className="flex flex-row space-x-1 mt-4">
                <p>
                    Nie masz konta?
                </p>
                <p className="text-bigbutton cursor-pointer hover:brightness-110 transition duration-200"
                onClick={() => router.push('/sign-up')}>
                    Zarejestruj się
                </p>
            </div>
        </div>
    )
}