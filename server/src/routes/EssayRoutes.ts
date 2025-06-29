import { Request, Response, Router } from "express";
import { EssayController } from "../controllers/EssayController";
import { isAuthenticated } from "../middleware/AuthMiddleware";

const essayRouter = Router()

const createEssay = async (req: Request, res: Response): Promise<any> => {
    try {
        const { essayData } = req.body
        let userId

        if (req.isAuthenticated()) {
            const user = req.user as { id: bigint }
            userId = user.id
        } else {
            throw new Error("Użytkownik niezalogowany")
        }

        const result = await EssayController.createEssay(
            essayData,
            userId
        )
    } catch (error) {
        if (error instanceof Error && (
            error.message.includes("Niekompletne dane") ||
            error.message.includes("niezalogowany")
        )) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

essayRouter.use(
    '/essay/create',
    //isAuthenticated,
    createEssay
)

export default essayRouter