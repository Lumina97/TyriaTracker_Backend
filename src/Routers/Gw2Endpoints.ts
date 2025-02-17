import { NextFunction, Request, Response, Router } from "express";
import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import {
  getUserDailyCrafts,
  getUserDungeons,
  getUserRaids,
  getUserWizardVault,
  getUserWorldBosses,
} from "../utils/GW2API";
import {
  getTradableItemById,
  getTradableItemByName,
  getTradableItemIdsFromDatabase,
  getTradableItemsByPartialName,
  getTradableItemsFromRange,
  getTradableItemsLength,
  prisma,
} from "../utils/databaseUtils";
import HttpStatusCode from "../utils/statusCodes";
import { ValidateJWT } from "../utils/authUtils";

const APIRouter = Router();

const getUserAPIKeyFromEmail = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  return user?.APIKey!;
};

const ValidateUserAndAPIKey = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { email, jwt } = req.body;
    const isAuth = await ValidateJWT(jwt);
    if (isAuth === false || email != isAuth) {
      console.log("user not authorized");
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ status: false, message: "User is not authorized!" });
      return;
    }
    const key = await getUserAPIKeyFromEmail(email);
    if (key === null) {
      console.log("user has no api key");

      res
        .status(HttpStatusCode.OK)
        .json({ status: false, message: "User does not have an API key set!" });
      return;
    }

    req.body.apiKey = key;
    next();
  };
};

//"/api/worldBosses",
APIRouter.post(
  "/api/worldBosses",
  validateRequest({
    body: z.object({
      email: z.string({ required_error: "Email is required!" }),
      jwt: z.string({ required_error: "JWT is required!" }),
    }),
  }),
  ValidateUserAndAPIKey(),
  async (req: Request, res: Response) => {
    const userData = await getUserWorldBosses(req.body.apiKey);
    const worldData = await prisma.worldbosses.findMany();

    if (userData === null || worldData === null) {
      return res.status(HttpStatusCode.NO_CONTENT).json({ status: false });
    }

    return res
      .status(HttpStatusCode.OK)
      .json({ status: true, userData, worldData });
  }
);

//"/api/raids",
APIRouter.post(
  "/api/raids",
  validateRequest({
    body: z.object({
      email: z.string({ required_error: "Email is required!" }),
      jwt: z.string({ required_error: "JWT is required!" }),
    }),
  }),
  ValidateUserAndAPIKey(),
  async (req: Request, res: Response) => {
    const key = req.body.apiKey;
    const userData = await getUserRaids(req.body.apiKey);
    const worldData = await prisma.raidWing.findMany({
      include: { events: true },
    });

    if (userData === null || worldData === null) {
      return res.status(HttpStatusCode.NO_CONTENT).json({ status: false });
    }

    return res
      .status(HttpStatusCode.OK)
      .json({ status: true, userData, worldData });
  }
);

//"/api/dungeons",
APIRouter.post(
  "/api/dungeons",
  validateRequest({
    body: z.object({
      email: z.string({ required_error: "Email is required!" }),
      jwt: z.string({ required_error: "JWT is required!" }),
    }),
  }),
  ValidateUserAndAPIKey(),
  async (req: Request, res: Response) => {
    const worldData = await prisma.dungeon.findMany({
      include: { paths: true },
    });
    const userData = await getUserDungeons(req.body.apiKey);

    if (userData === null || worldData === null) {
      return res.status(HttpStatusCode.NO_CONTENT).json({ status: false });
    }
    return res
      .status(HttpStatusCode.OK)
      .json({ status: true, userData, worldData });
  }
);

//"/api/dailyCrafting",
APIRouter.post(
  "/api/dailyCrafting",
  validateRequest({
    body: z.object({
      email: z.string({ required_error: "Email is required!" }),
      jwt: z.string({ required_error: "JWT is required!" }),
    }),
  }),
  ValidateUserAndAPIKey(),
  async (req: Request, res: Response) => {
    const worldData = await prisma.dailyCrafting.findMany();
    const userData = await getUserDailyCrafts(req.body.apiKey);

    if (userData === null || worldData === null) {
      return res.status(HttpStatusCode.NO_CONTENT).json({ status: false });
    }

    return res
      .status(HttpStatusCode.OK)
      .json({ status: true, userData, worldData });
  }
);

//"/api/wizardVault",
APIRouter.post(
  "/api/wizardVault",
  validateRequest({
    body: z.object({
      email: z.string({ required_error: "Email is required!" }),
      jwt: z.string({ required_error: "JWT is required!" }),
    }),
  }),
  ValidateUserAndAPIKey(),
  async (req: Request, res: Response) => {
    const userData = await getUserWizardVault(req.body.apiKey);
    if (userData === null) {
      return res.status(HttpStatusCode.NO_CONTENT).json({ status: false });
    }

    return res.status(HttpStatusCode.OK).json({ status: true, userData });
  }
);

APIRouter.post(
  "/api/tradingPost/getTradableItemIDs",
  async (req: Request, res: Response) => {
    try {
      const ids = await getTradableItemIdsFromDatabase();
      if (ids === null || ids.length < 0)
        throw new Error("Getting Tradable items ids has failed!");

      return res.status(HttpStatusCode.OK).json({ status: true, data: ids });
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatusCode.NO_CONTENT)
        .json({ status: false, message: "Failed to get all tradable items" });
    }
  }
);

APIRouter.post(
  "/api/tradingPost/getTradableItems",
  validateRequest({
    body: z.object({
      start: z.number({
        required_error: "start index is needed to get items!",
      }),
      amount: z.number({ required_error: "amount is needed to get items!" }),
      orderCriteria: z
        .enum(["sellPrice", "buyPrice", "profit", "ROI", "supply", "demand"])
        .optional(),
      orderDirection: z.enum(["asc", "desc"]).optional(),
    }),
  }),
  async (req: Request, res: Response) => {
    const { start, amount, orderDirection, orderCriteria } = req.body;
    let items = await getTradableItemsFromRange(
      start,
      amount,
      orderCriteria || "demand",
      orderDirection || "desc"
    );
    let amountOfItems = await getTradableItemsLength();

    if (items === null) {
      console.error("Getting all items has failed");
      return res
        .status(HttpStatusCode.NO_CONTENT)
        .json({ status: false, message: "Failed to get all tradable items" });
    }
    return res
      .status(HttpStatusCode.OK)
      .json({ status: true, data: items, itemCount: amountOfItems });
  }
);

APIRouter.post(
  "/api/tradingPost/item",
  validateRequest({
    body: z.object({
      id: z.string({ required_error: "Item ID is required!" }),
    }),
  }),
  async (req: Request, res: Response) => {
    const { id } = req.body;
    let item = await getTradableItemById(parseInt(id));

    if (item === null) {
      console.error("Getting tradable item by ID has failed");
      return res
        .status(HttpStatusCode.NO_CONTENT)
        .json({ status: false, message: "Failed to get tradable item!" });
    }

    return res.status(HttpStatusCode.OK).json({ status: true, data: item });
  }
);

APIRouter.post(
  "/api/tradingPost/getItemNames",
  validateRequest({
    body: z.object({
      name: z.string({ required_error: "partial name is required!" }),
    }),
  }),
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const items = await getTradableItemsByPartialName(name);
    if (items.length === 0) {
      return res
        .status(HttpStatusCode.NO_CONTENT)
        .json({ status: false, message: "No items found!" });
    }
    return res.status(HttpStatusCode.OK).json({ status: true, data: items });
  }
);

APIRouter.post(
  "/api/tradingPost/getItemByName",
  validateRequest({
    body: z.object({
      name: z.string({ required_error: "Name is required!" }),
    }),
  }),
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const item = await getTradableItemByName(name);
    if (!item) {
      return res
        .status(HttpStatusCode.NO_CONTENT)
        .json({ status: false, message: "No items found!" });
    }
    return res.status(HttpStatusCode.OK).json({ status: true, data: item });
  }
);

export { APIRouter };
