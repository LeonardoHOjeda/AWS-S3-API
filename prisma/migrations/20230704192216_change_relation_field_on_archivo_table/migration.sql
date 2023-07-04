/*
  Warnings:

  - You are about to drop the column `tenant_id` on the `archivos` table. All the data in the column will be lost.
  - Added the required column `tenant_uuid` to the `archivos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "archivos" DROP CONSTRAINT "archivos_tenant_id_fkey";

-- AlterTable
ALTER TABLE "archivos" DROP COLUMN "tenant_id",
ADD COLUMN     "tenant_uuid" TEXT NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT NOW();

-- AddForeignKey
ALTER TABLE "archivos" ADD CONSTRAINT "archivos_tenant_uuid_fkey" FOREIGN KEY ("tenant_uuid") REFERENCES "tenants"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
