"use client"

import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export default function Account() {
    const { mutate: handleStripe, isPending } = useMutation({
        mutationFn: async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/payments/subscribe`,
                { withCredentials: true }
            )
            return res.data
        },
        onSuccess: (data) => {
            console.log(data)
            window.location.href = data.url
        },
        onError: (error) => {
            console.log(error)
        }
    })

    return (
        <div className="notebook-grid bg-[#1E1E1E] w-full min-h-screen">
            <p onClick={() => handleStripe()}>click me</p>
        </div>
    )
}