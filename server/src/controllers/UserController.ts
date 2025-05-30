import prisma from "../../prisma/PrismaClient"
import argon2 from "argon2"
import { RestResponse } from "../types/ResponseTypes"
import { EmailService } from "../services/EmailService"
import { AuthService } from "../services/AuthService"

export class UserController {
    static async registerUser(email: string, password: string): Promise<RestResponse> {
        if (!email.trim() || !password.trim()) {
            throw new Error("Email lub hasło nie zostały podane")
        }
        if (password.trim().length < 8) {
            throw new Error("Hasło jest krótsze niż 8 znaków")
        }

        let user = await prisma.user.findUnique({ where: { email } })
        if (user) {
            throw new Error("Konto powiązane z tym adresem e-mail już istnieje")
        }

        const pass = await argon2.hash(password.trim())
        const token = AuthService.generateVerificationToken()

        user = await prisma.user.create({
            data: {
                email: email.trim(),
                password: pass,
                name: email.split('@')[0],
                token
            }
        })

        await EmailService.sendVerificationEmail(user.email, token)

        return {
            success: true,
            message: "User created successfully"
        }
    }

    static async signIn(email: string, password: string): Promise<RestResponse> {
        if (!email.trim() || !password.trim()) {
            throw new Error("Email lub hasło nie zostały podane")
        }

        let user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
            throw new Error("Konto powiązane z tym adresem e-mail nie istnieje")
        }

        if (!user.verified) {
            throw new Error("To konto jest niezweryfikowane")
        }
        if (user.provider === 'google') {
            throw new Error("Zaloguj się używając konta google")
        }

        const areSame = await argon2.verify(user.password, password)
        if (!areSame) {
            throw new Error("Nieprawidłowe hasło")
        }

        return {
            success: true,
            message: "User signed in successfully"
        }
    }

    static async verifyUser(token: string): Promise<RestResponse> {
        if(!token) {
            throw new Error("Token nie został podany")
        }

        const user = await prisma.user.findFirst({ where: { token } })
        if (!user) {
            throw new Error("Nieprawidłowy token")
        }

        await prisma.user.update({
            where: { id: user.id },
            data: { verified: true, token: null }
        })

        return {
            success: true,
            message: "User verified successfully"
        }
    }
}