/*
  Warnings:

  - The primary key for the `PackageFeature` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "PackageFeature" DROP CONSTRAINT "PackageFeature_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PackageFeature_pkey" PRIMARY KEY ("id");
