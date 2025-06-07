"use client"

import TextareaAutosize from '@mui/material/TextareaAutosize';
import { essaySchema } from "@/schemas/EssaySchema";
import { useFormik } from "formik";
import { IoMdInformationCircleOutline } from "react-icons/io";
import DropdownOptions from '@/components/DropdownOptions';
import ParagraphContainer from '@/components/ParagraphContainer';
import BigButton from '@/components/BigButton';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from "uuid";

export default function Nowy() {
    const [parasAmount, setParasAmount] = useState<number>(2)
    const [paragraphs, setParagraphs] = useState([
        { id: uuidv4(), argument: "ai_generated", customArgument: "", przyklad: "zakres_podstawowy", customPrzyklad: "", kontekst: "literacki", customKontekst: "" },
        { id: uuidv4(), argument: "ai_generated", customArgument: "", przyklad: "zakres_podstawowy", customPrzyklad: "", kontekst: "literacki", customKontekst: "" }
    ])
    const [teza, setTeza] = useState<"ai_generated" | "wlasna">("ai_generated")
    const [customTeza, setCustomTeza] = useState<string>("")

    const handleParasAmountChange = (key: string) => {
        setParasAmount(parseInt(key))
        setParagraphs(prev => {
            const count = Number(key)
            if (prev.length < count) {
                return [
                    ...prev,
                    ...Array(count - prev.length).fill({
                        id: uuidv4(),
                        argument: "ai_generated",
                        customArgument: "",
                        przyklad: "zakres_podstawowy",
                        customPrzyklad: "",
                        kontekst: "literacki",
                        customKontekst: ""
                    })
                ]
            } else {
                return prev.slice(0, count)
            }
        })
    }

    const formik = useFormik({
        initialValues: {
            topic: ""
        },
        validationSchema: essaySchema,
        onSubmit: () => {}
    })

    return (
        <div className="flex flex-col items-center w-full p-8 min-h-screen">
            <div className="relative lg:w-[720px] md:w-[520px] w-4/5 min-w-[220px]">
                <TextareaAutosize
                {...formik.getFieldProps('topic')}
                className="resize-none outline-none p-4 rounded-xl w-full bg-[#3b3b3b] text-white
                scrollbar-thumb-gray-500 scrollbar-track-[#3b3b3b] scrollbar-thin"
                aria-label="minimum height"
                minRows={2}
                maxRows={8}
                placeholder="Wpisz temat..."
                />
                <p className={`absolute right-0 -bottom-5 ${formik.values.topic.length <= 160 ? "text-[#3b3b3b]" : "text-red-500"}`}>
                    {formik.values.topic.length} / 160
                </p>
            </div>
            <div className='flex flex-row justify-center items-center mt-8 space-x-4
            rounded-xl bg-[#2A2A2A] p-5 lg:w-[720px] md:w-[520px] w-4/5 min-w-[220px]'>
                <IoMdInformationCircleOutline
                color='#3B3B3B'
                size={36}
                className='flex-shrink-0'
                />
                <p className='text-[#B7B7B7]'>
                    Jeden akapit (w rozwinięciu) składa się z argumentu, przykładu, kontekstu oraz wniosku.
                </p>
            </div>
            <DropdownOptions
            text='Teza'
            className='mt-5'
            items={Array.of(
                { key: "ai_generated", value: "AI generated" },
                { key: "wlasna", value: "Własna" }
            )}
            mainItem='ai_generated'
            textStyles='px-7'
            buttonStyles="sm:w-[140px]"
            onChange={key => {
                setCustomTeza("")
                setTeza(key as "ai_generated" | "wlasna")
            }}
            />
            {teza === 'wlasna' &&
            <input
            type="text"
            className="mt-4 p-4 bg-[#3b3b3b] text-white lg:w-[720px]
            md:w-[520px] w-4/5 min-w-[220px] outline-none rounded-lg"
            placeholder="Wpisz własną tezę..."
            value={customTeza}
            onChange={e => setCustomTeza(e.target.value)}
            />
            }
            <DropdownOptions
            text='Liczba akapitów'
            className='mt-5'
            items={Array.of(
                { key: "1", value: "1" },
                { key: "2", value: "2" },
                { key: "3", value: "3" }
            )}
            mainItem='2'
            textStyles='px-4'
            onChange={handleParasAmountChange}
            />
            {parasAmount <= 2 ? 
            <div className='flex mxl:flex-row flex-col space-y-6 mxl:space-x-8 space-x-0'>
                {paragraphs.map((par, index) => (
                <ParagraphContainer
                key={par.id}
                order={(index + 1).toString()}
                className='mt-6'
                values={par}
                onChange={updated => {
                    setParagraphs(prev => prev.map((p, i) => i === index ? { ...p, ...updated } : p))
                }}
                />
                ))}
            </div>
            :
            <div className='flex flex-col items-center'>
            <div className='flex mxl:flex-row flex-col space-y-6 mxl:space-x-8 space-x-0'>
                {paragraphs.slice(0, 2).map((par, index) => (
                <ParagraphContainer
                    key={par.id}
                    order={(index + 1).toString()}
                    className='mt-6'
                    values={par}
                    onChange={updated => {
                    setParagraphs(prev => prev.map((p, i) => i === index ? { ...p, ...updated } : p))
                    }}
                />
                ))}
            </div>
            {paragraphs[2] && (
                <ParagraphContainer
                key={paragraphs[2].id}
                order="3"
                className='mt-6'
                values={paragraphs[2]}
                onChange={updated => {
                    setParagraphs(prev => prev.map((p, i) => i === 2 ? { ...p, ...updated } : p))
                }}
                />
            )}
            </div>
            }
            <BigButton
            text='Generuj'
            width="sm:w-[344px] w-[248px]"
            className='mt-8'
            />
        </div>
    )
}