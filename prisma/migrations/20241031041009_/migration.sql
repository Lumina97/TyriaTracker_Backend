/*
  Warnings:

  - You are about to drop the `DailyCraftin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DailyCraftin";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "DailyCrafting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
