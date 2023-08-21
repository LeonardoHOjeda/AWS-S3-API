/*
  Warnings:

  - You are about to drop the column `aws_key` on the `archivos` table. All the data in the column will be lost.
  - Added the required column `aws_object_key` to the `archivos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "archivos" DROP COLUMN "aws_key",
ADD COLUMN     "aws_object_key" TEXT NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT NOW();

-- CreateTable
CREATE TABLE "tenants" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenants_uuid_key" ON "tenants"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_nombre_key" ON "tenants"("nombre");
