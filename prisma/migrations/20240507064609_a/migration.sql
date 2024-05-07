/*
  Warnings:

  - You are about to drop the column `kind_of_payment` on the `reservation` table. All the data in the column will be lost.
  - Added the required column `total_cost` to the `reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservation" DROP COLUMN "kind_of_payment",
ADD COLUMN     "total_cost" DOUBLE PRECISION NOT NULL;
