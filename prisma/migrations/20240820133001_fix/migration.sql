/*
  Warnings:

  - You are about to drop the column `content` on the `user_notification` table. All the data in the column will be lost.
  - Added the required column `destinationId` to the `user_notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_notification` DROP COLUMN `content`,
    ADD COLUMN `destinationId` VARCHAR(255) NOT NULL;
