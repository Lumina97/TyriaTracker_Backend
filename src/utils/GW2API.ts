import { PrismaClient } from "@prisma/client";
import { GW2Api, ApiLanguage } from "guildwars2-ts";

const prisma = new PrismaClient();
const api: GW2Api = new GW2Api({
  token: "YOUR-TOKEN-HERE",
  language: ApiLanguage.English,
  rateLimitRetry: true,
});

export const updateDungeonsFromGW2API = async () => {
  await api.dungeons.get("all").then((dungeons) => {
    dungeons.map(async (dungeon) => {
      try {
        console.log(dungeon);
        const newDungeon = await prisma.dungeon.create({
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
      } catch (error) {
        console.error("Error creating dungeon:", error);
      }
    });
  });
};

export const updateRaidsFromGW2API = async () => {
  await api.raids.get("all").then((raids) => {
    raids.map((raid) => {
      raid.wings.map(async (wing) => {
        try {
          const newRaid = await prisma.raidWing.create({
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
        } catch (error) {
          console.error("Error creating Raid:", error);
        }
      });
    });
  });
};

export const updateDailyCraftingFromGW2API = async () => {
  await api.dailyCrafting.get().then((crafts) => {
    crafts.map(async (craft) => {
      try {
        const newCraft = await prisma.dailyCrafting.create({
          data: {
            name: craft,
          },
        });
        console.log("Daily Craft created:", newCraft);
      } catch (error) {
        console.error("Error creating Daily Craft:", error);
      }
    });
  });
};

export const updateWorldBossesFromGW2API = async () => {
  await api.worldBosses.get().then((bosses) => {
    bosses.map(async (boss) => {
      try {
        const newCraft = await prisma.worldbosses.create({
          data: {
            name: boss,
          },
        });
        console.log("Worldboss created:", newCraft);
      } catch (error) {
        console.error("Error creating Worldboss:", error);
      }
    });
  });
};
