import { NextFunction, Request, Response, Router } from "express";
import { z, ZodArray } from "zod";
import { validateRequest } from "zod-express-middleware";
import { PrismaClient } from "@prisma/client";
import {
  getUserDailyCrafts,
  getUserDungeons,
  getUserRaids,
  getUserWizardVault,
  getUserWorldBosses,
} from "../utils/GW2API";
import { isUserAuthorized } from "../utils/authUtils";
import {
  getAllTradableItems,
  getTradableItemIdsFromDatabase,
  getTradableItemsFromIDs,
} from "../utils/databaseUtils";
import { error } from "console";

const APIRouter = Router();
const prisma = new PrismaClient();

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
    const isAuth = await isUserAuthorized(email, jwt);
    if (isAuth === false) {
      res
        .status(400)
        .json({ status: false, message: "User is not autorized!" });
      return;
    }
    const key = await getUserAPIKeyFromEmail(email);
    if (key === null) {
      res
        .status(400)
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

    res.status(200).json({ status: true, userData, worldData });
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
    console.log(
      `request from email: ${req.body.email} with key:\n${req.body.apiKey} `
    );
    const userData = await getUserRaids(req.body.apiKey);
    const worldData = await prisma.raidWing.findMany({
      include: { events: true },
    });

    res.status(200).json({ status: true, userData, worldData });
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

    res.status(200).json({ status: true, userData, worldData });
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

    res.status(200).json({ status: true, userData, worldData });
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

    res.status(200).json({ status: true, userData });
  }
);

APIRouter.post(
  "/api/tradingPost/getTradableItemIDs",
  async (req: Request, res: Response) => {
    try {
      const ids = await getTradableItemIdsFromDatabase();
      if (ids === null || ids.length < 0)
        throw new Error("Getting Tradable items ids has failed!");

      res.status(200).json({ status: true, data: ids });
      return;
    } catch (error) {
      console.error(error);
      res
        .status(503)
        .json({ status: false, message: "Failed to get all tradable items" });
      return;
    }
  }
);

APIRouter.post(
  "/api/tradingPost/getTradableItems",
  validateRequest({
    body: z.object({
      ids: z.array(z.number()).optional(),
    }),
  }),
  async (req: Request, res: Response) => {
    console.log("Getting all tradable items");
    const { ids } = req.body;
    let items = null;

    if (ids) {
      console.log(`Getting items with id's`);
      items = await getTradableItemsFromIDs(ids);
    } else items = await getAllTradableItems();

    if (items === null) {
      console.log("Getting all items has failed");
      res
        .status(503)
        .json({ status: false, message: "Failed to get all tradable items" });
      return;
    }

    console.log("returning result");
    res.status(200).json({ status: true, data: items });
  }
);

export { APIRouter };
