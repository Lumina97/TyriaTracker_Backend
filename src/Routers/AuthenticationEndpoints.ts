import { Router, Request, Response, NextFunction } from "express";
import {
  userPartialSchema,
  createUserSchema,
  validateCreateUser,
  validatePartialUser,
  encryptPassword,
  CreateJWTFromEmail,
  validatePassword,
  ValidateJWT,
} from "../utils/authUtils";
import { PrismaClient } from "@prisma/client";
import { validateRequest } from "zod-express-middleware";
import { z } from "zod";
import { SendEmail } from "../utils/emailUtils";
import HttpStatusCode from "../utils/statusCodes";

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

    const isAuth = await ValidateJWT(jwt);
    if (isAuth === false || email != isAuth) {
      console.error(`is not authorized`);
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ status: false, message: "User is not authorized!" });
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
    const user = await getUser(email);
    if (user) {
      console.error("could not create user. Already existed!");
      return res
        .status(HttpStatusCode.CONFLICT)
        .json({ status: false, message: "Email is already in use!" });
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
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: false,
        message: "There was an error creating user!",
      });
    }
    const newUser = {
      email,
      jwt,
      apiKeys: [],
    };
    return res
      .status(HttpStatusCode.OK)
      .json({ status: true, message: "User Created!", newUser });
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

      const noPasswordUser = (({ passwordHash, ...user }) => user)(updated);
      return res
        .status(HttpStatusCode.OK)
        .json({ status: true, updatedUser: noPasswordUser });
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatusCode.BAD_REQUEST)
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
        return res
          .status(HttpStatusCode.OK)
          .json({ message: `Successfully deleted user ${email}` });
      })
      .catch((error) => {
        console.error(`Error during delete request ${error}`);
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: `Failed to delete user ${email}` });
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
      return res.status(HttpStatusCode.OK).json(noPasswordUser);
    } else {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: "User does not exist!" });
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
    const { email, password } = req.body;

    try {
      const user = await getUser(email);
      if (!user) {
        console.error("Unable to log in - no user found");
        return res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json({ status: false, message: "Could not log in!" });
        return;
      }

      validatePassword(password, user.passwordHash).then((result) => {
        if (result === false) {
          console.error(`password compare failed`);
          return res
            .status(HttpStatusCode.UNAUTHORIZED)
            .json({ status: false, message: "Could not log in!" });
          return;
        }

        const token = CreateJWTFromEmail(email);
        const newUser = {
          email: user.email,
          jwt: token,
          APIKey: user.APIKey,
        };
        return res
          .status(HttpStatusCode.OK)
          .json({ status: true, message: "You have logged in!", newUser });
      });
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ status: false, message: "Could not log in!" });
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
    const { jwt } = req.body;
    const verify = ValidateJWT(jwt);
    if (typeof verify === "string" || verify === false)
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ status: false, message: "user is not logged in" });
    else {
      const user = await getUser(verify);
      return res
        .status(HttpStatusCode.OK)
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

      if (!(email in passwordResetRequests)) {
        passwordResetRequests[email] = code;
        SendEmail(email, code.toString());
      }
    }
    return res.status(HttpStatusCode.OK).json({
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

    if (
      !(email in passwordResetRequests) ||
      !code ||
      passwordResetRequests[email] != code
    ) {
      console.error(`email : ${email} or code ${resetCode} were not correct`);
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: false,
        message: "Failed to reset password!",
      });
    }

    let passwordHash = await encryptPassword(newPassword);
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
      return res
        .status(HttpStatusCode.OK)
        .json({ status: true, message: "Successfully reset password!" });
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ status: false, message: "Failed to reset password!" });
    }
  }
);

export { Authentication };
