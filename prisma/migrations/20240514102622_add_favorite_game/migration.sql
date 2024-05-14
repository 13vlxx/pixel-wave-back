-- AlterTable
ALTER TABLE `news` ADD COLUMN `status` ENUM('WAITING', 'ACCEPTED', 'REFUSED') NOT NULL DEFAULT 'WAITING';

-- CreateTable
CREATE TABLE `favorite_game` (
    `id_game` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_game`, `id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `favorite_game` ADD CONSTRAINT `favorite_game_id_game_fkey` FOREIGN KEY (`id_game`) REFERENCES `game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorite_game` ADD CONSTRAINT `favorite_game_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
