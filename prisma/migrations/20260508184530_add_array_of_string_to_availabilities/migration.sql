/*
  Warnings:

  - You are about to drop the `technician_availabilities` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "technician_availabilities" DROP CONSTRAINT "technician_availabilities_technicianId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "availabilities" TEXT[];

-- DropTable
DROP TABLE "technician_availabilities";
