import type { SubscriptionPurchaseResponse } from "../../../@types";
import Stripe from "stripe"
import prisma from "../../prisma/PrismaClient";

const stripe = new Stripe(process.env.STRIPE_SK!)

export class PaymentsController {
    static async subscribe(userId: bigint): Promise<SubscriptionPurchaseResponse> {
        const user = await prisma.user.findFirst({
            where: { id: userId }
        })
        if (!user) {
            throw new Error("Użytkownik z takim id nie istnieje")
        }

        let stripeCustomerId = user.stripeCustomerId
        if (!stripeCustomerId) {
            const customer = await stripe.customers.create({
                email: user.email,
                name: user.name
            })

            stripeCustomerId = customer.id!
            await prisma.user.update({
                where: { id: user.id },
                data: { stripeCustomerId }
            })
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'blik'],
            mode: 'subscription',
            line_items: [
                { price: 'price_1RiKWSIqrP8tyF9HFuzzGgdF', quantity: 1 }
            ],
            customer: stripeCustomerId,
            success_url: `http://localhost:3000?success=true`,
            cancel_url: `http://localhost:3000?success=false`
        })
        
        return {
            success: true,
            message: "Payment session created successfully",
            url: session.url!
        }
    }
}