/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `employees` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `members` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `members` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "members" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");

-- CreateIndex
CREATE UNIQUE INDEX "members_email_key" ON "members"("email");
