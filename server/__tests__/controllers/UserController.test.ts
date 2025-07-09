import { UserController } from "../../src/controllers/UserController";

jest.mock("../../prisma/PrismaClient", () => ({
    __esModule: true,
    default: {
        user: {
            create: jest.fn(),
            findUnique: jest.fn()
        }
    }
}))

jest.mock("../../src/services/EmailService", () => ({
    EmailService: {
        sendVerificationEmail: jest.fn().mockResolvedValue({
            success: true,
            message: "Email sent successfully"
        })
    }
}))

jest.mock("argon2", () => ({
    hash: jest.fn()
}))

const prisma = require("../../prisma/PrismaClient").default;
const argon2 = require("argon2");

describe("UserController", () => {
    describe("registerUser", () => {
        beforeEach(() => {
            jest.clearAllMocks()
        })

        test("should create a user if all the fields were provided", async () => {
            const mockUser = {
                email: "test@123.com",
                password: "password123"
            };

            argon2.hash.mockResolvedValue("hashed-pass")
            prisma.user.findUnique.mockResolvedValue(null)
            prisma.user.create.mockResolvedValue({
                id: 1,
                email: mockUser.email,
                password: "hashed_pass",
                name: mockUser.email.split('@')[0],
                verified: false,
                isAdmin: false,
                createdAt: new Date()
            })

            const result = await UserController.registerUser(mockUser.email, mockUser.password)

            expect(result).toEqual({
                success: true,
                message: "User created successfully"
            })
            expect(prisma.user.create).toHaveBeenCalled()
        })

        test("should throw an error if a field was not provided", async () => {
            const mockUser = {
                email: "",
                password: "password123"
            };

            await expect(UserController.registerUser(mockUser.email, mockUser.password))
            .rejects.toThrow("Email lub hasło nie zostały podane")
            expect(prisma.user.create).not.toHaveBeenCalled()
        })

        test("should throw an error if none of the fields were provided", async () => {
            const mockUser = {
                email: "",
                password: ""
            };

            await expect(UserController.registerUser(mockUser.email, mockUser.password))
            .rejects.toThrow("Email lub hasło nie zostały podane")
            expect(prisma.user.create).not.toHaveBeenCalled()
        })

        test("should throw an error if a user with such email address already exists", async () => {
            const mockUser = {
                email: "test@123.com",
                password: "password123"
            };

            argon2.hash.mockResolvedValue("hashed-pass")
            prisma.user.findUnique.mockResolvedValue({
                id: 1,
                email: "test@123.com",
                password: "test123",
                name: "test",
                verified: false,
                isAdmin: false,
                createdAt: new Date(),
                updatedAt: new Date()
            })

            await expect(UserController.registerUser(mockUser.email, mockUser.password))
            .rejects.toThrow("Konto powiązane z tym adresem e-mail już istnieje")
            expect(prisma.user.create).not.toHaveBeenCalled()
        })

        test("should throw an error if a field provided only consists of whitespace", async () => {
            const mockUser = {
                email: "  ",
                password: "password123"
            };

            await expect(UserController.registerUser(mockUser.email, mockUser.password))
            .rejects.toThrow("Email lub hasło nie zostały podane")
            expect(prisma.user.create).not.toHaveBeenCalled()
        })
        
        test("should throw an error if the provided password is too short", async () => {
            const mockUser = {
                email: "test@123.com",
                password: "passwor"
            };

            await expect(UserController.registerUser(mockUser.email, mockUser.password))
            .rejects.toThrow("Hasło jest krótsze niż 8 znaków")
            expect(prisma.user.create).not.toHaveBeenCalled()
        })
    })
})