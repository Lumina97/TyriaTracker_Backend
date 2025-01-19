-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "APIKey" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RaidWing" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RaidWing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RaidEvent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "RaidWingID" INTEGER NOT NULL,

    CONSTRAINT "RaidEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dungeon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Dungeon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DungeonPath" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "DungeonID" INTEGER NOT NULL,

    CONSTRAINT "DungeonPath_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Worldbosses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Worldbosses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyCrafting" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DailyCrafting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Items" (
    "id" INTEGER NOT NULL,
    "name" TEXT,
    "level" INTEGER,
    "rarity" TEXT,
    "vendorValue" INTEGER,
    "icon" TEXT,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradeableItems" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "rarity" TEXT NOT NULL,
    "vendorValue" INTEGER NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "TradeableItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceHistory" (
    "id" SERIAL NOT NULL,
    "itemID" INTEGER NOT NULL,
    "buyPrice" INTEGER NOT NULL,
    "sellPrice" INTEGER NOT NULL,
    "profit" INTEGER,
    "ROI" INTEGER,
    "supply" INTEGER,
    "demand" INTEGER,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PriceHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LatestPriceHistory" (
    "id" SERIAL NOT NULL,
    "itemID" INTEGER NOT NULL,
    "buyPrice" INTEGER NOT NULL,
    "sellPrice" INTEGER NOT NULL,
    "profit" INTEGER,
    "ROI" INTEGER,
    "supply" INTEGER,
    "demand" INTEGER,

    CONSTRAINT "LatestPriceHistory_pkey" PRIMARY KEY ("id")
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

-- AddForeignKey
ALTER TABLE "RaidEvent" ADD CONSTRAINT "RaidEvent_RaidWingID_fkey" FOREIGN KEY ("RaidWingID") REFERENCES "RaidWing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DungeonPath" ADD CONSTRAINT "DungeonPath_DungeonID_fkey" FOREIGN KEY ("DungeonID") REFERENCES "Dungeon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceHistory" ADD CONSTRAINT "PriceHistory_itemID_fkey" FOREIGN KEY ("itemID") REFERENCES "TradeableItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LatestPriceHistory" ADD CONSTRAINT "LatestPriceHistory_itemID_fkey" FOREIGN KEY ("itemID") REFERENCES "TradeableItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
