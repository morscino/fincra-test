/*
  Warnings:

  - You are about to alter the column `account_name` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(256)`.
  - You are about to alter the column `currency` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `slug` on the `reserve_accounts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `currency` on the `reserve_accounts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `type` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `source` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(256)`.
  - You are about to alter the column `source_ref` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `beneficiary_account_name` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(256)`.
  - You are about to alter the column `beneficiary_account_number` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(256)`.
  - You are about to alter the column `mode` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `currency` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `mode` on the `wallets` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `currency` on the `wallets` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `transaction_id` on the `wallets` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(256)`.
  - You are about to alter the column `mode` on the `wallets_history` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `currency` on the `wallets_history` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `wallet_id` on the `wallets_history` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(256)`.
  - You are about to alter the column `transaction_id` on the `wallets_history` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(256)`.

*/
-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "account_name" SET DATA TYPE VARCHAR(256),
ALTER COLUMN "currency" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "reserve_accounts" ALTER COLUMN "slug" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "currency" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "type" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "source" SET DATA TYPE VARCHAR(256),
ALTER COLUMN "source_ref" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "beneficiary_account_name" SET DATA TYPE VARCHAR(256),
ALTER COLUMN "beneficiary_account_number" SET DATA TYPE VARCHAR(256),
ALTER COLUMN "mode" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "currency" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "wallets" ALTER COLUMN "mode" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "currency" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "transaction_id" SET DATA TYPE VARCHAR(256);

-- AlterTable
ALTER TABLE "wallets_history" ALTER COLUMN "mode" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "currency" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "wallet_id" SET DATA TYPE VARCHAR(256),
ALTER COLUMN "transaction_id" SET DATA TYPE VARCHAR(256);
