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
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIRouter = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const zod_express_middleware_1 = require("zod-express-middleware");
const client_1 = require("@prisma/client");
const GW2API_1 = require("../utils/GW2API");
const authUtils_1 = require("../utils/authUtils");
const APIRouter = (0, express_1.Router)();
exports.APIRouter = APIRouter;
const prisma = new client_1.PrismaClient();
const getUserAPIKeyFromEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findFirst({
        where: {
            email,
        },
    });
    return user === null || user === void 0 ? void 0 : user.APIKey;
});
const ValidateUserAndAPIKey = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, jwt } = req.body;
        const isAuth = yield (0, authUtils_1.isUserAuthorized)(email, jwt);
        if (isAuth === false) {
            res
                .status(400)
                .json({ status: false, message: "User is not autorized!" });
            return;
        }
        const key = yield getUserAPIKeyFromEmail(email);
        if (key === null) {
            res
                .status(400)
                .json({ status: false, message: "User does not have an API key set!" });
            return;
        }
        req.body.apiKey = key;
        next();
    });
};
//"/api/worldBosses",
APIRouter.post("/api/worldBosses", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is required!" }),
        jwt: zod_1.z.string({ required_error: "JWT is required!" }),
    }),
}), ValidateUserAndAPIKey(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield (0, GW2API_1.getUserWorldBosses)(req.body.apiKey);
    const worldData = yield prisma.worldbosses.findMany();
    res.status(200).json({ status: true, userData, worldData });
}));
//"/api/raids",
APIRouter.post("/api/raids", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is required!" }),
        jwt: zod_1.z.string({ required_error: "JWT is required!" }),
    }),
}), ValidateUserAndAPIKey(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`request from email: ${req.body.email} with key:\n${req.body.apiKey} `);
    const userData = yield (0, GW2API_1.getUserRaids)(req.body.apiKey);
    const worldData = yield prisma.raidWing.findMany({
        include: { events: true },
    });
    res.status(200).json({ status: true, userData, worldData });
}));
//"/api/dungeons",
APIRouter.post("/api/dungeons", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is required!" }),
        jwt: zod_1.z.string({ required_error: "JWT is required!" }),
    }),
}), ValidateUserAndAPIKey(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const worldData = yield prisma.dungeon.findMany({
        include: { paths: true },
    });
    const userData = yield (0, GW2API_1.getUserDungeons)(req.body.apiKey);
    res.status(200).json({ status: true, userData, worldData });
}));
//"/api/dailyCrafting",
APIRouter.post("/api/dailyCrafting", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is required!" }),
        jwt: zod_1.z.string({ required_error: "JWT is required!" }),
    }),
}), ValidateUserAndAPIKey(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const worldData = yield prisma.dailyCrafting.findMany();
    const userData = yield (0, GW2API_1.getUserDailyCrafts)(req.body.apiKey);
    res.status(200).json({ status: true, userData, worldData });
}));
//"/api/wizardVault",
APIRouter.post("/api/wizardVault", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is required!" }),
        jwt: zod_1.z.string({ required_error: "JWT is required!" }),
    }),
}), ValidateUserAndAPIKey(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield (0, GW2API_1.getUserWizardVault)(req.body.apiKey);
    res.status(200).json({ status: true, userData });
}));
