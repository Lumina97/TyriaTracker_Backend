/*
  Warnings:

  - Added the required column `icon` to the `TradeableItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `TradeableItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `TradeableItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rarity` to the `TradeableItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendorValue` to the `TradeableItems` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "PriceHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemID" INTEGER NOT NULL,
    "buyPrice" INTEGER NOT NULL,
    "sellPrice" INTEGER NOT NULL,
    "supply" INTEGER,
    "demand" INTEGER,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PriceHistory_itemID_fkey" FOREIGN KEY ("itemID") REFERENCES "TradeableItems" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TradeableItems" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "rarity" TEXT NOT NULL,
    "vendorValue" TEXT NOT NULL,
    "icon" TEXT NOT NULL
);
INSERT INTO "new_TradeableItems" ("id") SELECT "id" FROM "TradeableItems";
DROP TABLE "TradeableItems";
ALTER TABLE "new_TradeableItems" RENAME TO "TradeableItems";
CREATE UNIQUE INDEX "TradeableItems_id_key" ON "TradeableItems"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "PriceHistory_itemID_timestamp_idx" ON "PriceHistory"("itemID", "timestamp");
