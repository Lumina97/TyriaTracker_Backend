"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserAuthorized = exports.ValidateJWT = exports.CreateJWTFromEmail = exports.validatePassword = exports.encryptPassword = exports.validatePartialUser = exports.userPartialSchema = exports.validateCreateUser = exports.createUserSchema = void 0;
const zod_1 = require("zod");
//@ts-ignore
const bcrypt_1 = __importDefault(require("bcrypt"));
//@ts-ignore
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const encryptSaltRounds = 11;
exports.createUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: "Email is required!" })
            .email("Not a valid email"),
        password: zod_1.z.string({
            required_error: "Password is required!",
        }),
        APIKey: zod_1.z.string({
            required_error: "API key is required to create account!",
        }),
    }),
});
const validateCreateUser = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            return next();
        }
        catch (error) {
            res.status(400).json(error);
        }
    });
};
exports.validateCreateUser = validateCreateUser;
exports.userPartialSchema = zod_1.z.object({
    params: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is required in params!" }),
    }),
    body: zod_1.z
        .object({
        jwt: zod_1.z.string({ required_error: "json web token is required in body!" }),
        password: zod_1.z.string().optional(),
        APIKey: zod_1.z.string().optional(),
    })
        .strict(),
});
const validatePartialUser = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield schema.parseAsync({
                body: req.body,
                params: req.params,
            });
            return next();
        }
        catch (error) {
            res.status(400).json({ message: "Validation has failed", error: error });
        }
    });
};
exports.validatePartialUser = validatePartialUser;
const encryptPassword = (password) => {
    return bcrypt_1.default.hash(password, encryptSaltRounds);
};
exports.encryptPassword = encryptPassword;
const validatePassword = (password, passwordHash) => {
    return bcrypt_1.default.compare(password, passwordHash);
};
exports.validatePassword = validatePassword;
const CreateJWTFromEmail = (email) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error("Could not read JWT secret from env file");
        return false;
    }
    return jsonwebtoken_1.default.sign({ email: email }, secret);
};
exports.CreateJWTFromEmail = CreateJWTFromEmail;
const ValidateJWT = (token) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error("Could not read JWT secret from env file");
        return false;
    }
    try {
        return jsonwebtoken_1.default.verify(token, secret);
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.ValidateJWT = ValidateJWT;
const isUserAuthorized = (email, jwt) => {
    const valid = (0, exports.ValidateJWT)(jwt);
    if (valid === false || valid.email !== email) {
        return false;
    }
    return true;
};
exports.isUserAuthorized = isUserAuthorized;
