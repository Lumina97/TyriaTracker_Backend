import { z } from 'zod';

export type ApiPermissions =
	| 'account'
	| 'builds'
	| 'characters'
	| 'guilds'
	| 'inventories'
	| 'pvp'
	| 'tradingpost'
	| 'unlocks'
	| 'wallet';

export type EndpointUrls =
	| '/v2/account'
	| '/v2/achievements'
	| '/v2/backstory'
	| '/v2/build'
	| '/v2/characters'
	| '/v2/colors'
	| '/v2/commerce'
	| '/v2/continents'
	| '/v2/createsubtoken'
	| '/v2/currencies'
	| '/v2/dailycrafting'
	| '/v2/dungeons'
	| '/v2/emblem'
	| '/v2/emotes'
	| '/v2/files'
	| '/v2/finishers'
	| '/v2/gliders'
	| '/v2/guild'
	| '/v2/home/cats'
	| '/v2/home/nodes'
	| '/v2/items'
	| '/v2/itemstats'
	| '/v2/legendaryarmory'
	| '/v2/legends'
	| '/v2/mailcarriers'
	| '/v2/mapchests'
	| '/v2/maps'
	| '/v2/masteries'
	| '/v2/materials'
	| '/v2/minis'
	| '/v2/mounts'
	| '/v2/novelties'
	| '/v2/outfits'
	| '/v2/pets'
	| '/v2/professions'
	| '/v2/pvp'
	| '/v2/quaggans'
	| '/v2/quests'
	| '/v2/races'
	| '/v2/raids'
	| '/v2/recipes'
	| '/v2/skills'
	| '/v2/skins'
	| '/v2/specializations'
	| '/v2/stories'
	| '/v2/titles'
	| '/v2/tokeninfo'
	| '/v2/traits'
	| '/v2/worldbosses'
	| '/v2/worlds'
	| '/v2/wvw';

export const stringArrayType = z.array(z.string());
export const numberArrayType = z.array(z.number());
