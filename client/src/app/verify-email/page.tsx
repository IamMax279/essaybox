"use client"

import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import { ThreeDot } from "react-loading-indicators"
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter
} from "@heroui/modal";
import { Button } from "@nextui-org/button"

export default function VerifyEmail() { 
    const [verifying, setVerifying] = useState<boolean>(true)
    const [verificationError, setVerificationError] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false)

    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const router = useRouter()

    const verifyUser = async () => {
        try {
            setVerificationError(null)
            const res = await axios.post(
                "/api/auth/verify-email",
                { token }
            )

            console.log(res)
            if (res.data.success) {
                setSuccess(true)
            }
        } catch (error: any) {
            setVerificationError(error.response?.data.message || error.message)
        } finally {
            setVerifying(false)
        }
    }

    useEffect(() => {
        verifyUser()
    }, [token])

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            {verifying ?
            <ThreeDot color="#000" size="small"/>
            :
            success ?
            <Modal
            isOpen={true}
            isDismissable={false}
            hideCloseButton={true}
            >
                <ModalContent className='bg-white pt-4 pb-2'>
                    <>
                    <ModalBody>
                        <p className='text-center text-lg'>
                        Konto zostało zweryfikowane.
                        </p>
                    </ModalBody>
                    <ModalFooter className='flex flex-row justify-center items-center gap-4'>
                        <Button className='bg-bigbutton font-semibold text-white
                        hover:brightness-110 transition ease-in-out duration-200
                        px-8 font-outfit'
                        onPress={() => router.replace('/sign-in')}>
                        OK
                        </Button>
                    </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
            :
            <Modal
            isOpen={true}
            isDismissable={false}
            hideCloseButton={true}
            >
                <ModalContent className='bg-white pt-4 pb-2'>
                    <>
                    <ModalBody>
                        <p className='text-center'>
                           {verificationError}
                        </p>
                    </ModalBody>
                    <ModalFooter className='flex flex-row justify-center items-center gap-4'>
                        <Button className='bg-bigbutton font-semibold text-white
                        hover:brightness-110 transition ease-in-out duration-200
                        px-8'
                        onPress={() => router.replace('/')}>
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