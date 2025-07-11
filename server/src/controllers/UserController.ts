import prisma from "../../prisma/PrismaClient"
import argon2 from "argon2"
import { AccountDataResponse, AIResponse, AllEssaysResponse, EssayData, EssayPortionsResponse, RestResponse } from "../../../@types"
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

    static async changePassword(password: string, token: string): Promise<RestResponse> {
        if (!password.trim()) {
            throw new Error("Hasło nie zostało podane")
        }
        if (password.length < 8) {
            throw new Error("Hasło jest krótsze niż 8 znaków")
        }
        if (!token) {
            throw new Error("Token nie został podany")
        }
        
        const user = await prisma.user.findFirst({
            where: {
                passwordToken: token,
                passwordTokenExpiry: { gt: new Date() }
            }
        })
        if (!user) {
            throw new Error("Nieprawidłowy lub wygasły token")
        }

        const hashed = await argon2.hash(password)
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashed,
                passwordToken: null,
                passwordTokenExpiry: null
            }
        })

        return {
            success: true,
            message: "Password changed successfully"
        }
    }

    static async getEssay(userId: bigint, essayUuid: string): Promise<AIResponse> {
        if (!userId) {
            throw new Error("Id użytkownika nie zostało podane")
        }

        const user = await prisma.user.findFirst({
            where: { id: userId }
        })
        if (!user) {
            throw new Error("Użytkownik o takim id nie istnieje")
        }

        const essay = await prisma.essay.findFirst({
            where: { userId: user.id, urlIdentifier: essayUuid }
        })
        if (!essay) {
            throw new Error("Ten użytkownik nie posiada rozprawki o takim uuid")
        }

        return {
            success: true,
            message: "Essay found successfully",
            essay: essay.content
        }
    }

    static async getAllEssays(userId: bigint): Promise<AllEssaysResponse> {
        if (!userId) {
            throw new Error("Id użytkownika nie zostało podane")
        }

        const result = await prisma.essay.findMany({
            where: { userId },
            orderBy: { 
                createdAt: 'desc'
            }
        })

        const essays = result.map(e => ({
            title: e.title,
            content: e.content,
            urlIdentifier: e.urlIdentifier
        } as EssayData))

        return {
            success: true,
            message: "Essays found successfully",
            essays
        }
    }

    static async getNEssays(userId: bigint, n: number): Promise<EssayPortionsResponse> {
        if (!userId) {
            throw new Error("Id użytkownika nie zostało podane")
        }
        if (!n) {
            throw new Error("N nie zostało podane")
        }

        const result = await prisma.essay.findMany({
            where: { userId },
            orderBy: { 
                createdAt: 'desc'
            },
            take: n
        })

        const essays = result.map(e => ({
            title: e.title,
            content: e.content,
            urlIdentifier: e.urlIdentifier
        } as EssayData))

        const count = await prisma.essay.count({
            where: { userId }
        })
        const hasMore = n < count

        return {
            success: true,
            message: "Essays found successfully",
            essays,
            hasMore
        }
    }

    static async getUserAccountData(userId: bigint): Promise<AccountDataResponse> {
        if (!userId) {
            throw new Error("Id użytkownika nie zostało podane")
        }

        const user = await prisma.user.findFirst({
            where: { id: userId }
        })
        if (!user) {
            throw new Error("Użytkownik o takim id nie istnieje")
        }

        return {
            success: true,
            message: "Data found successfully",
            email: user.email
        }
    }
}