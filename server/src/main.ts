import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import "./auth/google"
import userRouter from "./routes/UserRoutes";
import authRouter from "./routes/AuthRoutes";
import aiRouter from "./routes/AIRoutes";
import essayRouter from "./routes/EssayRoutes";
import paymentsRouter from "./routes/PaymentsRoutes"
import stripeRouter from "./routes/StripeWebhook";
import transactionRouter from "./routes/TransactionRoutes";
import pgSession from "connect-pg-simple";

dotenv.config()
const app = express()

const sesh = pgSession(session)

// middleware/other tools
const allowedOrigins = [
    process.env.CLIENT_URL,
    process.env.CLIENT_CONTAINER_URL
]

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("origin not allowed"))
        }
    },
    credentials: true
}))
app.use(session({
    store: new sesh({
        conString: process.env.DATABASE_URL
    }),
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // for docker network communication
        httpOnly: true,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

app.use(stripeRouter)
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

// route handlers
app.use(userRouter)
app.use(authRouter)
app.use(aiRouter)
app.use(essayRouter)
app.use(paymentsRouter)
app.use(transactionRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT)