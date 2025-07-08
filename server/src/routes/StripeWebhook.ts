import Stripe from "stripe";
import express, { Request, Response } from "express";

const stripe = new Stripe(process.env.STRIPE_SK!)
const stripeRouter = express.Router()

const stripeMiddleware = express.raw({ type: 'application/json' })

const webhook = (req: Request, res: Response) => {
    
}