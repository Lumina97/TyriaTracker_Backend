/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `DailyCrafting` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `RaidEvent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `RaidWing` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Worldbosses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DailyCrafting_name_key" ON "DailyCrafting"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RaidEvent_name_key" ON "RaidEvent"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RaidWing_name_key" ON "RaidWing"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Worldbosses_name_key" ON "Worldbosses"("name");
