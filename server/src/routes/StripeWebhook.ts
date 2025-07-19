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
        console.log("ERROR:", error)
        return res.status(400).json({ "message": `Webhook Error: ${(error as Error).message}` })
    }

    console.log("EVENT:", event.type)

    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object
            const subscriptionId = session.subscription as string
            const stripeCustomerId = session.customer as string

            const subscription = await stripe.subscriptions.retrieve(subscriptionId) as Stripe.Subscription
            const items = subscription.items.data
            const periodEnd = items[0]?.current_period_end
                ? new Date(items[0]?.current_period_end * 1000)
                : null

            console.log("current_period_start:", items[0]?.current_period_start)
            console.log("current_period_end:", items[0]?.current_period_end)
            console.log("periodEnd:", periodEnd)

            // const user = await prisma.user.findFirst({
            //     where: { stripeCustomerId }
            // })
            // if (!user) {
            //     console.log("No user found")
            //     break
            // }

            // const end = new Date()
            // end.setDate(new Date().getDate() + 30)
                
            // await prisma.subscription.create({
            //     data: {
            //         stripeSubscriptionId: subscriptionId,
            //         status: 'active',
            //         currentPeriodEnd: end.toISOString(),
            //         userId: user.id
            //     }
            // })
            //TODO: implement logic
            console.log("CHECKOUT SESSION COMPLETED")
            break
        case 'customer.subscription.created':
            //TODO: implement logic
            console.log("CUSTOMER SUBSCRIPTION CREATED")
            break
        case 'customer.subscription.deleted':
            //TODO: implement logic
            console.log("CUSTOMER SUBSCRIPTION DELETED")
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
    //isAuthenticated,
    webhook
)

export default stripeRouter