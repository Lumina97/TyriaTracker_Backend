import { Router, Request, Response } from "express";
import {
  userPartialSchema,
  createUserSchema,
  validateCreateUser,
  validatePartialUser,
  encryptPassword,
} from "../utils/authUtils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Authentication = Router();

const getUser = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  return user;
};

//Create new user Endpoint
Authentication.post(
  "/auth/users",
  validateCreateUser(createUserSchema),
  async (req: Request, res: Response) => {
    const user = await getUser(req.body.email);
    if (user) {
      console.error("could not create user. Already existed!");
      res.status(400).json({ error: "Could not create user" });
      return;
    }

    const passwordHash = await encryptPassword(req.body.password);
    1;
    prisma.user
      .create({
        data: {
          email: req.body.email,
          passwordHash: passwordHash,
        },
      })
      .then((newUser) => {
        console.log(`Create new user: ${newUser}`);
        res.status(200).json(newUser);
      });
  }
);

//Update User
Authentication.patch(
  "/auth/users/:email",
  validatePartialUser(userPartialSchema),
  async (req, res) => {
    //check for user existance
    if (!(await getUser(req.params.email))) {
      res.status(400).json({ status: false, message: "User does not exist!" });
      return;
    }

    let passwordHash = req.body.password;
    if (passwordHash) passwordHash = await encryptPassword(passwordHash);

    const APIKey = req.body.APIKey;

    //update user with params
    const updated = await prisma.user.update({
      where: {
        email: req.params.email,
      },
      data: {
        APIKey,
        passwordHash,
      },
    });

    console.log(`updated ${updated.email}`);
    res.json({ status: true });
  }
);

//Delete User
Authentication.delete(
  "/auth/users/:email",
  validatePartialUser(userPartialSchema),
  (req: Request, res: Response) => {
    prisma.user
      .delete({
        where: {
          email: req.params.email,
        },
      })
      .then(() => {
        res
          .status(200)
          .json({ message: `Successfully deleted user ${req.params.email}` });
      })
      .catch((error) => {
        console.error(`Error during delete request ${error}`);
        res
          .status(400)
          .json({ message: `Failed to delete user ${req.params.email}` });
      });
  }
);

//Get User
Authentication.get(
  "/auth/users/:email",
  validatePartialUser(userPartialSchema),
  async (req: Request, res: Response) => {
    const user = await getUser(req.params.email);
    if (user) {
      //remove password hash before sending it off.
      const noPasswordUser = (({ passwordHash, ...user }) => user)(user);
      res.status(200).json(noPasswordUser);
    } else {
      res.status(400).json({ error: "User does not exist!" });
    }
  }
);

//logIn User
Authentication.post("/auth/login", (req, res) => {});

//logOut User
Authentication.post("/auth/logout", (req, res) => {});

export { Authentication };
