/*
  Warnings:

  - You are about to drop the column `passwordReset` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `passwordReset`,
    ADD COLUMN `resetPasswordCode` VARCHAR(255) NULL,
    ADD COLUMN `resetPasswordCodeDate` DATETIME NULL;
