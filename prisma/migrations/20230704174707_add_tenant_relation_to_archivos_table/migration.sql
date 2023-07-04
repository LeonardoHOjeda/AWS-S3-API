/*
  Warnings:

  - Added the required column `tenant_id` to the `archivos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "archivos" ADD COLUMN     "tenant_id" INTEGER NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT NOW();

-- AddForeignKey
ALTER TABLE "archivos" ADD CONSTRAINT "archivos_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
