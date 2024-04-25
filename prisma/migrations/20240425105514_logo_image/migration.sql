/*
  Warnings:

  - You are about to drop the column `logo` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `platform` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `category` DROP COLUMN `logo`,
    ADD COLUMN `image` VARCHAR(255) NOT NULL DEFAULT 'default';

-- AlterTable
ALTER TABLE `platform` DROP COLUMN `logo`,
    ADD COLUMN `image` VARCHAR(255) NOT NULL DEFAULT 'default';
