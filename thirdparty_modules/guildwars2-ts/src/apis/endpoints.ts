export interface Endpoint {
	path: `v2/${string}`;
	tokenRequired: boolean;
}

type SubEndpoint = Record<string, Endpoint>;
type SubSubEndpoint = Record<string, Endpoint | Record<string, Endpoint>>;

export const endpoints = {
	account: {
		base: {
			path: 'v2/account',
			tokenRequired: true
		},
		achievements: {
			path: 'v2/account/achievements',
			tokenRequired: true
		},
		bank: {
			path: 'v2/account/bank',
			tokenRequired: true
		},
		buildStorage: {
			path: 'v2/account/buildstorage?ids=all',
			tokenRequired: true
		},
		dailyCrafting: {
			path: 'v2/account/dailycrafting',
			tokenRequired: true
		},
		dungeons: {
			path: 'v2/account/dungeons',
			tokenRequired: true
		},
		dyes: {
			path: 'v2/account/dyes',
			tokenRequired: true
		},
		emotes: {
			path: 'v2/account/emotes',
			tokenRequired: true
		},
		finishers: {
			path: 'v2/account/finishers',
			tokenRequired: true
		},
		gliders: {
			path: 'v2/account/gliders',
			tokenRequired: true
		},
		homeCats: {
			path: 'v2/account/home/cats',
			tokenRequired: true
		},
		homeNodes: {
			path: 'v2/account/home/nodes',
			tokenRequired: true
		},
		homesteadDecorations: {
			path: 'v2/account/homestead/decorations',
			tokenRequired: true
		},
		homesteadGlyphs: {
			path: 'v2/account/homestead/glyphs',
			tokenRequired: true
		},
		inventory: {
			path: 'v2/account/inventory',
			tokenRequired: true
		},
		jadebots: {
			path: 'v2/account/jadebots',
			tokenRequired: true
		},
		legendaryArmory: {
			path: 'v2/account/legendaryarmory',
			tokenRequired: true
		},
		luck: {
			path: 'v2/account/luck',
			tokenRequired: true
		},
		mailCarriers: {
			path: 'v2/account/mailcarriers',
			tokenRequired: true
		},
		mapChests: {
			path: 'v2/account/mapchests',
			tokenRequired: true
		},
		masteries: {
			path: 'v2/account/masteries',
			tokenRequired: true
		},
		masteryPoints: {
			path: 'v2/account/mastery/points',
			tokenRequired: true
		},
		materials: {
			path: 'v2/account/materials',
			tokenRequired: true
		},
		minis: {
			path: 'v2/account/minis',
			tokenRequired: true
		},
		mountsSkins: {
			path: 'v2/account/mounts/skins',
			tokenRequired: true
		},
		mountsTypes: {
			path: 'v2/account/mounts/types',
			tokenRequired: true
		},
		novelties: {
			path: 'v2/account/novelties',
			tokenRequired: true
		},
		outfits: {
			path: 'v2/account/outfits',
			tokenRequired: true
		},
		progression: {
			path: 'v2/account/progression',
			tokenRequired: true
		},
		pvpHeroes: {
			path: 'v2/account/pvp/heroes',
			tokenRequired: true
		},
		raids: {
			path: 'v2/account/raids',
			tokenRequired: true
		},
		recipes: {
			path: 'v2/account/recipes',
			tokenRequired: true
		},
		skiffs: {
			path: 'v2/account/skiffs',
			tokenRequired: true
		},
		skins: {
			path: 'v2/account/skins',
			tokenRequired: true
		},
		titles: {
			path: 'v2/account/titles',
			tokenRequired: true
		},
		wallet: {
			path: 'v2/account/wallet',
			tokenRequired: true
		},
		wizardsVaultDaily: {
			path: 'v2/account/wizardsvault/daily',
			tokenRequired: true
		},
		wizardsVaultListings: {
			path: 'v2/account/wizardsvault/listings',
			tokenRequired: true
		},
		wizardsVaultSpecial: {
			path: 'v2/account/wizardsvault/special',
			tokenRequired: true
		},
		wizardsVaultWeekly: {
			path: 'v2/account/wizardsvault/weekly',
			tokenRequired: true
		},
		worldBosses: {
			path: 'v2/account/worldbosses',
			tokenRequired: true
		}
	},
	achievements: {
		categoryIds: {
			path: 'v2/achievements/categories',
			tokenRequired: false
		},
		categories: {
			path: 'v2/achievements/categories?ids=$(ids)',
			tokenRequired: false
		},
		groupsAll: {
			path: 'v2/achievements/groups',
			tokenRequired: false
		},
		groupsById: {
			path: 'v2/achievements/groups/$(id)',
			tokenRequired: false
		}
	},
	backstory: {
		answersAll: {
			path: 'v2/backstory/answers',
			tokenRequired: false
		},
		answersById: {
			path: 'v2/backstory/answers?ids=$(ids)',
			tokenRequired: false
		},
		questionsAll: {
			path: 'v2/backstory/questions',
			tokenRequired: false
		},
		questionsById: {
			path: 'v2/backstory/questions?ids=$(ids)',
			tokenRequired: false
		}
	},
	build: {
		path: 'v2/build',
		tokenRequired: false
	},
	characters: {
		base: {
			path: 'v2/characters',
			tokenRequired: true
		},
		backstory: {
			path: 'v2/characters/$(id)/backstory',
			tokenRequired: true
		},
		buildTabs: {
			path: 'v2/characters/$(id)/buildtabs?tabs=$(tabs)',
			tokenRequired: true
		},
		core: {
			path: 'v2/characters/$(id)/core',
			tokenRequired: true
		},
		crafting: {
			path: 'v2/characters/$(id)/crafting',
			tokenRequired: true
		},
		equipment: {
			path: 'v2/characters/$(id)/equipment',
			tokenRequired: true
		},
		equipmentTabsById: {
			path: 'v2/characters/$(id)/equipmenttabs?tabs=$(tabs)',
			tokenRequired: true
		},
		equipmentTabActive: {
			path: 'v2/characters/$(id)/equipmenttabs/active',
			tokenRequired: true
		},
		heroPoints: {
			path: 'v2/characters/$(id)/heropoints',
			tokenRequired: true
		},
		inventory: {
			path: 'v2/characters/$(id)/inventory',
			tokenRequired: true
		},
		quests: {
			path: 'v2/characters/$(id)/quests',
			tokenRequired: true
		},
		recipes: {
			path: 'v2/characters/$(id)/recipes',
			tokenRequired: true
		},
		sab: {
			path: 'v2/characters/$(id)/sab',
			tokenRequired: true
		},
		skills: {
			path: 'v2/characters/$(id)/skills',
			tokenRequired: true
		},
		specializations: {
			path: 'v2/characters/$(id)/specializations',
			tokenRequired: true
		},
		training: {
			path: 'v2/characters/$(id)/training',
			tokenRequired: true
		}
	},
	colors: {
		all: {
			path: 'v2/colors',
			tokenRequired: false
		},
		byId: {
			path: 'v2/colors?ids=$(ids)',
			tokenRequired: false
		}
	},
	commerce: {
		delivery: {
			path: 'v2/commerce/delivery',
			tokenRequired: true
		},
		exchange: {
			path: 'v2/commerce/exchange/$(type)?quantity=$(quantity)',
			tokenRequired: false
		},
		listings: {
			byId: {
				path: 'v2/commerce/listings?ids=$(ids)',
				tokenRequired: false
			},
			all: {
				path: 'v2/commerce/listings',
				tokenRequired: false
			}
		},
		prices: {
			byId: {
				path: 'v2/commerce/prices?ids=$(ids)',
				tokenRequired: false
			},
			all: {
				path: 'v2/commerce/prices',
				tokenRequired: false
			}
		},
		transactions: {
			path: 'v2/commerce/transactions/$(status)/$(type)',
			tokenRequired: true
		}
	},
	continents: {
		core: {
			path: 'v2/continents',
			tokenRequired: false
		},
		continents: {
			path: 'v2/continents?ids=$(continents)',
			tokenRequired: false
		},
		floors: {
			path: 'v2/continents/$(continents)/floors?ids=$(floors)',
			tokenRequired: false
		},
		regions: {
			path: 'v2/continents/$(continents)/floors/$(floors)/regions?ids=$(regions)',
			tokenRequired: false
		},
		maps: {
			path: 'v2/continents/$(continents)/floors/$(floors)/regions/$(regions)/maps?ids=$(maps)',
			tokenRequired: false
		}
	},
	createSubtoken: {
		noUrl: {
			path: 'v2/createsubtoken?expire=$(expire)&permissions=$(permissions)',
			tokenRequired: true
		},
		url: {
			path: 'v2/createsubtoken?expire=$(expire)&permissions=$(permissions)&urls=$(urls)',
			tokenRequired: true
		}
	},
	currencies: {
		all: {
			path: 'v2/currencies',
			tokenRequired: false
		},
		byId: {
			path: 'v2/currencies?ids=$(ids)',
			tokenRequired: false
		}
	},
	dailyCrafting: {
		path: 'v2/dailycrafting',
		tokenRequired: false
	},
	dungeons: {
		all: {
			path: 'v2/dungeons',
			tokenRequired: false
		},
		byId: {
			path: 'v2/dungeons?ids=$(ids)',
			tokenRequired: false
		}
	},
	emblem: {
		path: 'v2/emblem/$(type)?ids=$(ids)',
		tokenRequired: false
	},
	emotes: {
		all: {
			path: 'v2/emotes',
			tokenRequired: false
		},
		byId: {
			path: 'v2/emotes?ids=$(ids)',
			tokenRequired: false
		}
	},
	files: {
		all: {
			path: 'v2/files',
			tokenRequired: false
		},
		byId: {
			path: 'v2/files?ids=$(ids)',
			tokenRequired: false
		}
	},
	finishers: {
		all: {
			path: 'v2/finishers',
			tokenRequired: false
		},
		byId: {
			path: 'v2/finishers?ids=$(ids)',
			tokenRequired: false
		}
	},
	gliders: {
		all: {
			path: 'v2/gliders',
			tokenRequired: false
		},
		byId: {
			path: 'v2/gliders?ids=$(ids)',
			tokenRequired: false
		},
		paginated: {
			path: 'v2/gliders?ids=$(ids)&page=$(page)&page_size=$(page_size)',
			tokenRequired: false
		}
	},
	guild: {
		core: {
			path: 'v2/guild/$(id)',
			tokenRequired: false
		},
		log: {
			path: 'v2/guild/$(id)/log?since=$(since)',
			tokenRequired: true
		},
		members: {
			path: 'v2/guild/$(id)/members',
			tokenRequired: true
		},
		ranks: {
			path: 'v2/guild/$(id)/ranks',
			tokenRequired: true
		},
		stash: {
			path: 'v2/guild/$(id)/stash',
			tokenRequired: true
		},
		storage: {
			path: 'v2/guild/$(id)/storage',
			tokenRequired: true
		},
		teams: {
			path: 'v2/guild/$(id)/teams',
			tokenRequired: true
		},
		treasury: {
			path: 'v2/guild/$(id)/treasury',
			tokenRequired: true
		},
		upgrades: {
			path: 'v2/guild/$(id)/upgrades',
			tokenRequired: true
		},
		upgradesInfo: {
			path: 'v2/guild/upgrades?ids=$(ids)',
			tokenRequired: false
		},
		permissionsAll: {
			path: 'v2/guild/permissions',
			tokenRequired: false
		},
		permissionsById: {
			path: 'v2/guild/permissions?ids=$(ids)',
			tokenRequired: false
		},
		search: {
			path: 'v2/guild/search?name=$(name)',
			tokenRequired: false
		}
	},
	home: {
		cats: {
			path: 'v2/home/cats?ids=$(ids)',
			tokenRequired: false
		},
		nodes: {
			path: 'v2/home/nodes?ids=$(ids)',
			tokenRequired: false
		}
	},
	homestead: {
		decorationsById: {
			path: 'v2/homestead/decorations?ids=$(ids)',
			tokenRequired: false
		},
		decorationsAll: {
			path: 'v2/homestead/decorations',
			tokenRequired: false
		},
		decorationsCategoriesById: {
			path: 'v2/homestead/decorations/categories?ids=$(ids)',
			tokenRequired: false
		},
		decorationsCategoriesAll: {
			path: 'v2/homestead/decorations/categories',
			tokenRequired: false
		},
		glyphsById: {
			path: 'v2/homestead/glyphs?ids=$(ids)',
			tokenRequired: false
		},
		glyphsAll: {
			path: 'v2/homestead/glyphs',
			tokenRequired: false
		}
	},
	items: {
		all: {
			path: 'v2/items',
			tokenRequired: false
		},
		byId: {
			path: 'v2/items?ids=$(ids)',
			tokenRequired: false
		}
	},
	itemstats: {
		all: {
			path: 'v2/itemstats',
			tokenRequired: false
		},
		byId: {
			path: 'v2/itemstats?ids=$(ids)',
			tokenRequired: false
		}
	},
	jadebots: {
		all: {
			path: 'v2/jadebots',
			tokenRequired: false
		},
		byId: {
			path: 'v2/jadebots?ids=$(ids)',
			tokenRequired: false
		}
	},
	legendaryArmory: {
		all: {
			path: 'v2/legendaryarmory',
			tokenRequired: false
		},
		byId: {
			path: 'v2/legendaryarmory?ids=$(ids)',
			tokenRequired: false
		}
	},
	legends: {
		all: {
			path: 'v2/legends',
			tokenRequired: false
		},
		byId: {
			path: 'v2/legends?ids=$(ids)',
			tokenRequired: false
		}
	},
	mailCarriers: {
		all: {
			path: 'v2/mailcarriers',
			tokenRequired: false
		},
		byId: {
			path: 'v2/mailcarriers?ids=$(ids)',
			tokenRequired: false
		}
	},
	mapChests: {
		path: 'v2/mapchests',
		tokenRequired: false
	},
	maps: {
		all: {
			path: 'v2/maps',
			tokenRequired: false
		},
		byId: {
			path: 'v2/maps?ids=$(ids)',
			tokenRequired: false
		}
	},
	masteries: {
		all: {
			path: 'v2/masteries',
			tokenRequired: false
		},
		byId: {
			path: 'v2/masteries?ids=$(ids)',
			tokenRequired: false
		}
	},
	materials: {
		all: {
			path: 'v2/materials',
			tokenRequired: false
		},
		byId: {
			path: 'v2/materials?ids=$(ids)',
			tokenRequired: false
		}
	},
	minis: {
		all: {
			path: 'v2/minis',
			tokenRequired: false
		},
		byId: {
			path: 'v2/minis?ids=$(ids)',
			tokenRequired: false
		}
	},
	mountsSkins: {
		all: {
			path: 'v2/mounts/skins',
			tokenRequired: false
		},
		byId: {
			path: 'v2/mounts/skins?ids=$(ids)',
			tokenRequired: false
		}
	},
	mountsTypes: {
		all: {
			path: 'v2/mounts/types',
			tokenRequired: false
		},
		byId: {
			path: 'v2/mounts/types?ids=$(ids)',
			tokenRequired: false
		}
	},
	novelties: {
		all: {
			path: 'v2/novelties',
			tokenRequired: false
		},
		byId: {
			path: 'v2/novelties?ids=$(ids)',
			tokenRequired: false
		}
	},
	outfits: {
		all: {
			path: 'v2/outfits',
			tokenRequired: false
		},
		byId: {
			path: 'v2/outfits?ids=$(ids)',
			tokenRequired: false
		}
	},
	pets: {
		all: {
			path: 'v2/pets',
			tokenRequired: false
		},
		byId: {
			path: 'v2/pets?ids=$(ids)',
			tokenRequired: false
		}
	},
	professions: {
		all: {
			path: 'v2/professions',
			tokenRequired: false
		},
		byId: {
			path: 'v2/professions?ids=$(ids)',
			tokenRequired: false
		}
	},
	pvp: {
		amuletsAll: {
			path: 'v2/pvp/amulets',
			tokenRequired: false
		},
		amuletsById: {
			path: 'v2/pvp/amulets?ids=$(ids)',
			tokenRequired: false
		},
		gamesAll: {
			path: 'v2/pvp/games',
			tokenRequired: true
		},
		gamesById: {
			path: 'v2/pvp/games?ids=$(ids)',
			tokenRequired: true
		},
		heroesAll: {
			path: 'v2/pvp/heroes',
			tokenRequired: false
		},
		heroesById: {
			path: 'v2/pvp/heroes?ids=$(ids)',
			tokenRequired: false
		},
		ranksAll: {
			path: 'v2/pvp/ranks',
			tokenRequired: false
		},
		ranksById: {
			path: 'v2/pvp/ranks?ids=$(ids)',
			tokenRequired: false
		},
		seasonsAll: {
			path: 'v2/pvp/seasons',
			tokenRequired: false
		},
		seasonsById: {
			path: 'v2/pvp/seasons?ids=$(ids)',
			tokenRequired: false
		},
		leaderboards: {
			path: 'v2/pvp/seasons/$(id)/leaderboards/$(type)/$(region)',
			tokenRequired: false
		},
		leaderboardsNoType: {
			path: 'v2/pvp/seasons/$(id)/leaderboards',
			tokenRequired: false
		},
		standings: {
			path: 'v2/pvp/standings',
			tokenRequired: true
		},
		stats: {
			path: 'v2/pvp/stats',
			tokenRequired: true
		}
	},
	quaggans: {
		all: {
			path: 'v2/quaggans',
			tokenRequired: false
		},
		byId: {
			path: 'v2/quaggans?ids=$(ids)',
			tokenRequired: false
		}
	},
	quests: {
		all: {
			path: 'v2/quests',
			tokenRequired: false
		},
		byId: {
			path: 'v2/quests?ids=$(ids)',
			tokenRequired: false
		}
	},
	races: {
		all: {
			path: 'v2/races',
			tokenRequired: false
		},
		byId: {
			path: 'v2/races?ids=$(ids)',
			tokenRequired: false
		}
	},
	raids: {
		all: {
			path: 'v2/raids',
			tokenRequired: false
		},
		byId: {
			path: 'v2/raids?ids=$(ids)',
			tokenRequired: false
		}
	},
	recipes: {
		byId: {
			/**
			 * TODO: The hardcoded schema could use some work
			 */
			path: 'v2/recipes?ids=$(ids)&v=2022-03-09T02:00:00.000Z',
			tokenRequired: false
		},
		all: {
			path: 'v2/recipes',
			tokenRequired: false
		},
		search: {
			path: 'v2/recipes/search?$(type)=$(ids)',
			tokenRequired: false
		}
	},
	skiffs: {
		all: {
			path: 'v2/skiffs',
			tokenRequired: false
		},
		byId: {
			path: 'v2/skiffs?ids=$(ids)',
			tokenRequired: false
		}
	},
	skills: {
		path: 'v2/skills?ids=$(ids)',
		tokenRequired: false
	},
	skins: {
		all: {
			path: 'v2/skins',
			tokenRequired: false
		},
		byId: {
			path: 'v2/skins?ids=$(ids)',
			tokenRequired: false
		}
	},
	specializations: {
		all: {
			path: 'v2/specializations',
			tokenRequired: false
		},
		byId: {
			path: 'v2/specializations?ids=$(ids)',
			tokenRequired: false
		}
	},
	stories: {
		all: {
			path: 'v2/stories',
			tokenRequired: false
		},
		byId: {
			path: 'v2/stories?ids=$(ids)',
			tokenRequired: false
		}
	},
	seasons: {
		all: {
			path: 'v2/stories/seasons',
			tokenRequired: false
		},
		byId: {
			path: 'v2/stories/seasons?ids=$(ids)',
			tokenRequired: false
		}
	},
	titles: {
		all: {
			path: 'v2/titles',
			tokenRequired: false
		},
		byId: {
			path: 'v2/titles?ids=$(ids)',
			tokenRequired: false
		}
	},
	tokenInfo: {
		path: 'v2/tokeninfo',
		tokenRequired: true
	},
	traits: {
		all: {
			path: 'v2/traits',
			tokenRequired: false
		},
		byId: {
			path: 'v2/traits?ids=$(ids)',
			tokenRequired: false
		}
	},
	wizardsVault: {
		root: {
			path: 'v2/wizardsvault',
			tokenRequired: false
		},
		listingsAll: {
			path: 'v2/wizardsvault/listings',
			tokenRequired: false
		},
		listingsById: {
			path: 'v2/wizardsvault/listings?ids=$(ids)',
			tokenRequired: false
		},
		objectivesAll: {
			path: 'v2/wizardsvault/objectives',
			tokenRequired: false
		},
		objectivesById: {
			path: 'v2/wizardsvault/objectives?ids=$(ids)',
			tokenRequired: false
		}
	},
	worldBosses: {
		path: 'v2/worldbosses',
		tokenRequired: false
	},
	worlds: {
		all: {
			path: 'v2/worlds',
			tokenRequired: false
		},
		byId: {
			path: 'v2/worlds?ids=$(ids)',
			tokenRequired: false
		}
	},
	wvw: {
		abilities: {
			path: 'v2/wvw/abilities',
			tokenRequired: false
		},
		abilitiesById: {
			path: 'v2/wvw/abilities?ids=$(ids)',
			tokenRequired: false
		},
		matches: {
			path: 'v2/wvw/matches',
			tokenRequired: false
		},
		matchesById: {
			path: 'v2/wvw/matches?ids=$(ids)',
			tokenRequired: false
		},
		matchesByWorld: {
			path: 'v2/wvw/matches/$(type)?world=$(world)',
			tokenRequired: false
		},
		objectives: {
			path: 'v2/wvw/objectives',
			tokenRequired: false
		},
		objectivesById: {
			path: 'v2/wvw/objectives?ids=$(ids)',
			tokenRequired: false
		},
		ranks: {
			path: 'v2/wvw/ranks',
			tokenRequired: false
		},
		ranksById: {
			path: 'v2/wvw/ranks?ids=$(ids)',
			tokenRequired: false
		},
		upgradesById: {
			path: 'v2/wvw/upgrades?ids=$(ids)',
			tokenRequired: false
		},
		upgradesAll: {
			path: 'v2/wvw/upgrades',
			tokenRequired: false
		}
	}
} satisfies Record<string, Endpoint | SubEndpoint | SubSubEndpoint>;
