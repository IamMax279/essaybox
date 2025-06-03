"use client"

import TextareaAutosize from '@mui/material/TextareaAutosize';
import { essaySchema } from "@/schemas/EssaySchema";
import { useFormik } from "formik";

export default function Nowy() {
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
        </div>
    )
}