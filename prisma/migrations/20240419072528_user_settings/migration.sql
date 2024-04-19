/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `pseudo` VARCHAR(30) NOT NULL,
    `profilePicture` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('ADMIN', 'MODERATOR', 'USER') NOT NULL DEFAULT 'USER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_pseudo_key`(`pseudo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `setting` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `setting_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_setting` (
    `id_user` VARCHAR(191) NOT NULL,
    `setting_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_user`, `setting_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_setting` ADD CONSTRAINT `user_setting_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_setting` ADD CONSTRAINT `user_setting_setting_id_fkey` FOREIGN KEY (`setting_id`) REFERENCES `setting`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
