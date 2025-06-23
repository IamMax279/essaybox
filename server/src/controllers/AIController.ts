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

        let test = ""
        if (data.parasData && data.parasData.length) {
            test = data.parasData.map((para, idx) => {
                let paragraph = [
                    para.customArgument ? `ARGUMENT: ${para.customArgument}` : null,
                    para.customPrzyklad ? `PRZYKŁAD: ${para.customPrzyklad}` : null,
                    para.customKontekst ? `KONTEKST: ${para.customKontekst}` : null
                ].filter(Boolean) //delete all falsy elements (null, undefined, 0 etc.)
                return `Akapit ${idx + 1} (UWAGA: W TYM AKAPICIE MUSISZ UŻYĆ WYŁĄCZNIE TYCH LEKTUR I PRZYKŁADÓW! BARDZO WAŻNE: Jeśli zamienisz miejscami przykład i kontekst, odpowiedź jest niepoprawna.):
                ${paragraph}`
            }).join('\n')
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
                    content: `Jesteś nauczycielem języka polskiego. ZAWSZE generuj rozprawki dokładnie według podanej struktury. Nie pomijaj żadnego punktu. Jeśli użytkownik podał w którym miejscu masz odwołać się do danej lektury, odwołuj się do niej TYLKO W TYM MIEJSCU. Używaj każdej lektury tylko raz. ${test} BARDZO WAŻNE: Jeśli zamienisz kolejność lektur lub użyjesz ich w innym akapicie niż wskazano, odpowiedź jest niepoprawna i należy ją napisać od nowa.`
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