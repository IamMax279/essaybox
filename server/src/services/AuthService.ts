import { randomBytes } from "crypto";

export class AuthService {
    static generateVerificationToken() {
        return randomBytes(32).toString("hex")
    }
}