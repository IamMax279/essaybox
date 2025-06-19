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
                    content: "Jesteś nauczycielem języka polskiego. ZAWSZE generuj rozprawki dokładnie według podanej struktury. Nie pomijaj żadnego punktu."
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