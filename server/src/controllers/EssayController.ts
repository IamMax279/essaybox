import type { EssayData, EssayResponse, RestResponse } from "../../../@types";
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

    static async findByUuid(uuid: string): Promise<RestResponse> {
        if (!uuid.trim()) {
            throw new Error("Uuid nie zostało podane")
        }

        const essay = await prisma.essay.findFirst({
            where: { urlIdentifier: uuid }
        })
        if (!essay) {
            throw new Error("Rozprawka o takim uuid nie istnieje")
        }

        return {
            success: true,
            message: "Essay found successfully"
        }
    }
}