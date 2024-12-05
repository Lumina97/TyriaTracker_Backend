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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
const express_1 = require("express");
const authUtils_1 = require("../utils/authUtils");
const client_1 = require("@prisma/client");
const zod_express_middleware_1 = require("zod-express-middleware");
const zod_1 = require("zod");
const emailUtils_1 = require("../utils/emailUtils");
const prisma = new client_1.PrismaClient();
const Authentication = (0, express_1.Router)();
exports.Authentication = Authentication;
let passwordResetRequests = {};
const getUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findFirst({
        where: {
            email: email,
        },
    });
    return user;
});
const checkIfUserIsAuthorized = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = req.body.newUser;
        const jwt = newUser ? newUser.jwt : req.body.jwt;
        const { email } = req.params;
        const isAuth = yield (0, authUtils_1.isUserAuthorized)(email, jwt);
        if (isAuth === false) {
            console.log(`is not authorized`);
            res
                .status(403)
                .json({ status: false, message: "User is not authorized!" });
            return;
        }
        next();
    });
};
//Create new user
Authentication.post("/auth/users", (0, authUtils_1.validateCreateUser)(authUtils_1.createUserSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, APIKey } = req.body;
    console.log(`Account create request with email: ${email}`);
    const user = yield getUser(email);
    if (user) {
        console.error("could not create user. Already existed!");
        res
            .status(409)
            .json({ status: false, message: "Email is already in use!" });
        return;
    }
    let hadCreationError = false;
    const passwordHash = yield (0, authUtils_1.encryptPassword)(password);
    yield prisma.user
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
    const jwt = (0, authUtils_1.CreateJWTFromEmail)(email);
    if (jwt === false)
        hadCreationError = true;
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
}));
//Update User
Authentication.patch("/auth/users/:email", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        newUser: zod_1.z.object({
            jwt: zod_1.z.string({
                required_error: "JWT is required when updating user information",
            }),
            email: zod_1.z.string().optional(),
            password: zod_1.z.string().optional(),
            APIKey: zod_1.z.string().optional(),
        }),
    }),
}), checkIfUserIsAuthorized(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const { newUser } = req.body;
    //check if password changed and create a new hash if so
    let passwordHash = "";
    if (newUser.password)
        passwordHash = yield (0, authUtils_1.encryptPassword)(newUser.password);
    //check if email changed and create new jwt token if so
    if (newUser.email && newUser.email != email) {
        const newJwt = (0, authUtils_1.CreateJWTFromEmail)(newUser.email);
        if (newJwt) {
            newUser.jwt = newJwt;
        }
    }
    //create a new user object with only data that changed
    const data = {};
    if (newUser.APIKey)
        data.APIKey = newUser.APIKey;
    if (passwordHash)
        data.passwordHash = passwordHash;
    if (newUser.email)
        data.email = newUser.email;
    console.log(JSON.stringify(data));
    try {
        //update user with params
        const updated = yield prisma.user.update({
            where: {
                email: req.params.email,
            },
            data: Object.assign({}, ((_a) => {
                var { jwt } = _a, data = __rest(_a, ["jwt"]);
                return data;
            })(data)),
        });
        //@ts-ignore
        updated.jwt = newUser.jwt;
        console.log(`updated ${updated.email}`);
        console.log(`new user: ${JSON.stringify(updated)}`);
        const noPasswordUser = ((_a) => {
            var { passwordHash } = _a, user = __rest(_a, ["passwordHash"]);
            return user;
        })(updated);
        res.json({ status: true, updatedUser: noPasswordUser });
    }
    catch (error) {
        console.log(error);
        res
            .status(400)
            .json({ status: false, message: "There was an issue updating User" });
    }
}));
//Delete User
Authentication.delete("/auth/users/:email", (0, authUtils_1.validatePartialUser)(authUtils_1.userPartialSchema), checkIfUserIsAuthorized(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
//Get User
Authentication.get("/auth/users/:email", (0, authUtils_1.validatePartialUser)(authUtils_1.userPartialSchema), checkIfUserIsAuthorized(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield getUser(req.params.email);
    if (user) {
        //remove password hash before sending it off.
        const noPasswordUser = ((_a) => {
            var { passwordHash } = _a, user = __rest(_a, ["passwordHash"]);
            return user;
        })(user);
        res.status(200).json(noPasswordUser);
    }
    else {
        res.status(400).json({ error: "User does not exist!" });
    }
}));
//logIn User
Authentication.post("/auth/login", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z
        .object({
        email: zod_1.z.string({ required_error: "Email is required in body!" }),
        password: zod_1.z.string({ required_error: "Password is required in body!" }),
    })
        .strict(),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`login request from email: ${req.body.email}`);
    const { email, password } = req.body;
    try {
        const user = yield getUser(email);
        if (!user) {
            console.log("Unable to log in - no user found");
            res.status(401).json({ status: false, message: "Could not log in!" });
            return;
        }
        (0, authUtils_1.validatePassword)(password, user.passwordHash).then((result) => {
            if (result === false) {
                console.log(`password compare failed`);
                res.status(401).json({ status: false, message: "Could not log in!" });
                return;
            }
            const token = (0, authUtils_1.CreateJWTFromEmail)(email);
            const newUser = {
                email: user.email,
                jwt: token,
                APIKey: user.APIKey,
            };
            res
                .status(200)
                .json({ status: true, message: "You have logged in!", newUser });
        });
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ status: false, message: "Could not log in!" });
    }
}));
//logOut User
Authentication.post("/auth/logout", (req, res) => { });
//check if loggedIn
Authentication.post("/auth/isLoggedIn", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        jwt: zod_1.z.string({ required_error: "jwt is required to check login state" }),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("logged in status request");
    const { jwt } = req.body;
    const verify = (0, authUtils_1.ValidateJWT)(jwt);
    if (typeof verify === "string" || verify === false)
        res.status(400).json({ status: false, message: "user is not logged in" });
    else {
        const user = yield getUser(verify.email);
        res
            .status(200)
            .json({ status: true, message: "user is logged in", user });
    }
}));
//password reset
Authentication.post("/auth/passwordReset/initialize", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Email is required to reset password",
        }),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield getUser(email);
    if (user) {
        const code = Math.floor(100000 + Math.random() * 900000);
        console.log(`found user with email: ${email}, sending reset code: ${code}`);
        if (!(email in passwordResetRequests)) {
            passwordResetRequests[email] = code;
            (0, emailUtils_1.SendEmail)(email, code.toString());
        }
    }
    res.status(200).json({
        status: true,
        message: "If user exists you will receive a email with a pass code.",
    });
}));
Authentication.post("/auth/passwordReset/confirm", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Email is required to reset password",
        }),
        resetCode: zod_1.z.string({
            required_error: "resetCode is required to reset password",
        }),
        newPassword: zod_1.z.string({
            required_error: "newPassword is required to reset password",
        }),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        passwordResetRequests[email] != code) {
        console.log(`email : ${email} or code ${resetCode} were not correct`);
        res.status(400).json({
            status: false,
            message: "Failed to reset password!",
        });
        return;
    }
    console.log("Setting new password");
    //check if password changed and create a new hash if so
    let passwordHash = yield (0, authUtils_1.encryptPassword)(newPassword);
    //create a new user object with only data that changed
    const data = {};
    data.passwordHash = passwordHash;
    data.email = email;
    try {
        yield prisma.user.update({
            where: {
                email: email,
            },
            data: Object.assign({}, data),
        });
        delete passwordResetRequests[email];
        res.json({ status: true, message: "Successfully reset password!" });
    }
    catch (error) {
        console.log(error);
        res
            .status(400)
            .json({ status: false, message: "Failed to reset password!" });
    }
}));
