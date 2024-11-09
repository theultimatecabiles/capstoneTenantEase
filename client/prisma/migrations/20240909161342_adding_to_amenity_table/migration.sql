/*
  Warnings:

  - Added the required column `color` to the `Amenity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iconClass` to the `Amenity` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Amenity_amenityName_key` ON `amenity`;

-- AlterTable
ALTER TABLE `amenity` ADD COLUMN `color` VARCHAR(191) NOT NULL,
    ADD COLUMN `iconClass` VARCHAR(191) NOT NULL;
