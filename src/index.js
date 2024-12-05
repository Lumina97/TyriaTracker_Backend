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
//@ts-ignore
const express_1 = __importDefault(require("express"));
const Authentication_1 = require("./Routers/Authentication");
//@ts-ignore
const cors_1 = __importDefault(require("cors"));
const API_1 = require("./Routers/API");
const node_cron_1 = __importDefault(require("node-cron"));
const GW2API_1 = require("./utils/GW2API");
const app = (0, express_1.default)();
const port = 3030;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(Authentication_1.Authentication);
app.use(API_1.APIRouter);
app.listen(port, () => {
    console.log(`Started Tyria Tracker backend on port ${port}`);
});
node_cron_1.default.schedule("3 * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Running scheduled API updates!");
    yield (0, GW2API_1.getPricingDataForAllTradableItems)();
}));
