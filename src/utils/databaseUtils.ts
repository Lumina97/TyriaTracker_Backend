import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
let allTradableItemIds: number[] = [];
async function initialize() {
  allTradableItemIds = (
    await prisma.tradeableItems.findMany({
      select: {
        id: true,
      },
      orderBy: {
        LatestPrice: {
          demand: "desc",
        },
      },
    })
  ).map((ids) => ids.id);
}
initialize();

export const getItemPricingDataFromDatabase = async (itemName: string) => {
  if (itemName.length === 0) {
    console.log("given name was empty! returning");
    return null;
  }
};

export const getTradableItemsFromIDs = async (ids: number[]) => {
  const startTime = performance.now();
  try {
    const items = await prisma.tradeableItems.findMany({
      where: { id: { in: ids } },
      include: {
        LatestPrice: true,
      },
      orderBy: {
        LatestPrice: {
          demand: "desc",
        },
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

export const getTradableItemsFromRange = async (
  start: number,
  amount: number
) => {
  const startTime = performance.now();
  try {
    const items = await prisma.tradeableItems.findMany({
      include: {
        LatestPrice: true,
      },
      orderBy: {
        LatestPrice: {
          demand: "desc",
        },
      },
      skip: start,
      take: amount,
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
    return (
      await prisma.tradeableItems.findMany({
        select: {
          id: true,
        },
        orderBy: {
          LatestPrice: {
            demand: "desc",
          },
        },
      })
    ).map((ids) => ids.id);
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

export const getTradableItemsLength = async () => {
  if (!allTradableItemIds)
    allTradableItemIds = (
      await prisma.tradeableItems.findMany({
        select: { id: true },
      })
    ).map((ids) => ids.id);

  return allTradableItemIds.length;
};
