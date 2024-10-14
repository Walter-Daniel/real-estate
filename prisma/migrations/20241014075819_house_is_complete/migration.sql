/*
  Warnings:

  - You are about to drop the column `addedCategory` on the `House` table. All the data in the column will be lost.
  - You are about to drop the column `addedDescription` on the `House` table. All the data in the column will be lost.
  - You are about to drop the column `addedLocation` on the `House` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "House" DROP COLUMN "addedCategory",
DROP COLUMN "addedDescription",
DROP COLUMN "addedLocation",
ADD COLUMN     "isComplete" BOOLEAN NOT NULL DEFAULT false;
