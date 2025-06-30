import type { EssayData, EssayResponse } from "../../../@types";
import prisma from "../../prisma/PrismaClient";

export class EssayController {
    static async createEssay(data: EssayData, userId: bigint): Promise<EssayResponse> {
        if (!data.content.trim() || !data.title.trim()) {
            throw new Error("Niekompletne dane")
        }

        const essay = await prisma.essay.create({
            data: {
                title: data.title,
                content: data.content,
                userId
            }
        })

        return {
            success: true,
            message: "Essay created successfully",
            urlIdentifier: essay.urlIdentifier
        }
    }
}