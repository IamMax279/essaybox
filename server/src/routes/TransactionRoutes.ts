import { Request, Response, Router } from "express";
import { isAuthenticated } from "../middleware/AuthMiddleware";
import prisma from "../../prisma/PrismaClient";

const transactionRouter = Router()

const getTransaction = async (req: Request, res: Response): Promise<any> => {
    try {
        const { transaction } = req.body
        const found = await prisma.transaction.findFirst({
            where: { id: transaction }
        })

        if (found) {
            return res.status(200).json({
                success: true,
                message: "Transaction found"
            })
        } else {
            throw new Error("Transaction not found")
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(401).json({
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

transactionRouter.post(
    '/transaction/get-transaction',
    isAuthenticated,
    getTransaction
)

export default transactionRouter