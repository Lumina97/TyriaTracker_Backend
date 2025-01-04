import { NextFunction, Request, Response } from "express";
import { AnyZodObject, z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const encryptSaltRounds = 11;

export const createUserSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required!" })
      .email("Not a valid email"),
    password: z.string({
      required_error: "Password is required!",
    }),
    APIKey: z.string({
      required_error: "API key is required to create account!",
    }),
  }),
});

export const validateCreateUser = (schema: AnyZodObject) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      res.status(400).json(error);
    }
  };
};

export const userPartialSchema = z.object({
  params: z.object({
    email: z.string({ required_error: "Email is required in params!" }),
  }),
  body: z
    .object({
      jwt: z.string({ required_error: "json web token is required in body!" }),
      password: z.string().optional(),
      APIKey: z.string().optional(),
    })
    .strict(),
});

export const validatePartialUser = (schema: AnyZodObject) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        params: req.params,
      });
      return next();
    } catch (error) {
      res.status(400).json({ message: "Validation has failed", error: error });
    }
  };
};

export const encryptPassword = (password: string) => {
  return bcrypt.hash(password, encryptSaltRounds);
};

export const validatePassword = (password: string, passwordHash: string) => {
  return bcrypt.compare(password, passwordHash);
};

export const CreateJWTFromEmail = (email: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("Could not read JWT secret from env file");
    return false;
  }

  return jwt.sign({ email: email }, secret);
};

export const ValidateJWT = (token: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("Could not read JWT secret from env file");
    return false;
  }

  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const isUserAuthorized = (email: string, jwt: string) => {
  const valid = ValidateJWT(jwt);
  if (valid === false || (valid as { email: string }).email !== email) {
    return false;
  }
  return true;
};
