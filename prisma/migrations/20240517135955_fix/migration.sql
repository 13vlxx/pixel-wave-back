-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `post_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `post_comment` DROP FOREIGN KEY `post_comment_id_post_fkey`;

-- DropForeignKey
ALTER TABLE `post_comment` DROP FOREIGN KEY `post_comment_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `post_like` DROP FOREIGN KEY `post_like_id_post_fkey`;

-- DropForeignKey
ALTER TABLE `post_like` DROP FOREIGN KEY `post_like_id_user_fkey`;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post_comment` ADD CONSTRAINT `post_comment_id_post_fkey` FOREIGN KEY (`id_post`) REFERENCES `post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post_comment` ADD CONSTRAINT `post_comment_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post_like` ADD CONSTRAINT `post_like_id_post_fkey` FOREIGN KEY (`id_post`) REFERENCES `post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post_like` ADD CONSTRAINT `post_like_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
