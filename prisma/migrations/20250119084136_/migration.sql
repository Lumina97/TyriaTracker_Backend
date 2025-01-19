-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "APIKey" TEXT
);

-- CreateTable
CREATE TABLE "RaidWing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "RaidEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "RaidWingID" INTEGER NOT NULL,
    CONSTRAINT "RaidEvent_RaidWingID_fkey" FOREIGN KEY ("RaidWingID") REFERENCES "RaidWing" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Dungeon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DungeonPath" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "DungeonID" INTEGER NOT NULL,
    CONSTRAINT "DungeonPath_DungeonID_fkey" FOREIGN KEY ("DungeonID") REFERENCES "Dungeon" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Worldbosses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DailyCrafting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "level" INTEGER,
    "rarity" TEXT,
    "vendorValue" INTEGER,
    "icon" TEXT
);

-- CreateTable
CREATE TABLE "TradeableItems" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "rarity" TEXT NOT NULL,
    "vendorValue" INTEGER NOT NULL,
    "icon" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PriceHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemID" INTEGER NOT NULL,
    "buyPrice" INTEGER NOT NULL,
    "sellPrice" INTEGER NOT NULL,
    "profit" INTEGER,
    "ROI" INTEGER,
    "supply" INTEGER,
    "demand" INTEGER,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PriceHistory_itemID_fkey" FOREIGN KEY ("itemID") REFERENCES "TradeableItems" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LatestPriceHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemID" INTEGER NOT NULL,
    "buyPrice" INTEGER NOT NULL,
    "sellPrice" INTEGER NOT NULL,
    "profit" INTEGER,
    "ROI" INTEGER,
    "supply" INTEGER,
    "demand" INTEGER,
    CONSTRAINT "LatestPriceHistory_itemID_fkey" FOREIGN KEY ("itemID") REFERENCES "TradeableItems" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RaidWing_name_key" ON "RaidWing"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RaidEvent_name_key" ON "RaidEvent"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Dungeon_name_key" ON "Dungeon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DungeonPath_name_key" ON "DungeonPath"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Worldbosses_name_key" ON "Worldbosses"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DailyCrafting_name_key" ON "DailyCrafting"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Items_id_key" ON "Items"("id");

-- CreateIndex
CREATE INDEX "PriceHistory_itemID_timestamp_idx" ON "PriceHistory"("itemID", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "LatestPriceHistory_itemID_key" ON "LatestPriceHistory"("itemID");
