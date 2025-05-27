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
    })
})