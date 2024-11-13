/*
  Warnings:

  - You are about to drop the `userdocument` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `userdocument` DROP FOREIGN KEY `UserDocument_userId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `document` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `userdocument`;
