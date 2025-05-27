import prisma from "../../prisma/PrismaClient"
import argon2 from "argon2"
import { RestResponse } from "../types/ResponseTypes"

export class UserController {
    static async registerUser(email: string, password: string): Promise<RestResponse> {
        if (!email.trim() || !password.trim()) {
            throw new Error("Email or password have not been provided")
        }
        if(password.trim().length < 8) {
            throw new Error("Password is shorter than 8 characters")
        }

        let user = await prisma.user.findUnique({ where: { email } })
        if (user) {
            throw new Error("User with this email already exists")
        }

        const pass = await argon2.hash(password)

        user = await prisma.user.create({
            data: {
                email,
                password: pass,
                name: email.split('@')[0]
            }
        })

        return {
            success: true,
            message: "User created successfully"
        }
    }
}