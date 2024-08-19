-- DropForeignKey
ALTER TABLE `user_setting` DROP FOREIGN KEY `user_setting_id_setting_fkey`;

-- DropForeignKey
ALTER TABLE `user_setting` DROP FOREIGN KEY `user_setting_id_user_fkey`;

-- AddForeignKey
ALTER TABLE `user_setting` ADD CONSTRAINT `user_setting_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_setting` ADD CONSTRAINT `user_setting_id_setting_fkey` FOREIGN KEY (`id_setting`) REFERENCES `setting`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
