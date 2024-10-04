/*
  Warnings:

  - You are about to drop the column `city` on the `HouseAddress` table. All the data in the column will be lost.
  - You are about to drop the column `localy` on the `HouseAddress` table. All the data in the column will be lost.
  - Added the required column `locality` to the `HouseAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HouseAddress" DROP COLUMN "city",
DROP COLUMN "localy",
ADD COLUMN     "locality" TEXT NOT NULL;
