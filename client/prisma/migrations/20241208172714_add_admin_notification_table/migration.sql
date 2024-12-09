-- CreateTable
CREATE TABLE `AdminNotification` (
    `notificationId` INTEGER NOT NULL AUTO_INCREMENT,
    `adminId` INTEGER NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `dateCreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `type` VARCHAR(191) NOT NULL,

    INDEX `AdminNotification_adminId_idx`(`adminId`),
    PRIMARY KEY (`notificationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AdminNotification` ADD CONSTRAINT `AdminNotification_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
