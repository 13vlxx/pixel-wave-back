/*
  Warnings:

  - You are about to drop the column `id_user` on the `game` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `game_id_user_fkey` ON `game`;

-- AlterTable
ALTER TABLE `game` DROP COLUMN `id_user`;
