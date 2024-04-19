/*
  Warnings:

  - The primary key for the `user_setting` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `setting_id` on the `user_setting` table. All the data in the column will be lost.
  - Added the required column `id_setting` to the `user_setting` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user_setting` DROP FOREIGN KEY `user_setting_setting_id_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `profilePicture` VARCHAR(255) NULL DEFAULT 'default';

-- AlterTable
ALTER TABLE `user_setting` DROP PRIMARY KEY,
    DROP COLUMN `setting_id`,
    ADD COLUMN `id_setting` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id_user`, `id_setting`);

-- AddForeignKey
ALTER TABLE `user_setting` ADD CONSTRAINT `user_setting_id_setting_fkey` FOREIGN KEY (`id_setting`) REFERENCES `setting`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
