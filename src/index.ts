import express from "express";
import cors from "cors";
import { Authentication } from "./Routers/AuthenticationEndpoints";
import { APIRouter } from "./Routers/Gw2Endpoints";
import cron from "node-cron";
import { getPricingDataForAllTradableItems } from "./utils/GW2API";
import {
  cleanRecords1MonthTo3Months as cleanRecords1MonthTo3Months,
  cleanRecords1WeekTo1Month,
  cleanRecords3DaysTo1Week,
  cleanRecordsPast3Months,
  prisma,
} from "./utils/databaseUtils";

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

cron.schedule("0 */12 * * *", async () => {
  const start = performance.now();
  console.log(`Running scheduled Database clean for 3days - 1week!`);
  await cleanRecords3DaysTo1Week();
  const time = performance.now() - start;
  console.log(
    `Finished scheduled Database clean for 3days - 1week! It took: ${time} milliseconds`
  );
});

cron.schedule("10 */12 * * *", async () => {
  const start = performance.now();
  console.log(`Running scheduled Database clean for 1Week  - 1Month!`);
  await cleanRecords1WeekTo1Month();
  const time = performance.now() - start;
  console.log(
    `Finished scheduled Database clean for 1Week  - 1Month! It took: ${time} milliseconds`
  );
});

cron.schedule("20 */12 * * *", async () => {
  const start = performance.now();
  console.log(`Running scheduled Database clean for 1Month  - 3Months!`);
  await cleanRecords1MonthTo3Months();
  const time = performance.now() - start;
  console.log(
    `Finished scheduled Database clean for 1Month  - 3Months It took: ${time} milliseconds`
  );
});

cron.schedule("30 */12 * * *", async () => {
  const start = performance.now();
  console.log(`Running scheduled Database clean past 3Months!`);
  await cleanRecordsPast3Months();
  const time = performance.now() - start;
  console.log(
    `Finished scheduled Database clean past 3Months! It took: ${time} milliseconds`
  );
});

app.listen(port, () => {
  console.log(`Started Tyria Tracker backend on port ${port}`);
});
