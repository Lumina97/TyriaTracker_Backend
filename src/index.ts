import express from "express";
import { Authentication } from "./Routers/Authentication";
import { ValidateJWT } from "./utils/authUtils";

const app = express();
const port = 3030;

app.use(express.json());
app.use(Authentication);

app.listen(port, () => {
  console.log(`Started Tyria Tracker backend on port ${port}`);
});
