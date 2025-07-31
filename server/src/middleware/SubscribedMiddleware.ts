import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/PrismaClient";

export async function isSubscribed(req: Request, res: Response, next: NextFunction) {
    try {
        if (req.isAuthenticated && req.isAuthenticated()) {
            const user = req.user as { id: bigint }
            const userId = user.id

            const subscription = await prisma.subscription.findFirst({
                where: { userId }
            })
            if (!subscription) {
                return res.status(402).json({
                    success: false,
                    message: "UNSUBSCRIBED"
                })
            }

            if (subscription.currentPeriodEnd < new Date()) {
                return res.status(402).json({
                    success: false,
                    message: "EXPIRED"
                })
            }

            return next()
        } else {
            return res.status(401).json({
                success: false,
                message: "UNAUTHORIZED"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}