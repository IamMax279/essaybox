import { Resend } from "resend";
import { RestResponse } from "../../../@types";
import { randomBytes } from "crypto";
import prisma from "../../prisma/PrismaClient";

const resend = new Resend(process.env.RESEND_API_KEY)

export class EmailService {
    static async sendVerificationEmail(receiver: string, token: string): Promise<RestResponse> {
        try {
            await resend.emails.send({
                from: 'noreply@essaybox.pl',
                to: receiver,
                subject: 'Zweryfikuj swój adres e-mail',
                html: `<p>Kliknij, aby zweryfikować swoje konto:</p>
                <a href="${process.env.CLIENT_URL}/verify-email?token=${token}">Zweryfikuj</a>`,
            })

            return {
                success: true,
                message: "Email sent successfully"
            }
        } catch (error) {
            console.log("Error sending email:", error)
            throw new Error(`Coś poszło nie tak. Spróbuj ponownie później.`)
        }
    }

    static async sendPasswordChangeEmail(receiver: string): Promise<RestResponse> {
        const token = randomBytes(32).toString("hex")
        const tokenExpiry = new Date(Date.now() + 1000 * 60 * 60)

        const user = await prisma.user.findUnique({ where: { email: receiver } })
        if (!user) {
            throw new Error("Konto powiązane z tym adresem e-mail nie istnieje")
        }
        if (user.provider === "google") {
            throw new Error("To konto zostało utworzone przez Google. Zaloguj się używając Google.")
        }
        if (user.passwordToken && user.passwordTokenExpiry && user.passwordTokenExpiry > new Date()) {
            throw new Error("Link do zmiany hasła został już wysłany. Sprawdź swoją skrzynkę e-mail.")
        }

        await prisma.user.update({
            where: { email: receiver },
            data: { passwordToken: token, passwordTokenExpiry: tokenExpiry }
        })

        await resend.emails.send({
        from: 'noreply@essaybox.pl',
        to: receiver,
        subject: 'Zmiana hasła Twojego konta EssayBox',
        html: `<p>Kliknij, aby zmienić hasło do swojego konta:</p>
        <a href="${process.env.CLIENT_URL}/reset-password?token=${token}">Zmień hasło</a>`,
        })

        return {
            success: true,
            message: "Email sent successfully"
        }
    }
}