import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient()
process.on('SIGINT', async () => {
    await prisma.$disconnect()
    process.exit(0)
})

export default prisma