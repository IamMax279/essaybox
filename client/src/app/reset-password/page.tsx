"use client"

import { resetPasswordSchema } from "@/schemas/ResetPasswordSchema"
import { useState } from "react"
import Image from "next/image"
import Logo from "../../../public/Logo.svg"
import { useFormik } from "formik"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import BigButton from "@/components/BigButton"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter
} from "@heroui/modal";
import { Button } from "@nextui-org/button"

export default function ResetPassword() {
    const [success, setSuccess] = useState<boolean>(false)
    const [secure, setSecure] = useState<boolean>(true)
    const [secureConfirm, setSecureConfirm] = useState<boolean>(true)
    const [passwordResetError, setPasswordResetError] = useState<string | null>(null)

    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const router = useRouter()

    const { mutate: handlePasswordReset, isPending } = useMutation({
        mutationFn: async ({ password }: { password: string }) => {
            if (!token) {
                throw new Error("Wystąpił błąd. Upewnij się, że korzystasz z linka wysłanego na adres e-mail.")
            }

            await axios.post("/api/auth/reset-password", {
                password, token
            })
        },
        onSuccess: async (data) => {
            await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/user/logout`,
                {},
                { withCredentials: true }
            )

            setSuccess(true)
        },
        onError: (error: any) => {
            setPasswordResetError(error.response?.data.message || error.message)
        }
    })

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        validationSchema: resetPasswordSchema,
        onSubmit: (values) => handlePasswordReset({ password: values.password })
    })

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            {!success ? 
            <>
                <Image
                src={Logo}
                alt="logo"
                width={80}
                height={80}/>
                <form className="flex flex-col items-center border border-gray-300
                rounded-lg mt-6 p-4 sm:w-96 w-72"
                onSubmit={formik.handleSubmit}>
                    <h2 className="text-3xl font-medium">
                        Zmiana hasła
                    </h2>
                    <div className="flex flex-col space-y-4 mt-4">
                        <div className="flex flex-row items-center relative">
                            <div>
                                <input
                                {...formik.getFieldProps('password')}
                                type={secure ? "password" : "text"}
                                placeholder="Nowe hasło"
                                className={`border border-gray-200 min-w-64 py-2 px-3 rounded-lg outline-none
                                font-base sm:w-[344px] w-[248px] focus:outline-none focus:ring-2 focus:ring-blue-300
                                transition self-center
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
                        <div className="flex flex-row items-center relative">
                            <div>
                                <input
                                {...formik.getFieldProps('confirmPassword')}
                                type={secureConfirm ? "password" : "text"}
                                placeholder="Potwierdź hasło"
                                className={`border border-gray-200 min-w-64 py-2 px-3 rounded-lg outline-none
                                font-base sm:w-[344px] w-[248px] focus:outline-none focus:ring-2 focus:ring-blue-300
                                transition flex self-center
                                ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "border border-red-500" : undefined}`}
                                />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <span className="text-red-500 text-sm">
                                    {formik.errors.confirmPassword}
                                </span>
                                )}
                            </div>
                            {secureConfirm ?
                            <FaRegEye
                            size={20}
                            className="absolute top-[10px] right-4 cursor-pointer"
                            onClick={() => setSecureConfirm(false)}/>
                            :
                            <FaRegEyeSlash
                            size={20}
                            className="absolute top-[10px] right-4 cursor-pointer"
                            onClick={() => setSecureConfirm(true)}/>
                            }
                        </div>
                    </div>
                    {passwordResetError &&
                    <p className="flex self-center text-red-500 -mb-1 mt-2 text-center">
                        {passwordResetError}
                    </p>
                    }
                    <BigButton
                    text="Zmień hasło"
                    width="sm:w-[344px] w-[248px]"
                    className="mt-4"
                    loading={isPending}
                    type="submit"
                    />
                </form>
            </>
            :
            <Modal
            isOpen={true}
            isDismissable={false}
            hideCloseButton={true}
            >
                <ModalContent className='bg-white pt-4 pb-2'>
                    <>
                    <ModalBody>
                        <p className='text-center text-lg'>
                        Hasło do Twojego konta zostało zmienione.
                        </p>
                    </ModalBody>
                    <ModalFooter className='flex flex-row justify-center items-center gap-4'>
                        <Button className='bg-bigbutton font-semibold text-white
                        hover:brightness-110 transition ease-in-out duration-200
                        px-8 py-2 font-outfit'
                        onPress={() => router.replace('/sign-in')}>
                        OK
                        </Button>
                    </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
            }
        </div>
    )
}