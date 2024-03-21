/*
  Warnings:

  - The primary key for the `branch` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `branch` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id_chapter` on the `branch` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `chapter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `chapter` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `command` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `command` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id_user` on the `command` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `permission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `permission` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `product` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id_branch` on the `product` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `product_command` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id_command` on the `product_command` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id_product` on the `product_command` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `role` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `role_permissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id_role` on the `role_permissions` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id_permission` on the `role_permissions` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `service` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `service` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `serviceId` on the `user` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `user_role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id_user` on the `user_role` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id_role` on the `user_role` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `branch` DROP FOREIGN KEY `Branch_id_chapter_fkey`;

-- DropForeignKey
ALTER TABLE `command` DROP FOREIGN KEY `Command_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_id_branch_fkey`;

-- DropForeignKey
ALTER TABLE `product_command` DROP FOREIGN KEY `Product_Command_id_command_fkey`;

-- DropForeignKey
ALTER TABLE `product_command` DROP FOREIGN KEY `Product_Command_id_product_fkey`;

-- DropForeignKey
ALTER TABLE `role_permissions` DROP FOREIGN KEY `Role_Permissions_id_permission_fkey`;

-- DropForeignKey
ALTER TABLE `role_permissions` DROP FOREIGN KEY `Role_Permissions_id_role_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_serviceId_fkey`;

-- DropForeignKey
ALTER TABLE `user_role` DROP FOREIGN KEY `User_Role_id_role_fkey`;

-- DropForeignKey
ALTER TABLE `user_role` DROP FOREIGN KEY `User_Role_id_user_fkey`;

-- AlterTable
ALTER TABLE `branch` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_chapter` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `chapter` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `command` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_user` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`, `id_user`);

-- AlterTable
ALTER TABLE `permission` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `product` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_branch` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `product_command` DROP PRIMARY KEY,
    MODIFY `id_command` INTEGER NOT NULL,
    MODIFY `id_product` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id_command`, `id_product`);

-- AlterTable
ALTER TABLE `role` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `role_permissions` DROP PRIMARY KEY,
    MODIFY `id_role` INTEGER NOT NULL,
    MODIFY `id_permission` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id_role`, `id_permission`);

-- AlterTable
ALTER TABLE `service` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `serviceId` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user_role` DROP PRIMARY KEY,
    MODIFY `id_user` INTEGER NOT NULL,
    MODIFY `id_role` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id_user`, `id_role`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Command` ADD CONSTRAINT `Command_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product_Command` ADD CONSTRAINT `Product_Command_id_command_fkey` FOREIGN KEY (`id_command`) REFERENCES `Command`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product_Command` ADD CONSTRAINT `Product_Command_id_product_fkey` FOREIGN KEY (`id_product`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Role` ADD CONSTRAINT `User_Role_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Role` ADD CONSTRAINT `User_Role_id_role_fkey` FOREIGN KEY (`id_role`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Role_Permissions` ADD CONSTRAINT `Role_Permissions_id_role_fkey` FOREIGN KEY (`id_role`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Role_Permissions` ADD CONSTRAINT `Role_Permissions_id_permission_fkey` FOREIGN KEY (`id_permission`) REFERENCES `Permission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_id_branch_fkey` FOREIGN KEY (`id_branch`) REFERENCES `Branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Branch` ADD CONSTRAINT `Branch_id_chapter_fkey` FOREIGN KEY (`id_chapter`) REFERENCES `Chapter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
