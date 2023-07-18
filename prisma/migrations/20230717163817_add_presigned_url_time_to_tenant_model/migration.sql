/*
  Warnings:

  - Added the required column `presigned_url_time` to the `tenants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "archivos" ALTER COLUMN "created_at" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "tenants" ADD COLUMN     "presigned_url_time" INTEGER NOT NULL;
