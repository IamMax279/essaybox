import type { EssayData, RestResponse } from "../../../@types";
import prisma from "../../prisma/PrismaClient";

export class EssayController {
    static async createEssay(data: EssayData, userId: bigint): Promise<RestResponse> {
        if (!data.content.trim() || !data.title.trim() || !data.urlIdentifier.trim()) {
            throw new Error("Niekompletne dane")
        }

        await prisma.essay.create({
            data: {
                title: data.title,
                content: data.content,
                urlIdentifier: data.urlIdentifier,
                userId
            }
        })

        return {
            success: true,
            message: "Essay created successfully"
        }
    }
}