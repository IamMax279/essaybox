import { Router } from "express";
import type { Request, Response } from "express";
import { UserController } from "../controllers/UserController";
import prisma from "../../prisma/PrismaClient";
import { EmailService } from "../services/EmailService";
import { isAuthenticated } from "../middleware/AuthMiddleware";

const userRouter = Router()

const registerUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body
        const result = await UserController.registerUser(email, password)

        return res.status(200).json(result)
    } catch (error) {
        if (error instanceof Error && (
            error.message.includes("już istnieje") ||
            error.message.includes("nie zostały podane") ||
            error.message.includes("Hasło jest krótsze") ||
            error.message.includes("Coś poszło nie tak")
        )) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const signIn = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body
        const result = await UserController.signIn(email, password)

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
            throw new Error("Konto powiązane z tym adresem e-mail nie istnieje")
        }

        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Session creation failed"
                })
            }
            return res.status(200).json(result)
        })
    } catch (error) {
        if (error instanceof Error && (
            error.message.includes("nie zostały podane") ||
            error.message.includes("nie istnieje") ||
            error.message.includes("jest niezweryfikowane") ||
            error.message.includes("Nieprawidłowe hasło") ||
            error.message.includes("używając konta google")
        )) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const verifyUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { token } = req.body
        const result = await UserController.verifyUser(token)

        return res.status(200).json(result)
    } catch (error) {
        if (error instanceof Error && (
            error.message.includes("Token nie") ||
            error.message.includes("Nieprawidłowy")
        )) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const sendPasswordResetEmail = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email } = req.body
        const result = await EmailService.sendPasswordChangeEmail(email)

        return res.status(200).json(result)
    } catch (error) {
        if (error instanceof Error && (
            error.message.includes("Konto powiązane") ||
            error.message.includes("przez Google") ||
            error.message.includes("Coś poszło nie tak") ||
            error.message.includes("Link do zmiany hasła")
        )) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const changePassword = async (req: Request, res: Response): Promise<any> => {
    try {
        const { password, token } = req.body
        const result = await UserController.changePassword(password, token)

        return res.status(200).json(result)
    } catch (error) {
        if (error instanceof Error && (
            error.message.includes("Hasło nie") ||
            error.message.includes("Hasło jest krótsze") ||
            error.message.includes("Token nie został") ||
            error.message.includes("Nieprawidłowy lub")
        )) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const getEssay = async (req: Request, res: Response): Promise<any> => {
    try {
        const { essayId } = req.body
        let userId

        if (req.isAuthenticated() && req.user) {
            const user = req.user as { id: bigint }
            userId = user.id
        }

        const result = await UserController.getEssay(userId!, essayId)
        return res.status(200).json(result)
    } catch (error) {
        if (error instanceof Error && (
            error.message.includes("Id użytkownika") ||
            error.message.includes("Użytkownik o takim") ||
            error.message.includes("Ten użytkownik")
        )) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const getAllEssays = async (req: Request, res: Response): Promise<any> => {
    try {
        let userId
        if (req.isAuthenticated() && req.user) {
            const user = req.user as { id: bigint }
            userId = user.id
        }

        const result = await UserController.getAllEssays(userId!)
        return res.status(200).json(result)
    } catch (error) {
        if (error instanceof Error && (
            error.message.includes("Id użytkownika")
        )) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const getNEssays = async (req: Request, res: Response): Promise<any> => {
    try {
        const { n } = req.body

        let userId
        if (req.isAuthenticated() && req.user) {
            const user = req.user as { id: bigint }
            userId = user.id
        }

        const result = await UserController.getNEssays(userId!, n)
        return res.status(200).json(result)
    } catch (error) {
        if (error instanceof Error && (
            error.message.includes("Id użytkownika") ||
            error.message.includes("N nie")
        )) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const getUserAccountData = async (req: Request, res: Response): Promise<any> => {
    try {
        let userId
        if (req.isAuthenticated() && req.user) {
            const user = req.user as { id: bigint }
            userId = user.id
        }

        const result = await UserController.getUserAccountData(userId!)
        return res.status(200).json(result)
    } catch (error) {
        if (error instanceof Error && (
            error.message.includes("Id użytkownika") ||
            error.message.includes("Użytkownik o takim")
        )) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const isLoggedIn = (req: Request, res: Response): any => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return res.status(200).json({
            success: true,
            message: "User is logged in"
        })
    } else {
        return res.status(401).json({
            success: false,
            message: "User is not logged in"
        })
    }
}

const logout = (req: Request, res: Response) => {
    req.logOut?.((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Logout failed" })
        }

        req.session.destroy(() => {
            res.clearCookie('connect.sid', {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax"
            })
            res.status(200).json({ success: true })
        })
    })
}

const deleteAccount = async (req: Request, res: Response): Promise<any> => {
    try {
        const { password } = req.body

        let userId
        if (req.isAuthenticated() && req.user) {
            const user = req.user as { id: bigint }
            userId = user.id
        }

        const result = await UserController.deleteUserAccount(userId!, password)

        req.logOut?.((err) => {
            if (err) {
                return res.status(500).json({ success: false, message: "Logout failed" })
            }

            req.session.destroy(() => {
                res.clearCookie('connect.sid', {
                    path: '/',
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax"
                })

                return res.status(200).json(result)
            })
        })
    } catch (error) {
        if (error instanceof Error && (
            error.message.includes("Id użytkownika") ||
            error.message.includes("Użytkownik o") ||
            error.message.includes("Złe hasło")
        )) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

userRouter.post(
    '/user/register',
    registerUser
)
userRouter.post(
    '/user/sign-in',
    signIn
)
userRouter.post(
    '/user/verify',
    verifyUser
)
userRouter.post(
    '/user/forgot-password',
    sendPasswordResetEmail
)
userRouter.post(
    '/user/change-password',
    changePassword
)
userRouter.post(
    '/user/get-essay',
    isAuthenticated,
    getEssay
)
userRouter.get(
    '/user/get-all-essays',
    isAuthenticated,
    getAllEssays
)
userRouter.post(
    '/user/get-n-essays',
    isAuthenticated,
    getNEssays
)
userRouter.get(
    '/user/get-user-account-data',
    isAuthenticated,
    getUserAccountData
)
userRouter.get(
    '/user/is-logged-in',
    isLoggedIn
)
userRouter.get(
    '/user/logout',
    logout
)
userRouter.post(
    '/user/delete-account',
    isAuthenticated,
    deleteAccount
)

export default userRouter