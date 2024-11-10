/*
  Warnings:

  - You are about to drop the column `userId` on the `notification` table. All the data in the column will be lost.
  - Added the required column `bookerId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hostId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `listingId` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `Notification_userId_fkey`;

-- AlterTable
ALTER TABLE `notification` DROP COLUMN `userId`,
    ADD COLUMN `bookerId` INTEGER NOT NULL,
    ADD COLUMN `hostId` INTEGER NOT NULL,
    ADD COLUMN `listingId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_hostId_fkey` FOREIGN KEY (`hostId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_bookerId_fkey` FOREIGN KEY (`bookerId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_listingId_fkey` FOREIGN KEY (`listingId`) REFERENCES `Listing`(`listingId`) ON DELETE RESTRICT ON UPDATE CASCADE;
