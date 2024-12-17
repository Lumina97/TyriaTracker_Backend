import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
let allTradableItemIds: number[] = [];

export const getItemPricingDataFromDatabase = async (itemName: string) => {
  if (itemName.length === 0) {
    console.log("given name was empty! returning");
    return null;
  }

  //const item = await prisma.tradeableItems.find
};

export const getTradableItemsFromIDs = async (ids: number[]) => {
  const startTime = performance.now();
  try {
    const items = await prisma.tradeableItems.findMany({
      where: { id: { in: ids } },
      include: {
        LatestPrice: true,
      },
    });
    const endTime = performance.now();
    console.log(
      `GetAllTradableItems took: ${endTime - startTime} milliseconds`
    );
    return items;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getAllTradableItems = async () => {
  const startTime = performance.now();
  try {
    const items = await prisma.tradeableItems.findMany({
      include: {
        LatestPrice: true,
      },
    });

    const endTime = performance.now();
    console.log(
      `GetAllTradableItems took: ${endTime - startTime} milliseconds`
    );
    return items;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTradableItemIdsFromDatabase = async () => {
  try {
    if (allTradableItemIds.length > 0) return allTradableItemIds;
    allTradableItemIds = (
      await prisma.tradeableItems.findMany({
        select: {
          id: true,
          LatestPrice: true,
        },
        orderBy: {
          LatestPrice: {
            profit: "desc",
          },
        },
      })
    ).map((ids) => ids.id);
    return allTradableItemIds;
  } catch (error) {
    console.error(error);
  }
  return [];
};

export const getRangeOfTradableItemIDs = async (start: number, end: number) => {
  try {
    if (allTradableItemIds.length > 0)
      return allTradableItemIds.slice(start, end);
    allTradableItemIds = (
      await prisma.tradeableItems.findMany({
        select: { id: true },
      })
    ).map((ids) => ids.id);
    return allTradableItemIds.slice(start, end);
  } catch (error) {
    console.error(error);
  }
  return [];
};

export const getAllItemIDsFromDatabase = async () => {
  try {
    if (allTradableItemIds.length > 0) return allTradableItemIds;
    return (await prisma.items.findMany()).map((ids) => ids.id);
  } catch (error) {
    console.error(error);
  }
  return [];
};
