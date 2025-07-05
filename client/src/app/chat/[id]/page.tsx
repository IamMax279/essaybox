"use client"

import { useMutation } from "@tanstack/react-query"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import { useTypewriter } from "@/hooks/useTypewriter"
import Logo from "../../../../public/LogoWhite.svg"
import Image from "next/image"

export default function Generated() {
    const [essay, setEssay] = useState<string | null>(null)
    const [typewriterDone, setTypewriterDone] = useState<boolean>(false)
    const [typewriterAllowed, setTypewriterAllowed] = useState<boolean>(false)
    //search params są po "?" w url
    //params są bezpośrednio w url, przed "?"
    const params = useParams()
    const id = params.id as string | null

    const searchParams = useSearchParams()
    const brandNew = searchParams.get('brandnew')

    const router = useRouter()

    const typewriter = useTypewriter(essay ?? "", 50)

    const { mutate: getEssay, isPending } = useMutation({
        mutationFn: async (id: string) => {
            return await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/get-essay`,
                { essayId: id },
                { withCredentials: true }
            )
        },
        onSuccess: (data) => {
            setEssay(data.data.essay)
        },
        onError: (error) => {
            router.replace('/chat/nowy')
        }
    })

    useEffect(() => {
        if (id) {
            getEssay(id)
        }

        console.log("id:", id)
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

    return (
        <div>
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
            <div className='relative flex flex-row mx-auto lg:w-[656px] md:w-[420px] w-[70%] min-w-[220px]
                border border-bigbutton/70 rounded-lg bg-[#141414] my-12'>
                <Image
                src={Logo}
                alt='logo'
                className={`hidden md:block md:absolute md:top-2 md:-left-[54px] md:w-10 md:h-10`}
                />
                <div className="font-mono text-base leading-relaxed p-6 w-full min-h-12 
                whitespace-pre-wrap break-words text-gray-200">
                    <span className="tracking-wide font-outfit">{essay}</span>
                </div>
            </div>
            }
        </div>
    )
}