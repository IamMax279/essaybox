import { Router } from "express";
import passport from "passport";

const authRouter = Router()

authRouter.get(
    '/auth/google',
    passport.authenticate("google", { scope: ["profile", "email"] })
)
authRouter.get(
    '/auth/google/callback',
    (req, res, next) => {
        passport.authenticate("google", (err: any, user: any) => {
            if (err) {
                return res.redirect(process.env.CLIENT_URL! + `/sign-in?error=${encodeURIComponent(err.message)}`)
            }
            if (!user) {
                return res.redirect(process.env.CLIENT_URL + '/sign-in')
            }
            req.logIn(user, (err) => {
                if (err) {
                    return res.redirect(process.env.CLIENT_URL + '/sign-in?error=Session%20error')
                }
                return res.redirect(process.env.CLIENT_URL + '/chat/nowy')
            })
        })(req, res, next)
    }
)

export default authRouter