import type { AIResponse, GenerationParams } from "../../../@types";
import { p } from "../constants/BasicPrompts"
import { OpenAI } from "openai"

export class AIController {
    private static openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    })

    static async generateEssay(data: GenerationParams): Promise<AIResponse> {
        if (!data.topic.trim() || !data.parasAmount || !data.parasData || !data.thesisType || !data.lowerBound || !data.upperBound) {
            throw new Error("Nie wszystkie pola zostały podane")
        }

        const prompt = p({
            topic: data.topic,
            wordsLower: data.lowerBound,
            wordsUpper: data.upperBound,
            parasAmount: data.parasAmount
        })

        const completion = await this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: "user", content: prompt }
            ]
        })
        const essay = completion.choices[0].message.content
        if (!essay) {
            throw new Error("Coś poszło nie tak przy generowaniu rozprawki")
        }

        return {
            success: true,
            message: "Essay generated successfully",
            essay
        }
    }
}