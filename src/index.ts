import express from "express";
import cors from "cors";
import { Authentication } from "./Routers/AuthenticationEndpoints";
import { APIRouter } from "./Routers/Gw2Endpoints";
import cron from "node-cron";
import { getPricingDataForAllTradableItems } from "./utils/GW2API";
import { cleanOldRecords } from "./utils/databaseUtils";

const app = express();
const port = 3030;

app.use(cors());
app.use(express.json());
app.use(Authentication);
app.use(APIRouter);

cron.schedule("*/5 * * * *", async () => {
  const start = performance.now();
  console.log(
    `Running scheduled API updates! at time: ${new Date().toISOString()}`
  );
  await getPricingDataForAllTradableItems();
  const time = performance.now() - start;
  console.log(`Finished scheduled API updates! It took: ${time} milliseconds`);
});

cron.schedule("0 0 0 * * *", async () => {
  const start = performance.now();
  console.log(`Running scheduled Database clean!`);
  await cleanOldRecords();
  const time = performance.now() - start;
  console.log(
    `Finished scheduled Database clean! It took: ${time} milliseconds`
  );
});

app.listen(port, () => {
  console.log(`Started Tyria Tracker backend on port ${port}`);
});
