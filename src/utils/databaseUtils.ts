import { Prisma, PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
let allTradableItemIds: number[] = [];

(async () => {
  try {
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
  } catch (error) {
    console.error(
      "There has been an error getting all available tradable item ID's:",
      error
    );
  }
})();

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
          mode: "insensitive",
        },
      },
      include: {
        LatestPrice: true,
      },
      take: 50,
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

export const cleanRecords3DaysTo1Week = async () => {
  try {
    await prisma.$queryRawUnsafe(`
      DELETE FROM public."PriceHistory"
      WHERE "timestamp" BETWEEN NOW() - interval '1 Week' AND NOW() - interval '3 Days'
      AND NOT (
        EXTRACT(MINUTE FROM "timestamp") BETWEEN 0 AND 2
      );
    `);
  } catch (error) {
    console.error("Error cleaning records between 3 days and 1 week:", error);
  }
};

export const cleanRecords1WeekTo1Month = async () => {
  try {
    await prisma.$queryRawUnsafe(`
      DELETE FROM public."PriceHistory"
      WHERE "timestamp" BETWEEN NOW() - interval '1 Month' AND NOW() - interval '1 Week'
      AND EXTRACT(HOUR FROM "timestamp") % 4 <> 0;
    `);
  } catch (error) {
    console.error("Error cleaning records between 1 week and 1 month:", error);
  }
};

export const cleanRecords1MonthTo3Months = async () => {
  try {
    await prisma.$queryRawUnsafe(`
      DELETE FROM public."PriceHistory"
      WHERE "timestamp" BETWEEN NOW() - interval '3 Months' AND NOW() - interval '1 Month'
      AND NOT (
        DATE_TRUNC('minute', "timestamp")::time = '00:00:00' OR
        DATE_TRUNC('minute', "timestamp")::time = '12:00:00'
      );
    `);
  } catch (error) {
    console.error(
      "Error cleaning records between 1 month and 3 months:",
      error
    );
  }
};

export const cleanRecordsPast3Months = async () => {
  try {
    await prisma.$queryRawUnsafe(`
      DELETE FROM public."PriceHistory"
      WHERE "timestamp" < NOW() - interval '3 Months'	
      AND NOT (
        DATE_TRUNC('minute', "timestamp")::time = '00:00:00'
      );
    `);
  } catch (error) {
    console.error("Error cleaning records past 3 months:", error);
  }
};
