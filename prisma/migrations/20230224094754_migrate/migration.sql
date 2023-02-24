/*
  Warnings:

  - The primary key for the `Package` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Package` table. All the data in the column will be lost.
  - You are about to drop the column `packageId` on the `PackageFeature` table. All the data in the column will be lost.
  - Changed the type of `level` on the `Package` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "PackageFeature" DROP CONSTRAINT "PackageFeature_packageId_fkey";

-- AlterTable
ALTER TABLE "Package" DROP CONSTRAINT "Package_pkey",
DROP COLUMN "id",
DROP COLUMN "level",
ADD COLUMN     "level" TEXT NOT NULL,
ADD CONSTRAINT "Package_pkey" PRIMARY KEY ("level");

-- AlterTable
ALTER TABLE "PackageFeature" DROP COLUMN "packageId",
ADD COLUMN     "packageLevel" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currentPackageLevel" TEXT;

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_currentPackageLevel_fkey" FOREIGN KEY ("currentPackageLevel") REFERENCES "Package"("level") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackageFeature" ADD CONSTRAINT "PackageFeature_packageLevel_fkey" FOREIGN KEY ("packageLevel") REFERENCES "Package"("level") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
