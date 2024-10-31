import { Router, Request, Response } from "express";
import {
  userPartialSchema,
  createUserSchema,
  validateCreateUser,
  validatePartialUser,
} from "./ZodHelper";

const Authentication = Router();

//Create new user Endpoint
Authentication.post(
  "/auth/users",
  validateCreateUser(createUserSchema),
  (req: Request, res: Response) => {
    res.json({ ...req.body });
  }
);

//Update User
Authentication.patch(
  "/auth/users/:email",
  validatePartialUser(userPartialSchema),
  (req, res) => {
    console.log("Got patch request");
    res.json({ ...req.body });
  }
);

//Delete User
Authentication.delete(
  "/auth/users/:email",
  validatePartialUser(userPartialSchema),
  (req: Request, res: Response) => {
    console.log("Got delete request");
    res.json({ ...req.body });
  }
);

//Get User
Authentication.get(
  "/auth/users/:email",
  validatePartialUser(userPartialSchema),
  (req: Request, res: Response) => {}
);

//logIn User
Authentication.post("/auth/login", (req, res) => {});

//logOut User
Authentication.post("/auth/logout", (req, res) => {});

export { Authentication };
