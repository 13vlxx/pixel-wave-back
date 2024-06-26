/*
  Warnings:

  - You are about to alter the column `notificationType` on the `notification` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `notification` MODIFY `notificationType` ENUM('NEW_COMMENT', 'NEW_LIKE') NOT NULL;
