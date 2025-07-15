import { Router } from "express";
import passport from "passport";

const authRouter = Router()

authRouter.get(
    '/auth/google',
    passport.authenticate("google", { scope: ["profile", "email"] })
)
authRouter.get(
    '/auth/google/callback',
    passport.authenticate("google", {
        successRedirect: process.env.CLIENT_URL + "/chat/nowy",
        failureRedirect: process.env.CLIENT_URL + "/sign-in"
    })
)

export default authRouter