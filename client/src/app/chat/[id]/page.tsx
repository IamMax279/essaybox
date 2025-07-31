"use client"

import 'react-toastify/dist/ReactToastify.css';
import { useMutation } from "@tanstack/react-query"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { useTypewriter } from "@/hooks/useTypewriter"
import Logo from "../../../../public/LogoWhite.svg"
import Image from "next/image"
import SmallButton from "@/components/SmallButton"
import { useSelector } from "react-redux"
import { RootState } from "@/app/redux/Store"
import { ToastContainer, toast } from "react-toastify"

export default function Generated() {
    const [essay, setEssay] = useState<string | null>(null)
    const [essayTitle, setEssayTitle] = useState<string>("")
    const [typewriterDone, setTypewriterDone] = useState<boolean>(false)
    const [typewriterAllowed, setTypewriterAllowed] = useState<boolean>(false)
    const [convertionError, setConvertionError] = useState<boolean>(false)

    const isSubscribed = useSelector((state: RootState) => state.subscribedReducer.isSubscribed)

    const printRef = useRef(null)
    //search params są po "?" w url
    //params są bezpośrednio w url, przed "?"
    const params = useParams()
    const id = params.id as string | null

    const searchParams = useSearchParams()
    const brandNew = searchParams.get('brandnew')

    const typewriter = useTypewriter(essay ?? "", 50)

    const { mutate: getEssay } = useMutation({
        mutationFn: async (id: string) => {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/get-essay`,
                { essayId: id },
                { withCredentials: true }
            )

            return response.data
        },
        onSuccess: (data) => {
            setEssay(data.essay)
            setEssayTitle(data.title)
        },
        onError: (error: any) => {
            notify(error?.response?.data?.message || error?.message || "Ups! coś poszło nie tak")
        }
    })

    const { mutate: convertToPdf, isPending } = useMutation({
        mutationFn: async () => {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/essay/convert-to-pdf`,
                { essay, title: essayTitle },
                { withCredentials: true }
            )

            return response.data
        },
        onSuccess: (data) => {
            setConvertionError(false)
            window.open(data.message, "_blank")
        },
        onError: (error) => {
            setConvertionError(true)
        }
    })

    useEffect(() => {
        if (id) {
            getEssay(id)
        }
    }, [id])

    useEffect(() => {
        if (typewriter === (essay ?? "")) {
            setTypewriterDone(true)
        } else {
            setTypewriterDone(false)
        }
    }, [essay, typewriter])

    useEffect(() => {
        if (brandNew && brandNew === 'true') {
            setTypewriterAllowed(true)
        }
    }, [brandNew])

    const notify = (message: string) => {
        toast.info(`${message}`, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: 'colored',
            style: { background: '#1E1E1E' },
        });
    }

    return (
        <div>
            <ToastContainer/>
            {(typewriter && typewriterAllowed) ?
            <div className='relative flex flex-row mx-auto lg:w-[656px] md:w-[420px] w-[70%] min-w-[220px]
                border border-bigbutton/70 rounded-lg bg-[#141414] my-12'>
                <Image
                src={Logo}
                alt='logo'
                className={`hidden md:block md:absolute md:top-2 md:-left-[54px] md:w-10 md:h-10
                ${!typewriterDone ? 'spinning-logo' : ''}`}
                />
                <div className="font-mono text-base leading-relaxed p-6 w-full min-h-12 
                whitespace-pre-wrap break-words text-gray-200">
                    <span className="tracking-wide font-outfit">{typewriter}</span>
                    <span className="animate-pulse ml-0.5 text-white">|</span>
                </div>
            </div>
            :
            <div className="flex flex-col items-center">
                <div className='relative flex flex-row mx-auto lg:w-[656px] md:w-[420px] w-[70%] min-w-[220px]
                    border border-bigbutton/70 rounded-lg bg-[#141414] my-12'>
                    <Image
                    src={Logo}
                    alt='logo'
                    className={`hidden md:block md:absolute md:top-2 md:-left-[54px] md:w-10 md:h-10`}
                    />
                    <div className="font-mono text-base leading-relaxed p-6 w-full min-h-12 
                    whitespace-pre-wrap break-words text-gray-200">
                        <span className="tracking-wide font-outfit"
                        ref={printRef}>
                            {essay}
                        </span>
                    </div>
                </div>
                {convertionError &&
                <p className="flex self-center font-outfit text-red-500 relative -top-8">
                    Coś poszło nie tak. spróbuj ponownie później.
                </p>
                }
                {isSubscribed &&
                <SmallButton
                onPress={() => convertToPdf()}
                text="Pobierz PDF"
                className="text-white -mt-6 mb-8"
                loading={isPending}
                />
                }
            </div>
            }
        </div>
    )
}