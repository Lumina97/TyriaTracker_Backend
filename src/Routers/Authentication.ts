import { Router, Request, Response, NextFunction } from "express";
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
import { PrismaClient } from "@prisma/client";
import { validateRequest } from "zod-express-middleware";
import { z } from "zod";
import { SendEmail } from "../utils/emailUtils";

type TUser = {
  email?: string;
  passwordHash?: string;
  APIKey?: string;
  jwt?: string;
};

const prisma = new PrismaClient();
const Authentication = Router();
let passwordResetRequests: Record<string, number> = {};

const getUser = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  return user;
};

const checkIfUserIsAuthorized = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body.newUser;
    const jwt = newUser ? newUser.jwt : req.body.jwt;
    const { email } = req.params;

    const isAuth = await isUserAuthorized(email, jwt);
    if (isAuth === false) {
      console.log(`is not authorized`);
      res
        .status(403)
        .json({ status: false, message: "User is not authorized!" });
      return;
    }
    next();
  };
};

//Create new user
Authentication.post(
  "/auth/users",
  validateCreateUser(createUserSchema),
  async (req: Request, res: Response) => {
    const { email, password, APIKey } = req.body;
    console.log(`Account create request with email: ${email}`);
    const user = await getUser(email);
    if (user) {
      console.error("could not create user. Already existed!");
      res
        .status(409)
        .json({ status: false, message: "Email is already in use!" });
      return;
    }

    let hadCreationError = false;
    const passwordHash = await encryptPassword(password);

    await prisma.user
      .create({
        data: {
          email,
          passwordHash,
          APIKey,
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
  checkIfUserIsAuthorized(),
  async (req, res) => {
    const { email } = req.params;
    const { newUser } = req.body;

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
  checkIfUserIsAuthorized(),
  async (req: Request, res: Response) => {
    const { email } = req.body;
    prisma.user
      .delete({
        where: {
          email: email,
        },
      })
      .then(() => {
        res.status(200).json({ message: `Successfully deleted user ${email}` });
      })
      .catch((error) => {
        console.error(`Error during delete request ${error}`);
        res.status(400).json({ message: `Failed to delete user ${email}` });
      });
  }
);

//Get User
Authentication.get(
  "/auth/users/:email",
  validatePartialUser(userPartialSchema),
  checkIfUserIsAuthorized(),
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
    console.log(`login request from email: ${req.body.email}`);
    const { email, password } = req.body;

    try {
      const user = await getUser(email);
      if (!user) {
        console.log("Unable to log in - no user found");
        res.status(401).json({ status: false, message: "Could not log in!" });
        return;
      }

      validatePassword(password, user.passwordHash).then((result) => {
        if (result === false) {
          console.log(`password compare failed`);
          res.status(401).json({ status: false, message: "Could not log in!" });
          return;
        }

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
      console.log(error);
      res.status(401).json({ status: false, message: "Could not log in!" });
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
  "/auth/passwordReset/initialize",
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
      const code = Math.floor(100000 + Math.random() * 900000);
      console.log(
        `found user with email: ${email}, sending reset code: ${code}`
      );

      if (!(email in passwordResetRequests)) {
        passwordResetRequests[email] = code;
        SendEmail(email, code.toString());
      }
    }
    res.status(200).json({
      status: true,
      message: "If user exists you will receive a email with a pass code.",
    });
  }
);

Authentication.post(
  "/auth/passwordReset/confirm",
  validateRequest({
    body: z.object({
      email: z.string({
        required_error: "Email is required to reset password",
      }),
      resetCode: z.string({
        required_error: "resetCode is required to reset password",
      }),
      newPassword: z.string({
        required_error: "newPassword is required to reset password",
      }),
    }),
  }),
  async (req: Request, res: Response) => {
    const { email, resetCode, newPassword } = req.body;
    const code = parseInt(resetCode);
    console.log("code:");
    console.log(code);
    console.log("isInDict:");
    console.log(email in passwordResetRequests);

    if (
      // email never made a request or given reset code was incorrect
      !(email in passwordResetRequests) ||
      !code ||
      passwordResetRequests[email] != code
    ) {
      console.log(`email : ${email} or code ${resetCode} were not correct`);
      res.status(400).json({
        status: false,
        message: "Failed to reset password!",
      });
      return;
    }

    console.log("Setting new password");
    //check if password changed and create a new hash if so
    let passwordHash = await encryptPassword(newPassword);

    //create a new user object with only data that changed
    const data: TUser = {};
    data.passwordHash = passwordHash;
    data.email = email;

    try {
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          ...data,
        },
      });
      delete passwordResetRequests[email];
      res.json({ status: true, message: "Successfully reset password!" });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ status: false, message: "Failed to reset password!" });
    }
  }
);

export { Authentication };
