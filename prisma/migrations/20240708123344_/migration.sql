/*
  Warnings:

  - You are about to drop the `notification` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `notificationType` to the `user_notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user_notification` DROP FOREIGN KEY `user_notification_id_notification_fkey`;

-- AlterTable
ALTER TABLE `user_notification` ADD COLUMN `notificationType` ENUM('NEW_COMMENT', 'NEW_LIKE') NOT NULL;

-- DropTable
DROP TABLE `notification`;
