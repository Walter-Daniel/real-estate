/*
  Warnings:

  - The `guests` column on the `Home` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `bedrooms` column on the `Home` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `bathrooms` column on the `Home` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `price` on the `Home` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Home" DROP COLUMN "guests",
ADD COLUMN     "guests" INTEGER,
DROP COLUMN "bedrooms",
ADD COLUMN     "bedrooms" INTEGER,
DROP COLUMN "bathrooms",
ADD COLUMN     "bathrooms" INTEGER,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);
