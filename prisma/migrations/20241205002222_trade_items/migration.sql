-- CreateTable
CREATE TABLE "TradeableItems" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateIndex
CREATE UNIQUE INDEX "TradeableItems_id_key" ON "TradeableItems"("id");
