/*
  Warnings:

  - You are about to drop the column `homeId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `homeId` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `House` table. All the data in the column will be lost.
  - You are about to drop the column `homeId` on the `HouseAddress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[houseId]` on the table `HouseAddress` will be added. If there are existing duplicate values, this will fail.
  - Made the column `title` on table `House` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `House` required. This step will fail if there are existing NULL values in that column.
  - Made the column `guests` on table `House` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bedrooms` on table `House` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bathrooms` on table `House` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `House` required. This step will fail if there are existing NULL values in that column.
  - Made the column `categoryName` on table `House` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `houseId` to the `HouseAddress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_homeId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_homeId_fkey";

-- DropForeignKey
ALTER TABLE "HouseAddress" DROP CONSTRAINT "HouseAddress_homeId_fkey";

-- DropIndex
DROP INDEX "HouseAddress_homeId_key";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "homeId",
ADD COLUMN     "houseId" TEXT;

-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "homeId",
ADD COLUMN     "houseId" TEXT;

-- AlterTable
ALTER TABLE "House" DROP COLUMN "photo",
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "guests" SET NOT NULL,
ALTER COLUMN "bedrooms" SET NOT NULL,
ALTER COLUMN "bathrooms" SET NOT NULL,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "categoryName" SET NOT NULL;

-- AlterTable
ALTER TABLE "HouseAddress" DROP COLUMN "homeId",
ADD COLUMN     "houseId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "HouseImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "houseId" TEXT NOT NULL,

    CONSTRAINT "HouseImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HouseAddress_houseId_key" ON "HouseAddress"("houseId");

-- AddForeignKey
ALTER TABLE "HouseImage" ADD CONSTRAINT "HouseImage_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseAddress" ADD CONSTRAINT "HouseAddress_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE SET NULL ON UPDATE CASCADE;
