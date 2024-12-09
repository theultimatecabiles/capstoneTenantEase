/*
  Warnings:

  - Added the required column `approvalStatusId` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `listing` ADD COLUMN `approvalStatusId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `ApprovalStatus` (
    `statusId` INTEGER NOT NULL AUTO_INCREMENT,
    `statusName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ApprovalStatus_statusName_key`(`statusName`),
    PRIMARY KEY (`statusId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Listing` ADD CONSTRAINT `Listing_approvalStatusId_fkey` FOREIGN KEY (`approvalStatusId`) REFERENCES `ApprovalStatus`(`statusId`) ON DELETE RESTRICT ON UPDATE CASCADE;
