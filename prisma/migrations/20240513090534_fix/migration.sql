/*
  Warnings:

  - You are about to alter the column `notificationType` on the `notification` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE `notification` MODIFY `notificationType` VARCHAR(255) NOT NULL;
