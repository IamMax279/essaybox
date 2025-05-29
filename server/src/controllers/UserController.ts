import prisma from "../../prisma/PrismaClient"
import argon2 from "argon2"
import { RestResponse } from "../types/ResponseTypes"

export class UserController {
    static async registerUser(email: string, password: string): Promise<RestResponse> {
        if (!email.trim() || !password.trim()) {
            throw new Error("Email or password have not been provided")
        }
        if (password.trim().length < 8) {
            throw new Error("Password is shorter than 8 characters")
        }

        let user = await prisma.user.findUnique({ where: { email } })
        if (user) {
            throw new Error("User with this email already exists")
        }

        const pass = await argon2.hash(password.trim())

        user = await prisma.user.create({
            data: {
                email: email.trim(),
                password: pass,
                name: email.split('@')[0]
            }
        })

        return {
            success: true,
            message: "User created successfully"
        }
    }

    static async signIn(email: string, password: string): Promise<RestResponse> {
        if (!email.trim() || !password.trim()) {
            throw new Error("Email or password have not been provided")
        }

        let user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
            throw new Error("An account with this email address does not exist")
        }

        if (!user.verified) {
            throw new Error("This account is not verified")
        }

        const areSame = await argon2.verify(user.password, password)
        if (!areSame) {
            throw new Error("Passwords don't match")
        }

        return {
            success: true,
            message: "User signed in successfully"
        }
    }
}