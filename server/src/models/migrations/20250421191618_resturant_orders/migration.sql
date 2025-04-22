/*
  Warnings:

  - You are about to drop the column `restaurant` on the `Order` table. All the data in the column will be lost.
  - Changed the type of `cartItems` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "restaurant",
ALTER COLUMN "restaurantId" DROP NOT NULL,
DROP COLUMN "cartItems",
ADD COLUMN     "cartItems" JSONB NOT NULL;
