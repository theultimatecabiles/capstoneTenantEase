/*
  Warnings:

  - You are about to drop the column `endDate` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `favorite` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `hostId` on the `listing` table. All the data in the column will be lost.
  - You are about to drop the column `hostId` on the `review` table. All the data in the column will be lost.
  - You are about to drop the `host` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bookingDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guestTypeId` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeTypeId` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Made the column `senderId` on table `message` required. This step will fail if there are existing NULL values in that column.
  - Made the column `receiverId` on table `message` required. This step will fail if there are existing NULL values in that column.
  - Made the column `listingId` on table `review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `review` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `roleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `listing` DROP FOREIGN KEY `Listing_hostId_fkey`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `HostReceiverFK`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `HostSenderFK`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `UserReceiverFK`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `UserSenderFK`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_hostId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_listingId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_userId_fkey`;

-- AlterTable
ALTER TABLE `booking` DROP COLUMN `endDate`,
    DROP COLUMN `startDate`,
    DROP COLUMN `totalPrice`,
    ADD COLUMN `bookingDate` DATETIME(3) NOT NULL,
    ADD COLUMN `statusId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `favorite` DROP COLUMN `createdAt`,
    ADD COLUMN `addedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `image` DROP COLUMN `url`,
    ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `uploadedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `listing` DROP COLUMN `hostId`,
    ADD COLUMN `guestTypeId` INTEGER NOT NULL,
    ADD COLUMN `placeTypeId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `message` MODIFY `senderId` INTEGER NOT NULL,
    MODIFY `receiverId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `review` DROP COLUMN `hostId`,
    MODIFY `listingId` INTEGER NOT NULL,
    MODIFY `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `roleId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `host`;

-- CreateTable
CREATE TABLE `Role` (
    `roleId` INTEGER NOT NULL AUTO_INCREMENT,
    `roleName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Role_roleName_key`(`roleName`),
    PRIMARY KEY (`roleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlaceType` (
    `placeTypeId` INTEGER NOT NULL AUTO_INCREMENT,
    `placeTypeName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PlaceType_placeTypeName_key`(`placeTypeName`),
    PRIMARY KEY (`placeTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GuestType` (
    `guestTypeId` INTEGER NOT NULL AUTO_INCREMENT,
    `guestTypeName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `GuestType_guestTypeName_key`(`guestTypeName`),
    PRIMARY KEY (`guestTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookingStatus` (
    `statusId` INTEGER NOT NULL AUTO_INCREMENT,
    `statusName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `BookingStatus_statusName_key`(`statusName`),
    PRIMARY KEY (`statusId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `paymentId` INTEGER NOT NULL AUTO_INCREMENT,
    `bookingId` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `paymentDate` DATETIME(3) NOT NULL,
    `paymentMethodId` INTEGER NOT NULL,
    `statusId` INTEGER NOT NULL,

    UNIQUE INDEX `Payment_bookingId_key`(`bookingId`),
    PRIMARY KEY (`paymentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaymentMethod` (
    `methodId` INTEGER NOT NULL AUTO_INCREMENT,
    `methodName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PaymentMethod_methodName_key`(`methodName`),
    PRIMARY KEY (`methodId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaymentStatus` (
    `statusId` INTEGER NOT NULL AUTO_INCREMENT,
    `statusName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PaymentStatus_statusName_key`(`statusName`),
    PRIMARY KEY (`statusId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookingHistory` (
    `historyId` INTEGER NOT NULL AUTO_INCREMENT,
    `bookingId` INTEGER NOT NULL,
    `statusId` INTEGER NOT NULL,
    `changedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `notes` VARCHAR(191) NULL,

    PRIMARY KEY (`historyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ListingAmenity` (
    `listingAmenityId` INTEGER NOT NULL AUTO_INCREMENT,
    `listingId` INTEGER NOT NULL,
    `amenityId` INTEGER NOT NULL,

    PRIMARY KEY (`listingAmenityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Amenity` (
    `amenityId` INTEGER NOT NULL AUTO_INCREMENT,
    `amenityName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Amenity_amenityName_key`(`amenityName`),
    PRIMARY KEY (`amenityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`roleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Listing` ADD CONSTRAINT `Listing_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Listing` ADD CONSTRAINT `Listing_placeTypeId_fkey` FOREIGN KEY (`placeTypeId`) REFERENCES `PlaceType`(`placeTypeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Listing` ADD CONSTRAINT `Listing_guestTypeId_fkey` FOREIGN KEY (`guestTypeId`) REFERENCES `GuestType`(`guestTypeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_listingId_fkey` FOREIGN KEY (`listingId`) REFERENCES `Listing`(`listingId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `BookingStatus`(`statusId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`bookingId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_paymentMethodId_fkey` FOREIGN KEY (`paymentMethodId`) REFERENCES `PaymentMethod`(`methodId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `PaymentStatus`(`statusId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookingHistory` ADD CONSTRAINT `BookingHistory_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`bookingId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookingHistory` ADD CONSTRAINT `BookingHistory_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `BookingStatus`(`statusId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ListingAmenity` ADD CONSTRAINT `ListingAmenity_listingId_fkey` FOREIGN KEY (`listingId`) REFERENCES `Listing`(`listingId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ListingAmenity` ADD CONSTRAINT `ListingAmenity_amenityId_fkey` FOREIGN KEY (`amenityId`) REFERENCES `Amenity`(`amenityId`) ON DELETE RESTRICT ON UPDATE CASCADE;
