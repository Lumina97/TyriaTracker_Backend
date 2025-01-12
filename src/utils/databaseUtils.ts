import { Prisma, PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

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
    console.error("given name was empty! returning");
    return null;
  }
};

export const getTradableItemsFromRange = async (
  start: number,
  amount: number,
  orderField: string,
  orderDirection: Prisma.SortOrder
) => {
  try {
    if (orderField === "") orderField = "demand";

    const items = await prisma.tradeableItems.findMany({
      include: {
        LatestPrice: true,
      },
      orderBy: {
        LatestPrice: {
          [orderField]: orderDirection,
        },
      },
      skip: start,
      take: amount,
    });

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

export const getTradableItemById = async (id: number) => {
  return await prisma.tradeableItems.findUnique({
    where: {
      id: id,
    },
    include: {
      PriceHistory: true,
      LatestPrice: true,
    },
  });
};

export const getTradableItemsByPartialName = async (partialName: string) => {
  try {
    return await prisma.tradeableItems.findMany({
      where: {
        name: {
          contains: partialName,
          //postgreSQL only
          //  mode: "insensitive",
        },
      },
      include: {
        LatestPrice: true,
      },
      take: 5,
    });
  } catch (error) {
    console.error(error);
  }
  return [];
};

export const getTradableItemByName = async (name: string) => {
  try {
    return await prisma.tradeableItems.findFirst({
      where: {
        name: {
          equals: name,
        },
      },
      include: {
        PriceHistory: true,
        LatestPrice: true,
      },
    });
  } catch (error) {
    console.error(error);
  }
  return [];
};

export const cleanOldRecords = async () => {
  //trim anything after 3 months and only keep 12am time
  await prisma.$queryRawUnsafe(`
      DELETE FROM public."PriceHistory"
	    WHERE "timestamp" < NOW() - interval '3 Months'	
	    AND NOT (
		    DATE_TRUNC('minute', "timestamp")::time = '00:00:00'
	    )`);

  //trim anything from 1 - 3months and only keep 12 am and 12 pm
  await prisma.$queryRawUnsafe(`
    DELETE FROM public."PriceHistory"
    WHERE "timestamp" BETWEEN NOW() - interval '3 Months' AND NOW() - interval '1 Month'
    AND NOT (
      DATE_TRUNC('minute', "timestamp")::time = '00:00:00' OR
      DATE_TRUNC('minute', "timestamp")::time = '12:00:00'
    )`);

  //trim anything from 1 week to 1 month and keep entries from every 4 hours
  await prisma.$queryRawUnsafe(`
      DELETE FROM public."PriceHistory"
      WHERE "timestamp" BETWEEN NOW() - interval '1 Month' AND NOW() - interval '1 Week'
      AND NOT (
        DATE_TRUNC('minute', "timestamp")::time = '00:00:00' OR
        DATE_TRUNC('minute', "timestamp")::time = '12:00:00' OR
        DATE_TRUNC('minute', "timestamp")::time = '04:00:00' OR
        DATE_TRUNC('minute', "timestamp")::time = '08:00:00'
      )`);

  //trim anything from 3 days to 1 week and keep entries from every 4 hours
  await prisma.$queryRawUnsafe(`
      DELETE FROM public."PriceHistory"
      WHERE "timestamp" BETWEEN NOW() - interval '1 Week' AND NOW() - interval '3 Days'
      AND NOT (
        EXTRACT(MINUTE FROM "timestamp") = 0
      )`);
};
