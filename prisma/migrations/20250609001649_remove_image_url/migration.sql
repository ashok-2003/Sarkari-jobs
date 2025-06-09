/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `AdmissionItem` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `AdmitCardItem` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `AnswerKeyItem` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `JobItem` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `ResultItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AdmissionItem" DROP COLUMN "imageUrl";

-- AlterTable
ALTER TABLE "AdmitCardItem" DROP COLUMN "imageUrl";

-- AlterTable
ALTER TABLE "AnswerKeyItem" DROP COLUMN "imageUrl";

-- AlterTable
ALTER TABLE "JobItem" DROP COLUMN "imageUrl";

-- AlterTable
ALTER TABLE "ResultItem" DROP COLUMN "imageUrl";
