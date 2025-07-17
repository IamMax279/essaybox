"use client"

import { useEffect, useState } from "react";

export function useAnimation(steps: number, delay: number) {
    const [current, setCurrent] = useState<number>(0)

    useEffect(() => {
        const timer = setInterval(() => setCurrent(current + 1), delay)
        return () => clearInterval(timer)
    }, [current, steps, delay])

    return current
}