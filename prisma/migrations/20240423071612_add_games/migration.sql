-- CreateTable
CREATE TABLE `game` (
    `id` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `logo` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `releaseDate` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `game_category` (
    `id_game` VARCHAR(191) NOT NULL,
    `id_category` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_game`, `id_category`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `category_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `game_platform` (
    `id_game` VARCHAR(191) NOT NULL,
    `id_platform` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_game`, `id_platform`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `platform` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `platform_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `media` (
    `id` VARCHAR(191) NOT NULL,
    `id_game` VARCHAR(191) NOT NULL,
    `type` ENUM('IMAGE', 'VIDEO') NOT NULL DEFAULT 'IMAGE',
    `path` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `game` ADD CONSTRAINT `game_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `game_category` ADD CONSTRAINT `game_category_id_game_fkey` FOREIGN KEY (`id_game`) REFERENCES `game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `game_category` ADD CONSTRAINT `game_category_id_category_fkey` FOREIGN KEY (`id_category`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `game_platform` ADD CONSTRAINT `game_platform_id_game_fkey` FOREIGN KEY (`id_game`) REFERENCES `game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `game_platform` ADD CONSTRAINT `game_platform_id_platform_fkey` FOREIGN KEY (`id_platform`) REFERENCES `platform`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `media` ADD CONSTRAINT `media_id_game_fkey` FOREIGN KEY (`id_game`) REFERENCES `game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
