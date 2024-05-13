/*
  Warnings:

  - You are about to drop the `notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_notification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_notification` DROP FOREIGN KEY `user_notification_id_notification_fkey`;

-- DropForeignKey
ALTER TABLE `user_notification` DROP FOREIGN KEY `user_notification_id_user_fkey`;

-- DropTable
DROP TABLE `notification`;

-- DropTable
DROP TABLE `user_notification`;
