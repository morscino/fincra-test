/*
  Warnings:

  - Added the required column `beneficiary_bank_name` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender_account_name` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender_account_number` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender_bank_name` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Made the column `beneficiary_account_name` on table `transactions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `beneficiary_account_number` on table `transactions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "beneficiary_bank_name" VARCHAR(256) NOT NULL,
ADD COLUMN     "sender_account_name" VARCHAR(256) NOT NULL,
ADD COLUMN     "sender_account_number" VARCHAR(256) NOT NULL,
ADD COLUMN     "sender_bank_name" VARCHAR(256) NOT NULL,
ALTER COLUMN "beneficiary_account_name" SET NOT NULL,
ALTER COLUMN "beneficiary_account_number" SET NOT NULL;
