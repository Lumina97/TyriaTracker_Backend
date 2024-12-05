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
exports.getUserDungeons = exports.getUserWizardVault = exports.getUserRaids = exports.getUserWorldBosses = exports.getUserDailyCrafts = exports.getPricingDataForAllTradableItems = exports.updateTradableItemsFromFile = exports.updateItemIDSFromGW2Api = exports.updateWorldBossesFromGW2API = exports.updateDailyCraftingFromGW2API = exports.updateRaidsFromGW2API = exports.updateDungeonsFromGW2API = void 0;
const client_1 = require("@prisma/client");
const guildwars2_ts_1 = require("guildwars2-ts");
const fs_1 = __importDefault(require("fs"));
const prisma = new client_1.PrismaClient();
const api = new guildwars2_ts_1.GW2Api({
    token: "3EA9CEC1-5DD9-004A-9801-FD43E868DFF393853EE8-CB9E-4D84-9C5F-1B6422E090C1",
    language: guildwars2_ts_1.ApiLanguage.English,
    rateLimitRetry: true,
});
let allTradableItemIds = [];
const updateDungeonsFromGW2API = () => __awaiter(void 0, void 0, void 0, function* () {
    yield api.dungeons.get("all").then((dungeons) => {
        dungeons.map((dungeon) => __awaiter(void 0, void 0, void 0, function* () {
            const exists = yield prisma.dailyCrafting.findFirst({
                where: {
                    name: dungeon.id,
                },
            });
            if (!exists) {
                try {
                    console.log(dungeon);
                    const newDungeon = yield prisma.dungeon.create({
                        data: {
                            name: dungeon.id,
                            paths: {
                                create: dungeon.paths.map((path) => ({
                                    name: path.id,
                                    type: path.type,
                                })),
                            },
                        },
                    });
                    console.log("Dungeon created:", newDungeon);
                }
                catch (error) {
                    console.error("Error creating dungeon:", error);
                }
            }
            else
                console.log("Dungeon already saved!");
        }));
    });
});
exports.updateDungeonsFromGW2API = updateDungeonsFromGW2API;
const updateRaidsFromGW2API = () => __awaiter(void 0, void 0, void 0, function* () {
    yield api.raids.get("all").then((raids) => {
        raids.map((raid) => {
            raid.wings.map((wing) => __awaiter(void 0, void 0, void 0, function* () {
                const exists = yield prisma.raidWing.findFirst({
                    where: {
                        name: wing.id,
                    },
                });
                if (!exists) {
                    try {
                        const newRaid = yield prisma.raidWing.create({
                            data: {
                                name: wing.id,
                                events: {
                                    create: wing.events.map((event) => ({
                                        name: event.id,
                                        type: event.type,
                                    })),
                                },
                            },
                        });
                        console.log("Raid created:", newRaid);
                    }
                    catch (error) {
                        console.error("Error creating Raid:", error);
                    }
                }
                else
                    console.log("Raid already saved!");
            }));
        });
    });
});
exports.updateRaidsFromGW2API = updateRaidsFromGW2API;
const updateDailyCraftingFromGW2API = () => __awaiter(void 0, void 0, void 0, function* () {
    yield api.dailyCrafting.get().then((crafts) => {
        crafts.map((craft) => __awaiter(void 0, void 0, void 0, function* () {
            const exists = yield prisma.dailyCrafting.findFirst({
                where: {
                    name: craft,
                },
            });
            if (!exists) {
                try {
                    const newCraft = yield prisma.dailyCrafting.create({
                        data: {
                            name: craft,
                        },
                    });
                    console.log("Daily Craft created:", newCraft);
                }
                catch (error) {
                    console.error("Error creating Daily Craft:", error);
                }
            }
            else
                console.log("Daily Craft already saved!");
        }));
    });
});
exports.updateDailyCraftingFromGW2API = updateDailyCraftingFromGW2API;
const updateWorldBossesFromGW2API = () => __awaiter(void 0, void 0, void 0, function* () {
    yield api.worldBosses.get().then((bosses) => {
        bosses.map((boss) => __awaiter(void 0, void 0, void 0, function* () {
            const exists = yield prisma.dailyCrafting.findFirst({
                where: {
                    name: boss,
                },
            });
            if (!exists) {
                try {
                    const newCraft = yield prisma.worldbosses.create({
                        data: {
                            name: boss,
                        },
                    });
                    console.log("WorldBoss created:", newCraft);
                }
                catch (error) {
                    console.error("Error creating WorldBoss:", error);
                }
            }
            else
                console.log("WorldBoss already saved!");
        }));
    });
});
exports.updateWorldBossesFromGW2API = updateWorldBossesFromGW2API;
const updateItemIDSFromGW2Api = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gw2Ids = yield api.items.get();
        const localIds = (yield prisma.items.findMany({ select: { id: true } })).map((item) => item.id);
        const newIds = gw2Ids
            .filter((id) => !localIds.includes(id))
            .map((id) => ({ id }));
        if (newIds.length === 0) {
            console.log("No new id's to add to database!");
            return;
        }
        console.log(`new ids: ${newIds.map((id) => console.log(id))}`);
        yield prisma.items.createMany({
            data: newIds,
        });
    }
    catch (error) {
        console.error(error);
    }
});
exports.updateItemIDSFromGW2Api = updateItemIDSFromGW2Api;
const updateTradableItemsFromFile = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = fs_1.default.readFileSync("response.json", "utf8");
        const ids = JSON.parse(data);
        const localIds = (yield prisma.tradeableItems.findMany({
            select: { id: true },
        })).map((item) => item.id);
        const newIDS = ids.filter((id) => !localIds.includes(id));
        if (newIDS.length === 0) {
            console.log("No new items found!");
            return;
        }
        const batchSize = newIDS.length % 4;
        const batches = [];
        for (let i = 0; i < ids.length; i += batchSize) {
            batches.push(ids.slice(i, i + batchSize));
        }
        for (let i = 0; i < batches.length; i++) {
            const data = yield api.items.get(batches[i]);
            const filtered = data.map(({ id, name, level, rarity, vendor_value, icon }) => ({
                id,
                name,
                level,
                rarity,
                vendorValue: vendor_value,
                icon,
            }));
            //@ts-ignore
            yield prisma.tradeableItems.createMany({ data: filtered });
        }
    }
    catch (err) {
        console.error(err);
    }
});
exports.updateTradableItemsFromFile = updateTradableItemsFromFile;
const getTradableItemIdsFromDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (allTradableItemIds.length > 0)
            return;
        allTradableItemIds = (yield prisma.tradeableItems.findMany({
            select: { id: true },
        })).map((ids) => ids.id);
    }
    catch (error) {
        console.error(error);
    }
});
const getPricingDataForAllTradableItems = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield getTradableItemIdsFromDatabase();
        const batchSize = 200;
        const batches = [];
        for (let i = 0; i < allTradableItemIds.length; i += batchSize) {
            batches.push(allTradableItemIds.slice(i, i + batchSize));
        }
        for (let i = 0; i < batches.length; i++) {
            const prices = (yield api.commerce.getPrices(batches[i])).map(({ id, buys: { unit_price: buyPrice }, sells: { unit_price: sellPrice }, }) => ({
                itemID: id,
                buyPrice,
                sellPrice,
            }));
            yield prisma.priceHistory.createMany({ data: prices });
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.getPricingDataForAllTradableItems = getPricingDataForAllTradableItems;
const getUserDailyCrafts = (apiKey) => __awaiter(void 0, void 0, void 0, function* () {
    const userAPI = new guildwars2_ts_1.GW2Api({
        token: apiKey,
        language: guildwars2_ts_1.ApiLanguage.English,
        rateLimitRetry: true,
    });
    try {
        return yield userAPI.account.getDailyCrafts();
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getUserDailyCrafts = getUserDailyCrafts;
const getUserWorldBosses = (apiKey) => __awaiter(void 0, void 0, void 0, function* () {
    const userAPI = new guildwars2_ts_1.GW2Api({
        token: apiKey,
        language: guildwars2_ts_1.ApiLanguage.English,
        rateLimitRetry: true,
    });
    try {
        return yield userAPI.account.getWorldBosses();
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getUserWorldBosses = getUserWorldBosses;
const getUserRaids = (apiKey) => __awaiter(void 0, void 0, void 0, function* () {
    const userAPI = new guildwars2_ts_1.GW2Api({
        token: apiKey,
        language: guildwars2_ts_1.ApiLanguage.English,
        rateLimitRetry: true,
    });
    try {
        return yield userAPI.account.getRaids();
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getUserRaids = getUserRaids;
const getUserWizardVault = (apiKey) => __awaiter(void 0, void 0, void 0, function* () {
    const userAPI = new guildwars2_ts_1.GW2Api({
        token: apiKey,
        language: guildwars2_ts_1.ApiLanguage.English,
        rateLimitRetry: true,
    });
    try {
        const daily = yield userAPI.account.getWizardsVaultDaily();
        const weekly = yield userAPI.account.getWizardsVaultWeekly();
        const special = yield userAPI.account.getWizardsVaultSpecial();
        const vault = {
            daily,
            weekly,
            special,
        };
        return vault;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getUserWizardVault = getUserWizardVault;
const getUserDungeons = (apiKey) => __awaiter(void 0, void 0, void 0, function* () {
    const userAPI = new guildwars2_ts_1.GW2Api({
        token: apiKey,
        language: guildwars2_ts_1.ApiLanguage.English,
        rateLimitRetry: true,
    });
    try {
        return yield userAPI.account.getDungeons();
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getUserDungeons = getUserDungeons;
