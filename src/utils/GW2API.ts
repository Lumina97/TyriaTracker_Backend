import { PrismaClient } from "@prisma/client";
import { GW2Api, ApiLanguage, ApiParams } from "guildwars2-ts";
import fs from "fs";
import {
  getAllItemIDsFromDatabase,
  getTradableItemIdsFromDatabase,
} from "./databaseUtils";

const listingFeePercentage = 0.05;
const exchangeFreePercentage = 0.1;

const prisma = new PrismaClient();
const api: GW2Api = new GW2Api({
  token:
    "3EA9CEC1-5DD9-004A-9801-FD43E868DFF393853EE8-CB9E-4D84-9C5F-1B6422E090C1",
  language: ApiLanguage.English,
  rateLimitRetry: true,
  // logOutput: false,
});

export const updateDungeonsFromGW2API = async () => {
  await api.dungeons.get("all").then((dungeons) => {
    dungeons.map(async (dungeon) => {
      const exists = await prisma.dailyCrafting.findFirst({
        where: {
          name: dungeon.id,
        },
      });
      if (!exists) {
        try {
          console.log(dungeon);
          const newDungeon = await prisma.dungeon.create({
            data: {
              name: dungeon.id,
              paths: {
                create: dungeon.paths.map((path) => ({
                  name: path.id,
                  type: path.type,
                })),
              },
            },
          });
          console.log("Dungeon created:", newDungeon);
        } catch (error) {
          console.error("Error creating dungeon:", error);
        }
      } else console.log("Dungeon already saved!");
    });
  });
};

export const updateRaidsFromGW2API = async () => {
  await api.raids.get("all").then((raids) => {
    raids.map((raid) => {
      raid.wings.map(async (wing) => {
        const exists = await prisma.raidWing.findFirst({
          where: {
            name: wing.id,
          },
        });

        if (!exists) {
          try {
            const newRaid = await prisma.raidWing.create({
              data: {
                name: wing.id,
                events: {
                  create: wing.events.map((event) => ({
                    name: event.id,
                    type: event.type,
                  })),
                },
              },
            });
            console.log("Raid created:", newRaid);
          } catch (error) {
            console.error("Error creating Raid:", error);
          }
        } else console.log("Raid already saved!");
      });
    });
  });
};

export const updateDailyCraftingFromGW2API = async () => {
  await api.dailyCrafting.get().then((crafts) => {
    crafts.map(async (craft) => {
      const exists = await prisma.dailyCrafting.findFirst({
        where: {
          name: craft,
        },
      });

      if (!exists) {
        try {
          const newCraft = await prisma.dailyCrafting.create({
            data: {
              name: craft,
            },
          });
          console.log("Daily Craft created:", newCraft);
        } catch (error) {
          console.error("Error creating Daily Craft:", error);
        }
      } else console.log("Daily Craft already saved!");
    });
  });
};

export const updateWorldBossesFromGW2API = async () => {
  await api.worldBosses.get().then((bosses) => {
    bosses.map(async (boss) => {
      const exists = await prisma.dailyCrafting.findFirst({
        where: {
          name: boss,
        },
      });
      if (!exists) {
        try {
          const newCraft = await prisma.worldbosses.create({
            data: {
              name: boss,
            },
          });
          console.log("WorldBoss created:", newCraft);
        } catch (error) {
          console.error("Error creating WorldBoss:", error);
        }
      } else console.log("WorldBoss already saved!");
    });
  });
};

export const updateItemIDSFromGW2Api = async () => {
  try {
    const gw2Ids = await api.items.get();
    const localIds = (
      await prisma.items.findMany({ select: { id: true } })
    ).map((item) => item.id);
    const newIds = gw2Ids
      .filter((id) => !localIds.includes(id))
      .map((id) => ({ id }));
    if (newIds.length === 0) {
      console.log("No new id's to add to database!");
      return;
    }
    console.log(`new ids: ${newIds.map((id) => console.log(id))}`);
    await prisma.items.createMany({
      data: newIds,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateTradableItemsFromFile = async () => {
  try {
    const data = fs.readFileSync("ids.txt", "utf8");
    const ids: number[] = JSON.parse(data);
    const localIds = (
      await prisma.tradeableItems.findMany({
        select: { id: true },
      })
    ).map((item) => item.id);

    const newIDS = ids.filter((id) => !localIds.includes(id));
    if (newIDS.length === 0) {
      console.log("No new items found!");
      return;
    }

    const batchSize = newIDS.length % 4;
    const batches = [];
    for (let i = 0; i < ids.length; i += batchSize) {
      batches.push(ids.slice(i, i + batchSize));
    }

    for (let i = 0; i < batches.length; i++) {
      const data = await api.items.get(batches[i]);
      const filtered = data.map(
        ({ id, name, level, rarity, vendor_value, icon }) => ({
          id,
          name,
          level,
          rarity,
          vendorValue: vendor_value,
          icon,
        })
      );
      //@ts-ignore
      await prisma.tradeableItems.createMany({ data: filtered });
    }
  } catch (err) {
    console.error(err);
  }
};

const calculateProfit = (buyPrice: number, sellPrice: number) => {
  const sell =
    sellPrice -
    sellPrice * listingFeePercentage -
    sellPrice * exchangeFreePercentage;
  const buy = buyPrice;
  const profit = sell - buy;
  return profit;
};

export const getPricingDataForAllTradableItems = async () => {
  try {
    const allTradableItemIds = await getTradableItemIdsFromDatabase();
    const batchSize = 200;
    const batches = [];
    for (let i = 0; i < allTradableItemIds.length; i += batchSize) {
      batches.push(allTradableItemIds.slice(i, i + batchSize));
    }

    let newLatestPrices = [];
    for (let i = 0; i < batches.length; i++) {
      const prices = (await api.commerce.getPrices(batches[i])).map(
        ({
          id,
          buys: { quantity: demand },
          sells: { quantity: supply },
          buys: { unit_price: buyPrice },
          sells: { unit_price: sellPrice },
        }) => ({
          itemID: id,
          buyPrice,
          sellPrice,
          supply,
          demand,
          profit: calculateProfit(buyPrice, sellPrice),
          ROI: (calculateProfit(buyPrice, sellPrice) / buyPrice) * 100,
        })
      );

      newLatestPrices.push(prices);

      await prisma.priceHistory.createMany({ data: prices });
    }
    await prisma.latestPriceHistory.deleteMany();
    newLatestPrices = newLatestPrices.flat(1);
    await prisma.latestPriceHistory.createMany({ data: newLatestPrices });
  } catch (error) {
    console.error(error);
  }
};

export const updateAllItemsFromIDs = async () => {
  try {
    const itemIds = await getAllItemIDsFromDatabase();
    const batchSize = 200;
    const batches = [];
    for (let i = 0; i < itemIds.length; i += batchSize) {
      batches.push(itemIds.slice(i, i + batchSize));
    }
    await prisma.items.deleteMany();
    for (let i = 0; i < batches.length; i++) {
      const prices = (await api.items.get(batches[i])).map(
        ({ id, name, icon, rarity, vendor_value }) => ({
          id,
          rarity,
          vendorValue: vendor_value,
          name,
          icon,
        })
      );
      await prisma.items.createMany({ data: prices });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getUserDailyCrafts = async (apiKey: string) => {
  const userAPI = new GW2Api({
    token: apiKey,
    language: ApiLanguage.English,
    rateLimitRetry: true,
  });

  try {
    return await userAPI.account.getDailyCrafts();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserWorldBosses = async (apiKey: string) => {
  const userAPI = new GW2Api({
    token: apiKey,
    language: ApiLanguage.English,
    rateLimitRetry: true,
  });
  try {
    return await userAPI.account.getWorldBosses();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserRaids = async (apiKey: string) => {
  const userAPI = new GW2Api({
    token: apiKey,
    language: ApiLanguage.English,
    rateLimitRetry: true,
  });

  try {
    return await userAPI.account.getRaids();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserWizardVault = async (apiKey: string) => {
  const userAPI = new GW2Api({
    token: apiKey,
    language: ApiLanguage.English,
    rateLimitRetry: true,
  });

  try {
    const daily = await userAPI.account.getWizardsVaultDaily();
    const weekly = await userAPI.account.getWizardsVaultWeekly();
    const special = await userAPI.account.getWizardsVaultSpecial();
    const vault = {
      daily,
      weekly,
      special,
    };
    return vault;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserDungeons = async (apiKey: string) => {
  const userAPI = new GW2Api({
    token: apiKey,
    language: ApiLanguage.English,
    rateLimitRetry: true,
  });

  try {
    return await userAPI.account.getDungeons();
  } catch (error) {
    console.log(error);
    return null;
  }
};
