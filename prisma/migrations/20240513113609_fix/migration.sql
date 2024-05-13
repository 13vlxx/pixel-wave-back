/*
  Warnings:

  - Added the required column `id_game` to the `news` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `news` DROP FOREIGN KEY `news_id_fkey`;

-- AlterTable
ALTER TABLE `news` ADD COLUMN `id_game` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `news` ADD CONSTRAINT `news_id_game_fkey` FOREIGN KEY (`id_game`) REFERENCES `game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
