import { GW2Api, ApiLanguage } from "guildwars2-ts";

const api: GW2Api = new GW2Api({
	token: "YOUR-TOKEN-HERE",
	language: ApiLanguage.English,
	rateLimitRetry: true
});

export const getDungeons = async () => {
	await api.dailyCrafting.get().then(result => console.log(result))
  
};