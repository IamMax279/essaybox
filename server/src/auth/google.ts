import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import prisma from "../../prisma/PrismaClient"
import { randomBytes } from "crypto"

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: "/auth/google/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0].value
                if (!email) {
                    return done(new Error("No email found."), false)
                }

                let user = await prisma.user.findFirst({ where: { email } })
                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            email,
                            name: email.split('@')[0],
                            password: randomBytes(32).toString("hex"),
                            verified: true,
                            provider: "google"
                        }
                    })
                }

                if (user.provider === 'local') {
                    return done(new Error("Użyj hasła i adresu e-mail aby zalogować się na to konto.",), false)
                }

                return done(null, user)
            } catch (error) {
                return done(error, false)
            }
        }
    )
)

passport.serializeUser((user: any, done) => {
    let id = user.id
    if (typeof id === 'bigint') {
        id = id.toString()
    }
    done(null, id)
})

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: BigInt(id) } })
        done(null, user || false)
    } catch(error) {
        return done(error, false)
    }
})