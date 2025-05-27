import { Request, Response, Router } from "express";
import { RestResponse } from "../types/ResponseTypes";
import { UserController } from "../controllers/UserController";

const userRouter = Router()

const registerUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body
        const result = await UserController.registerUser(email, password)
        return res.status(200).json(result)
    } catch(error) {
        return res.status(400).json({
            success: false,
            message: `Something went wrong: ${error instanceof Error ? error.message : ""}`
        })
    }
}

userRouter.post(
    '/user/register',
    registerUser
)

export default userRouter