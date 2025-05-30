import { Request, Response, Router } from "express";
import { UserController } from "../controllers/UserController";

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
        return res.status(200).json(result)
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

export default userRouter