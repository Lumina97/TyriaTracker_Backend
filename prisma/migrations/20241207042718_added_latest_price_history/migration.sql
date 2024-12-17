-- CreateTable
CREATE TABLE "LatestPriceHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemID" INTEGER NOT NULL,
    "buyPrice" INTEGER NOT NULL,
    "sellPrice" INTEGER NOT NULL,
    "supply" INTEGER,
    "demand" INTEGER,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LatestPriceHistory_itemID_fkey" FOREIGN KEY ("itemID") REFERENCES "TradeableItems" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "LatestPriceHistory_itemID_key" ON "LatestPriceHistory"("itemID");

-- CreateIndex
CREATE INDEX "LatestPriceHistory_itemID_timestamp_idx" ON "LatestPriceHistory"("itemID", "timestamp");
