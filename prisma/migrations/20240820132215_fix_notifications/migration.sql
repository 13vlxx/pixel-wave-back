/*
  Warnings:

  - You are about to drop the column `id_notification` on the `user_notification` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `user_notification_id_notification_fkey` ON `user_notification`;

-- AlterTable
ALTER TABLE `user_notification` DROP COLUMN `id_notification`;
