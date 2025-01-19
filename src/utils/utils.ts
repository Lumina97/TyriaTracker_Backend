import { prisma } from "./databaseUtils";
import {
  updateDailyCraftingFromGW2API,
  updateDungeonsFromGW2API,
  updateRaidsFromGW2API,
  updateAllTradableItems,
  updateWorldBossesFromGW2API,
} from "./GW2API";

export const InitializeDatabase = async () => {
  try {
    console.log("Creating Dungeon Table...\n");
    await updateDungeonsFromGW2API();

    console.log("Creating Raids Table...\n");
    await updateRaidsFromGW2API();

    console.log("Creating Daily Crafting Table...\n");
    await updateDailyCraftingFromGW2API();

    console.log("Creating WorldBoss Table...\n");
    await updateWorldBossesFromGW2API();

    console.log("Creating Tradable Items Table...");
    console.log("This will take a while\n");
    await updateAllTradableItems();

    console.log("Creating test user");
    await prisma.user.create({
      data: {
        email: "test@test.com",
        APIKey:
          "F6F45603-9571-5A4E-B869-E24EB0062554753AD94F-A9A2-4B26-A776-8BF277F161F2",
        passwordHash:
          "$2b$11$CBN0DRnSagc5x631ihpQu.P9cK2QPJ14LhH7P.DfzmXwJ1gKi8tDm",
      },
    });

    console.log("finished");
  } catch (e) {
    console.error(`There was an error initializing database: ${e}`);
  }
};

InitializeDatabase();
