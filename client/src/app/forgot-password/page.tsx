"use client"

import Logo from "../../../public/Logo.svg"
import Image from "next/image"
import { forgotPasswordSchema } from "@/schemas/ForgotPasswordSchema"
import { useFormik } from "formik"
import BigButton from "@/components/BigButton"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter
} from "@heroui/modal";
import { Button } from "@nextui-org/button"
import { useRouter } from "next/navigation"

export default function ForgotPassword() {
    const [success, setSuccess] = useState<boolean>(false)
    const [emailError, setEmailError] = useState<string | null>(null)

    const router = useRouter()

    const { mutate: handlePasswordEmail, isPending } = useMutation({
        mutationFn: async (email: string) => {
            await axios.post("/api/auth/forgot-password", {
                email
            })
        },
        onSuccess: (data) => {
            setSuccess(true)
        },
        onError: (error: any) => {
            setEmailError(error.response?.data.message || error.message)
        }
    })

    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: forgotPasswordSchema,
        onSubmit: (values) => handlePasswordEmail(values.email)
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
                <form
                className="flex flex-col items-center border border-gray-300
                rounded-lg mt-6 p-4 sm:w-96 w-72"
                onSubmit={formik.handleSubmit}>
                    <div>
                        <label className="sm:w-[344px] w-[248px] font-outfit">
                            Podaj adres e-mail powiązany z kontem, którego hasło chcesz zmienić.
                        </label>
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
                    {emailError &&
                    <p className="flex self-center text-red-500 -mb-1 mt-2 text-center">
                        {emailError}
                    </p>
                    }
                    <BigButton
                    text="Wyślij link"
                    width="sm:w-[344px] w-[248px]"
                    onPress={() => {}}
                    className="mt-3"
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
                        Kliknij w link wysłany na podany adres e-mail, aby
                        zmienić hasło do swojego konta.
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