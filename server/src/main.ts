import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import "./auth/google"
import userRouter from "./routes/UserRoutes";
import authRouter from "./routes/AuthRoutes";
import aiRouter from "./routes/AIRoutes";

dotenv.config()
const app = express()

// middleware/other tools
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

// route handlers
app.use(userRouter)
app.use(authRouter)
app.use(aiRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT)