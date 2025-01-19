import {
	AccountApi,
	AchievementsApi,
	BackstoryApi,
	BuildApi,
	CharactersApi,
	ColorsApi,
	CommerceApi,
	ContinentsApi,
	CurrenciesApi,
	DailyCraftingApi,
	DungeonsApi,
	EmblemApi,
	EmotesApi,
	FilesApi,
	FinishersApi,
	GlidersApi,
	GuildApi,
	HomeApi,
	HomesteadApi,
	ItemStatsApi,
	ItemsApi,
	JadebotsApi,
	LegendaryArmoryApi,
	LegendsApi,
	MailCarriersApi,
	MapChestsApi,
	MapsApi,
	MasteriesApi,
	MaterialsApi,
	MinisApi,
	MountsApi,
	NoveltiesApi,
	OutfitsApi,
	PetsApi,
	ProfessionsApi,
	PvPApi,
	QuaggansApi,
	QuestsApi,
	RacesApi,
	RaidsApi,
	RecipesApi,
	SkiffsApi,
	SkillsApi,
	SkinsApi,
	SpecializationsApi,
	StoriesApi,
	SubtokenApi,
	TitlesApi,
	TokenInfoApi,
	TraitsApi,
	WizardsVaultApi,
	WorldBossesApi,
	WorldVsWorldApi,
	WorldsApi
} from './apis';
import { ApiBase } from './base/apiBase';

/**
 * Entrypoint for the API
 */
export class GW2Api extends ApiBase {
	/** /v2/account Api */
	readonly account = new AccountApi(this.getParams());

	/** /v2/achievements Api */
	readonly achievements = new AchievementsApi(this.getParams());

	/** /v2/backstory Api */
	readonly backstory = new BackstoryApi(this.getParams());

	/** /v2/build Api */
	readonly build = new BuildApi(this.getParams());

	/** /v2/characters Api */
	readonly characters = new CharactersApi(this.getParams());

	/** /v2/colors Api */
	readonly colors = new ColorsApi(this.getParams());

	/** /v2/commerce Api */
	readonly commerce = new CommerceApi(this.getParams());

	/** /v2/continents Api */
	readonly continents = new ContinentsApi(this.getParams());

	/** /v2/currencies Api */
	readonly currencies = new CurrenciesApi(this.getParams());

	/** /v2/dailycrafting Api */
	readonly dailyCrafting = new DailyCraftingApi(this.getParams());

	/** /v2/dungeons Api */
	readonly dungeons = new DungeonsApi(this.getParams());

	/** /v2/emblem Api */
	readonly emblem = new EmblemApi(this.getParams());

	/** /v2/emotes Api */
	readonly emotes = new EmotesApi(this.getParams());

	/** /v2/files Api */
	readonly files = new FilesApi(this.getParams());

	/** /v2/finishers Api */
	readonly finishers = new FinishersApi(this.getParams());

	/** /v2/gliders Api */
	readonly gliders = new GlidersApi(this.getParams());

	/** /v2/guild Api */
	readonly guild = new GuildApi(this.getParams());

	/** /v2/home Api */
	readonly home = new HomeApi(this.getParams());

	/** /v2/homestead Api */
	readonly homestead = new HomesteadApi(this.getParams());

	/** /v2/items Api */
	readonly items = new ItemsApi(this.getParams());

	/** /v2/itemstats Api */
	readonly itemstats = new ItemStatsApi(this.getParams());

	/** /v2/jadebots Api */
	readonly jadebots = new JadebotsApi(this.getParams());

	/** /v2/legendaryarmory Api */
	readonly legendaryArmory = new LegendaryArmoryApi(this.getParams());

	/** /v2/legends Api */
	readonly legends = new LegendsApi(this.getParams());

	/** /v2/mailcarriers Api */
	readonly mailCarriers = new MailCarriersApi(this.getParams());

	/** /v2/mapchests Api */
	readonly mapChests = new MapChestsApi(this.getParams());

	/** /v2/maps Api */
	readonly maps = new MapsApi(this.getParams());

	/** /v2/masteries Api */
	readonly masteries = new MasteriesApi(this.getParams());

	/** /v2/materials Api */
	readonly materials = new MaterialsApi(this.getParams());

	/** /v2/minis Api */
	readonly minis = new MinisApi(this.getParams());

	/** /v2/mounts Api */
	readonly mounts = new MountsApi(this.getParams());

	/** /v2/novelties Api */
	readonly novelties = new NoveltiesApi(this.getParams());

	/** /v2/outfits Api */
	readonly outfits = new OutfitsApi(this.getParams());

	/** /v2/pets Api */
	readonly pets = new PetsApi(this.getParams());

	/** /v2/professions Api */
	readonly professions = new ProfessionsApi(this.getParams());

	/** /v2/pvp Api */
	readonly pvp = new PvPApi(this.getParams());

	/** /v2/quaggans Api */
	readonly quaggans = new QuaggansApi(this.getParams());

	/** /v2/quests Api */
	readonly quests = new QuestsApi(this.getParams());

	/** /v2/races Api */
	readonly races = new RacesApi(this.getParams());

	/** /v2/raids Api */
	readonly raids = new RaidsApi(this.getParams());

	/** /v2/recipes Api */
	readonly recipes = new RecipesApi(this.getParams());

	/** /v2/skiffs Api */
	readonly skiffs = new SkiffsApi(this.getParams());

	/** /v2/skills Api */
	readonly skills = new SkillsApi(this.getParams());

	/** /v2/skins Api */
	readonly skins = new SkinsApi(this.getParams());

	/** /v2/specializations Api */
	readonly specializations = new SpecializationsApi(this.getParams());

	/** /v2/stories Api */
	readonly stories = new StoriesApi(this.getParams());

	/** /v2/subtoken Api */
	readonly subtoken = new SubtokenApi(this.getParams());

	/** /v2/titles Api */
	readonly titles = new TitlesApi(this.getParams());

	/** /v2/tokeninfo Api */
	readonly tokenInfo = new TokenInfoApi(this.getParams());

	/** /v2/traits Api */
	readonly traits = new TraitsApi(this.getParams());

	/** /v2/wizardsvault Api */
	readonly wizardsVault = new WizardsVaultApi(this.getParams());

	/** /v2/worldbosses Api */
	readonly worldBosses = new WorldBossesApi(this.getParams());

	/** /v2/worlds Api */
	readonly worlds = new WorldsApi(this.getParams());

	/** /v2/wvw Api */
	readonly wvw = new WorldVsWorldApi(this.getParams());
}
