/*
  Warnings:

  - You are about to alter the column `vendorValue` on the `TradeableItems` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TradeableItems" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "rarity" TEXT NOT NULL,
    "vendorValue" INTEGER NOT NULL,
    "icon" TEXT NOT NULL
);
INSERT INTO "new_TradeableItems" ("icon", "id", "level", "name", "rarity", "vendorValue") SELECT "icon", "id", "level", "name", "rarity", "vendorValue" FROM "TradeableItems";
DROP TABLE "TradeableItems";
ALTER TABLE "new_TradeableItems" RENAME TO "TradeableItems";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
