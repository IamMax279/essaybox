"use client"

import { useEssayList } from "@/providers/EssayListProvider"
import { Suspense } from "react"
import Nowy from "@/components/Nowy"

export default function NowyPage() {
    const { refetchEssays } = useEssayList()

    return (
        <Suspense>
            <Nowy refetchEssays={refetchEssays}/>
        </Suspense>
    )
}