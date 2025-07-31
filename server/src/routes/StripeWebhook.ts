import Stripe from "stripe";
import express, { Request, Response } from "express";
import { isAuthenticated } from "../middleware/AuthMiddleware";
import prisma from "../../prisma/PrismaClient";

const stripe = new Stripe(process.env.STRIPE_SK!)
const stripeRouter = express.Router()

const stripeMiddleware = express.raw({ type: 'application/json' })

const webhook = async (req: Request, res: Response): Promise<any> => {
    const signature = req.headers["stripe-signature"] as string
    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error) {
        return res.status(400).json({ "message": `Webhook Error: ${(error as Error).message}` })
    }

    switch (event.type) {
        case 'customer.subscription.created':
            const subscription = event.data.object as Stripe.Subscription
            const stripeSubscriptionId = subscription.id
            const stripeCustomerId = subscription.customer as string

            const items = subscription.items.data
            const periodEnd = items[0].current_period_end
                ? new Date(items[0].current_period_end * 1000)
                : null
            
            const user = await prisma.user.findFirst({
                where: { stripeCustomerId }
            })
            if (!user) {
                break
            }

            await prisma.subscription.create({
                data: {
                    stripeSubscriptionId,
                    currentPeriodEnd: periodEnd!,
                    userId: user.id
                }
            })

            await prisma.user.update({
                where: { id: user.id },
                data: { generationCount: user.generationCount + 100 }
            })
            
            break
    }

    return res.status(200).json({
        success: true,
        message: event.type
    })
}

stripeRouter.post(
    '/stripe/webhook',
    stripeMiddleware,
    isAuthenticated,
    webhook
)

export default stripeRouter