import { useEffect, useState } from "react";

export function useTypewriter(text: string, speed: number = 30) {
    const [displayed, setDisplayed] = useState<string>("")

    useEffect(() => {
        setDisplayed("")
        if (!text || typeof text !== "string") return

        let i = 0
        const interval = setInterval(() => {
            if (i >= text.length) {
                clearInterval(interval)
                return
            }
            
            const char = text[i]
            if (char !== undefined) {
                setDisplayed(prev => prev + char)
            }
            i++
        }, speed)

        return () => clearInterval(interval)
    }, [text, speed])

    return displayed
}