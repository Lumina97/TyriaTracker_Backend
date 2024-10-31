import { NextFunction, query, Request, Response } from "express";
import { AnyZodObject, string, z } from "zod";
import bcrypt from "bcrypt";

const encryptSaltRounds = 11;

export const createUserSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required!" })
      .email("Not a valid email"),
    password: z.string({
      required_error: "Password is required!",
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
