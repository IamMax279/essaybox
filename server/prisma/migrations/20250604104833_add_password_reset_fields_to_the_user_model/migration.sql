-- AlterTable
ALTER TABLE "users" ADD COLUMN     "passwordToken" TEXT,
ADD COLUMN     "passwordTokenExpiry" TIMESTAMP(3);
