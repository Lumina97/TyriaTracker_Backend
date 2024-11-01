import { Router, Request, Response } from "express";
import {
  userPartialSchema,
  createUserSchema,
  validateCreateUser,
  validatePartialUser,
  encryptPassword,
  CreateJWTFromEmail,
  validatePassword,
  isUserAuthorized,
} from "../utils/authUtils";
import { PrismaClient } from "@prisma/client";
import { validateRequest } from "zod-express-middleware";
import { z } from "zod";

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
    const email = req.body.email;
    const user = await getUser(email);
    if (user) {
      console.error("could not create user. Already existed!");
      res.status(400).json({ error: "Could not create user" });
      return;
    }

    let hadCreationError = false;
    const passwordHash = await encryptPassword(req.body.password);

    await prisma.user
      .create({
        data: {
          email: email,
          passwordHash: passwordHash,
        },
      })
      .catch((error) => {
        console.error(`Failed to create new user! ${error}`);
        hadCreationError = true;
      });

    //create JWT token for new account creations
    //so user does not have to sign in right after
    const jwt = CreateJWTFromEmail(email);
    if (jwt === false) hadCreationError = true;

    if (hadCreationError) {
      res.status(400).json({
        status: false,
        message: "There was an error creating user!",
      });
      return;
    }

    console.log(`Created user ${email}`);
    res.status(200).json({ status: true, message: "User Created!", jwt: jwt });
  }
);

//Update User
Authentication.patch(
  "/auth/users/:email",
  validatePartialUser(userPartialSchema),
  async (req, res) => {
    const { email } = req.params;
    const { jwt, password, APIKey } = req.body;

    console.log(`user: ${email} , ${jwt}`);
    //check for user existance and if user is authorized to edit requested file
    const isAuth = await isUserAuthorized(email, jwt);
    if (isAuth === false) {
      res
        .status(400)
        .json({ status: false, message: "User is not autorized!" });
      return;
    }

    let passwordHash = "";
    if (password) passwordHash = await encryptPassword(passwordHash);

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
  async (req: Request, res: Response) => {
    const { email, jwt } = req.body;

    //check for user existance and if user is authorized to edit requested file
    const isAuth = await isUserAuthorized(email, jwt);
    if (isAuth === false) {
      res
        .status(400)
        .json({ status: false, message: "User is not autorized!" });
      return;
    }

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
Authentication.post(
  "/auth/login",
  validateRequest({
    body: z
      .object({
        email: z.string({ required_error: "Email is required in body!" }),
        password: z.string({ required_error: "Password is required in body!" }),
      })
      .strict(),
  }),
  async (req: Request, res: Response) => {
    console.log("login request");
    const { email, password } = req.body;

    try {
      const user = await getUser(email);
      if (!user) {
        res.status(400).json({ status: false, message: "Could not log in!" });
        return;
      }

      validatePassword(password, user.passwordHash).then(() => {
        const token = CreateJWTFromEmail(email);
        res
          .status(200)
          .json({ status: true, message: "You have logged in!", jwt: token });
      });
    } catch (error) {
      res.status(400).json({ status: false, message: "Could not log in!" });
    }
  }
);

//logOut User
Authentication.post("/auth/logout", (req, res) => {});

export { Authentication };
