import { Router } from "express";
import type { Request, Response } from "express";
import { AIController } from "../controllers/AIController";
import { EssayController } from "../controllers/EssayController";
import { isAuthenticated } from "../middleware/AuthMiddleware";
import type { EssayData, GenerationParams } from "../../../@types";
import prisma from "../../prisma/PrismaClient";

const aiRouter = Router()

const generateEssay = async (req: Request, res: Response): Promise<any> => {
    try {
        const { 
            topic,
            parasAmount,
            parasData,
            thesisType,
            thesis,
            lowerBound,
            upperBound
        } = req.body

        const params: GenerationParams = {
            topic,
            parasAmount,
            parasData,
            thesisType,
            thesis,
            lowerBound,
            upperBound
        }

        let userId
        if (req.isAuthenticated() && req.user) {
            const user = req.user as { id: bigint }
            userId = user.id
        }

        const user = await prisma.user.findFirst({
            where: { id: userId }
        })

        if (!user) {
            throw new Error("Id użytkownika nie zostało podane")
        }
        if (user.generationCount < 1) {
            throw new Error("Użytkownik nie może już generować rozprawek")
        }

        // this right here costs money - important
        const result = await AIController.generateEssay(params)

        const response = await EssayController.createEssay(
            {
                title: result.title,
                content: result.essay
            } as EssayData,
            userId!
        )

        return res.status(200).json({
            essay: result.essay,
            urlIdentifier: response.urlIdentifier
        })
    } catch (error) {
        console.log("ERROR:", error)
        if (error instanceof Error && (
            error.message.includes("Nie wszystkie pola") ||
            error.message.includes("Coś poszło nie tak") ||
            error.message.includes("Użytkownik nie może")
        )) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

aiRouter.post(
    '/ai/generate-essay',
    //isAuthenticated,
    generateEssay
)

export default aiRouter