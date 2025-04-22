/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('pending', 'confirmed', 'preparing', 'outfordelivery', 'delivered');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "restaurant" TEXT NOT NULL,
    "userdeliveryEmail" TEXT NOT NULL,
    "userdeliveryName" TEXT NOT NULL,
    "userdeliveryAddress" TEXT NOT NULL,
    "userdeliveryCity" TEXT NOT NULL,
    "cartItems" TEXT[],
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
