import express from "express";
import { Authentication } from "./Routers/Authentication";
import cors from "cors";
import { APIRouter } from "./Routers/API";
import { updateRaidsFromGW2API } from "./utils/GW2API";

const app = express();
const port = 3030;

app.use(cors());
app.use(express.json());
app.use(Authentication);
app.use(APIRouter);

app.listen(port, () => {
  console.log(`Started Tyria Tracker backend on port ${port}`);
});
