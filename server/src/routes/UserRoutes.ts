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
            error.message.includes("already exists") ||
            error.message.includes("not been provided") ||
            error.message.includes("Password is shorter")
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
            error.message.includes("not been provided") ||
            error.message.includes("does not exist") ||
            error.message.includes("not verified") ||
            error.message.includes("Passwords don't match")
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

export default userRouter