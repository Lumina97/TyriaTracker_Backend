import { Prisma, PrismaClient } from "@prisma/client";

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

export const getTradableItemsFromRange = async (
  start: number,
  amount: number,
  orderField: string,
  orderDirection: Prisma.SortOrder
) => {
  const startTime = performance.now();
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

    const endTime = performance.now();
    console.log(
      `getTradableItemsFromRange took: ${endTime - startTime} milliseconds`
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

export const cleanOldRecords = async () => {
  console.log("Starting cleaning");
  await prisma.$queryRawUnsafe(`
   DELETE FROM public."PriceHistory"
	WHERE "timestamp" < NOW() - interval '1 Day'	
	AND NOT (
		  DATE_TRUNC('minute', "timestamp")::time = '00:00:00' OR
      DATE_TRUNC('minute', "timestamp")::time = '12:00:00'
	)
  `);
  console.log("Ended cleaning");
};
