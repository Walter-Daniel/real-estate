/*
  Warnings:

  - You are about to drop the column `addedLoaction` on the `Home` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Home` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Home" DROP COLUMN "addedLoaction",
DROP COLUMN "country",
ADD COLUMN     "addedLocation" BOOLEAN NOT NULL DEFAULT false;
