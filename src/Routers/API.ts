import { Request, Response, Router } from "express";
import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import { PrismaClient } from "@prisma/client";
import { getUserWorldBosses } from "../utils/GW2API";
import { isUserAuthorized } from "../utils/authUtils";

const APIRouter = Router();
const prisma = new PrismaClient();

APIRouter.post(
  "/api/worldBosses",
  validateRequest({
    body: z.object({
      email: z.string({ required_error: "Email is required!" }),
      jwt: z.string({ required_error: "JWT is required!" }),
    }),
  }),
  async (req: Request, res: Response) => {
    const { email, jwt } = req.body;
    //is authorized
    //check for user existance and if user is authorized to edit requested file
    const isAuth = await isUserAuthorized(email, jwt);
    if (isAuth === false) {
      res
        .status(400)
        .json({ status: false, message: "User is not autorized!" });
      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    console.log(user);
    const key = user?.APIKey!;
    if (key === null) {
      res
        .status(400)
        .json({ status: false, message: "User does not have an API key set!" });
      return;
    }

    const userData = await getUserWorldBosses(key);
    const worldData = await prisma.worldbosses.findMany();
    console.log(`Found user data: ${userData} and world data: ${worldData}`);

    res.status(200).json({ status: true, userData, worldData });
  }
);

APIRouter.post("/api/raids", (req, res) => {});

APIRouter.post("/api/dungeons", (req, res) => {});

APIRouter.post("/api/dailyCrafting", (req, res) => {});

APIRouter.post("/api/wizardVault", (req, res) => {});

export { APIRouter };
