-- CreateTable
CREATE TABLE `game_advice` (
    `id_game` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `advice` TEXT NOT NULL,
    `note` INTEGER NOT NULL,

    PRIMARY KEY (`id_game`, `id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `game_advice` ADD CONSTRAINT `game_advice_id_game_fkey` FOREIGN KEY (`id_game`) REFERENCES `game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `game_advice` ADD CONSTRAINT `game_advice_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
