-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "status" VARCHAR(256) NOT NULL DEFAULT 'pending';
