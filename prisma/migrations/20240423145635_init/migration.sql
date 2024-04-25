/*
  Warnings:

  - Added the required column `reference` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "accounts_phone_number_key";

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "reference" VARCHAR(256) NOT NULL;
