import type { AIResponse, GenerationParams } from "../../../@types";
import { p } from "../constants/BasicPrompts"
import { OpenAI } from "openai"

export class AIController {
    private static openai = new OpenAI({
        apiKey: process.env.DEEPSEEK_API_KEY,
        baseURL: "https://api.deepseek.com"
    })

    static async generateEssay(data: GenerationParams): Promise<AIResponse> {
        if (!data.topic.trim() || !data.parasAmount || !data.parasData || !data.thesisType || !data.lowerBound || !data.upperBound) {
            throw new Error("Nie wszystkie pola zostały podane")
        }

        const paragraphs = []
        if (data.parasData && data.parasData.length) {
            for (let i = 0; i < data.parasData.length; i++) {
            const partialData = data.parasData[i]
            const instructions = `
            W AKAPICIE ${i + 1} ZASTOSUJ:
            NAJPIERW ${partialData.customArgument ? `UŻYJ ARGUMENTU: ${partialData.customArgument}` : "NAPISZ ARGUMENT"}
            POTEM ${partialData.customPrzyklad ? `UŻYJ PRZYKŁADU: ${partialData.customPrzyklad}. NAPISZ 3-4 ZDANIA` : `NAPISZ PRZYKŁAD ${partialData.customKontekst ? `NIE UŻYWAJĄC LEKTURY ${partialData.customKontekst} ALE JAKIEJŚ INNEJ` : ""}. NAPISZ 3-4 ZDANIA.`}
            I NA KONIEC ${partialData.customKontekst ? `UŻYJ KONTEKSTU: ${partialData.customKontekst}. NAPISZ 3-4 ZDANIA` : "NAPISZ KONTEKST (3-4 ZDANIA)"}
            `
            paragraphs.push(instructions)
            }
        }

        const prompt = p({
            topic: data.topic,
            thesis: data.thesisType === 'wlasna' ? data.thesis : undefined,
            wordsLower: data.lowerBound,
            wordsUpper: data.upperBound,
            parasAmount: data.parasAmount,
            parasData: data.parasData
        })

        const completion = await this.openai.chat.completions.create({
            model: 'deepseek-chat',
            messages: [
                {
                    role: "system",
                    content: `Jesteś nauczycielem języka polskiego. ZAWSZE generuj rozprawki dokładnie według podanej struktury. Nie pomijaj żadnego punktu. Nie popełniaj błędów rzeczowych i dokładnie sprawdź informacje. Jeśli użytkownik podał w którym miejscu masz odwołać się do danej lektury, odwołuj się do niej TYLKO W TYM MIEJSCU. Używaj każdej lektury tylko raz. ${paragraphs} BARDZO WAŻNE: Jeśli zamienisz kolejność lektur lub użyjesz ich w innym akapicie niż wskazano, odpowiedź jest niepoprawna i należy ją napisać od nowa.`
                },
                {
                    role: "user",
                    content: prompt
                }
            ]
        })
        let essay = completion.choices[0].message.content?.replace(/[*#]/g, "")
        if (!essay) {
            throw new Error("Coś poszło nie tak przy generowaniu rozprawki")
        }

        const words = essay.trim().split(/\s+/).filter(Boolean).length;
        essay += `\n\n(${words} słów)`

        return {
            success: true,
            message: "Essay generated successfully",
            essay
        }
    }
}