//@ts-ignore
import express from "express";
import { Authentication } from "./Routers/Authentication";
//@ts-ignore
import cors from "cors";
import { APIRouter } from "./Routers/API";
import cron from "node-cron";
import { getPricingDataForAllTradableItems } from "./utils/GW2API";

const app = express();
const port = 3030;

app.use(cors());
app.use(express.json());
app.use(Authentication);
app.use(APIRouter);

cron.schedule("*/3 * * * *", async () => {
  console.log("Running scheduled API updates!");
  await getPricingDataForAllTradableItems();
});

app.listen(port, () => {
  console.log(`Started Tyria Tracker backend on port ${port}`);
});
