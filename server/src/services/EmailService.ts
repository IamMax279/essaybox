import { Resend } from "resend";
import { RestResponse } from "../types/ResponseTypes";

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
}