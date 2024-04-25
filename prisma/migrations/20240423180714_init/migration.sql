/*
  Warnings:

  - You are about to drop the column `source` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `source_ref` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `account_id` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "source",
DROP COLUMN "source_ref",
ADD COLUMN     "account_id" VARCHAR(256) NOT NULL;
