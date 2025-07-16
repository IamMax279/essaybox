import { Request, Response, Router } from "express";
import { PaymentsController } from "../controllers/PaymentsController";
import { isAuthenticated } from "../middleware/AuthMiddleware";

const paymentsRouter = Router()

const subscribe = async (req: Request, res: Response): Promise<any> => {
    try {
        let userId
        if (req.isAuthenticated() && req.user) {
            const user = req.user as { id: bigint }
            userId = user.id
        }

        const result = await PaymentsController.subscribe(userId!)
        return res.status(200).json(result)
    } catch (error) {
        console.log("BLAD:", error)
        if (error instanceof Error && (
            error.message.includes("Użytkownik z")
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

paymentsRouter.get(
    '/payments/subscribe',
    //isAuthenticated,
    subscribe
)

export default subscribe