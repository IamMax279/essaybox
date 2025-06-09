import { Router } from "express";
import type { Request, Response } from "express";
import { AIController } from "../controllers/AIController";
import { isAuthenticated } from "../middleware/AuthMiddleware";
import type { GenerationParams } from "../../../@types";

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
        const result = await AIController.generateEssay(params)

        return res.status(200).json(result)
    } catch (error) {
        console.log("ERROR:", error)
        if (error instanceof Error && (
            error.message.includes("Nie wszystkie pola") ||
            error.message.includes("Coś poszło nie tak")
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