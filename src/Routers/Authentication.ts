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
  ValidateJWT,
} from "../utils/authUtils";
import { PrismaClient, User } from "@prisma/client";
import { validateRequest } from "zod-express-middleware";
import { z } from "zod";

type TUser = {
  email?: string;
  passwordHash?: string;
  APIKey?: string;
  jwt?: string;
};

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

//Create new user
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
    const newUser = {
      email,
      jwt,
      apiKeys: [],
    };
    res.status(200).json({ status: true, message: "User Created!", newUser });
  }
);

//Update User
Authentication.patch(
  "/auth/users/:email",
  validateRequest({
    body: z.object({
      newUser: z.object({
        jwt: z.string({
          required_error: "JWT is required when updating user information",
        }),
        email: z.string().optional(),
        password: z.string().optional(),
        APIKey: z.string().optional(),
      }),
    }),
  }),
  async (req, res) => {
    const { email } = req.params;
    const { newUser } = req.body;

    console.log(`updating user: ${email} ,\n ${newUser.jwt}`);
    //check for user existance and if user is authorized to edit requested file
    const isAuth = await isUserAuthorized(email, newUser.jwt);
    if (isAuth === false) {
      console.log(`is not authorized`);
      res
        .status(400)
        .json({ status: false, message: "User is not autorized!" });
      return;
    }

    //check if password changed and create a new hash if so
    let passwordHash = "";
    if (newUser.password)
      passwordHash = await encryptPassword(newUser.password);

    //check if email changed and create new jwt token if so
    if (newUser.email && newUser.email != email) {
      const newJwt = CreateJWTFromEmail(newUser.email);
      if (newJwt) {
        newUser.jwt = newJwt;
      }
    }

    //create a new user object with only data that changed
    const data: TUser = {};
    if (newUser.APIKey) data.APIKey = newUser.APIKey;
    if (passwordHash) data.passwordHash = passwordHash;
    if (newUser.email) data.email = newUser.email;

    console.log(JSON.stringify(data));

    try {
      //update user with params
      const updated = await prisma.user.update({
        where: {
          email: req.params.email,
        },
        data: {
          ...(({ jwt, ...data }) => data)(data),
        },
      });
      //@ts-ignore
      updated.jwt = newUser.jwt;

      console.log(`updated ${updated.email}`);
      console.log(`new user: ${JSON.stringify(updated)}`);
      const noPasswordUser = (({ passwordHash, ...user }) => user)(updated);
      res.json({ status: true, updatedUser: noPasswordUser });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ status: false, message: "There was an issue updating User" });
    }
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
        const newUser = {
          email: user.email,
          jwt: token,
          APIKey: user.APIKey,
        };
        res
          .status(200)
          .json({ status: true, message: "You have logged in!", newUser });
      });
    } catch (error) {
      res.status(400).json({ status: false, message: "Could not log in!" });
    }
  }
);

//logOut User
Authentication.post("/auth/logout", (req, res) => {});

//check if loggedIn
Authentication.post(
  "/auth/isLoggedIn",
  validateRequest({
    body: z.object({
      jwt: z.string({ required_error: "jwt is required to check login state" }),
    }),
  }),
  async (req: Request, res: Response) => {
    console.log("logged in status request");
    const { jwt } = req.body;
    const verify = ValidateJWT(jwt);
    if (typeof verify === "string" || verify === false)
      res.status(400).json({ status: false, message: "user is not logged in" });
    else {
      const user = await getUser(verify.email);
      res
        .status(200)
        .json({ status: true, message: "user is logged in", user });
    }
  }
);

//password reset
Authentication.post(
  "/auth/passwordReset",
  validateRequest({
    body: z.object({
      email: z.string({
        required_error: "Email is required to reset password",
      }),
    }),
  }),
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await getUser(email);
    if (user) {
      console.log(`Send email to reset password to: ${email} `);
    }
    res.status(200).json({
      status: true,
      message:
        "If user exists you will receive a email with a password reset link",
    });
  }
);

export { Authentication };
