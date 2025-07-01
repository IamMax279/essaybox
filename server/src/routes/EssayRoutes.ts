import { Request, Response, Router } from "express";
import { EssayController } from "../controllers/EssayController";

const essayRouter = Router()

const findByUuid = async (req: Request, res: Response): Promise<any> => {
    try {
        const { uuid } = req.body
        const result = await EssayController.findByUuid(uuid)

        return res.status(200).json(result)
    } catch (error) {
        if (error instanceof Error && (
            error.message.includes("Uuid nie zostało") ||
            error.message.includes("Rozprawka o takim")
        )) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }

        return res.status(500).json({
            sucess: false,
            message: "Internal server error"
        })
    }
}

essayRouter.post(
    '/essay/find-by-uuid',
    findByUuid
)

export default essayRouter