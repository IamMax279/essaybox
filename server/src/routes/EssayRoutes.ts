import { Request, Response, Router } from "express";
import { EssayController } from "../controllers/EssayController";
import { isSubscribed } from "../middleware/SubscribedMiddleware";
import ConvertAPI from "convertapi";
import fs from "fs/promises";
import path from "path";
import os from "os";
import { v4 as uuidv4 } from "uuid"

const essayRouter = Router()

const findByUuid = async (req: Request, res: Response): Promise<any> => {
    try {
        const { uuid } = req.body
        const result = await EssayController.findByUuid(uuid)

        return res.status(200).json(result)
    } catch (error) {
        if (error instanceof Error && (
            error.message.includes("Uuid nie zostało") ||
            error.message.includes("Rozprawka o takim")
        )) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }

        return res.status(500).json({
            sucess: false,
            message: "Internal server error"
        })
    }
}

const convertToPdf = async (req: Request, res: Response): Promise<any> => {
    try {
        const { essay, title }: { essay: string, title: string } = req.body
        const convertApi = new ConvertAPI(process.env.CONVERTAPI_KEY!)

        const htmlContent = `
        <html>
            <head>
            <style>
                body { font-family: 'Arial', sans-serif; font-size: 28px; }
            </style>
            </head>
            <body>
            ${essay.replace(/\n/g, "<br>")}
            </body>
        </html>
        `;
        const tempDir = os.tmpdir()
        const tempFilePath = path.join(tempDir, `${title.replace(/ /g, '-').replace(/[\s<>:"/\\|?*]+/g, "")}-${uuidv4()}.html`)
        await fs.writeFile(tempFilePath, htmlContent, "utf-8")

        const result = await convertApi.convert('pdf', {
            File: tempFilePath
        }, 'html')

        await fs.unlink(tempFilePath)

        const pdfUrl = result.files[0].url
        return res.status(200).json({
            success: true,
            message: pdfUrl
        })
    } catch (error) {
        console.log("ERROR:", error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

essayRouter.post(
    '/essay/find-by-uuid',
    findByUuid
)
essayRouter.post(
    '/essay/convert-to-pdf',
    //isSubscribed,
    convertToPdf
)

export default essayRouter