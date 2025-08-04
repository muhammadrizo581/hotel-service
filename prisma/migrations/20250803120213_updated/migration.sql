/*
  Warnings:

  - You are about to drop the column `payment_date` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `payment_method` on the `payments` table. All the data in the column will be lost.
  - Added the required column `method` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."payments" DROP COLUMN "payment_date",
DROP COLUMN "payment_method",
ADD COLUMN     "method" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;
