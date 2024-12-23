/*
  Warnings:

  - You are about to drop the column `timestamp` on the `LatestPriceHistory` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LatestPriceHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemID" INTEGER NOT NULL,
    "buyPrice" INTEGER NOT NULL,
    "sellPrice" INTEGER NOT NULL,
    "supply" INTEGER,
    "demand" INTEGER,
    CONSTRAINT "LatestPriceHistory_itemID_fkey" FOREIGN KEY ("itemID") REFERENCES "TradeableItems" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LatestPriceHistory" ("buyPrice", "demand", "id", "itemID", "sellPrice", "supply") SELECT "buyPrice", "demand", "id", "itemID", "sellPrice", "supply" FROM "LatestPriceHistory";
DROP TABLE "LatestPriceHistory";
ALTER TABLE "new_LatestPriceHistory" RENAME TO "LatestPriceHistory";
CREATE UNIQUE INDEX "LatestPriceHistory_itemID_key" ON "LatestPriceHistory"("itemID");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
