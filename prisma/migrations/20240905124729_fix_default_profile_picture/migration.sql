/*
  Warnings:

  - Made the column `profilePicture` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `profilePicture` VARCHAR(255) NOT NULL DEFAULT '/defaults/profile-picture';
