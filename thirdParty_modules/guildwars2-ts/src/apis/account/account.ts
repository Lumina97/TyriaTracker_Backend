import { ApiBase } from '../../base/apiBase';
import {
	AccountAchievementsDTO,
	AccountBankDTO,
	AccountBuildStorageDTO,
	AccountDTO,
	AccountDailyCraftingDTO,
	AccountDungeonsDTO,
	AccountDyesDTO,
	AccountEmotesDTO,
	AccountFinishersDTO,
	AccountGlidersDTO,
	AccountHomeCatsDTO,
	AccountHomeNodesDTO,
	AccountHomesteadDecorationsDTO,
	AccountHomesteadGlyphsDTO,
	AccountInventoryDTO,
	AccountJadebotsDTO,
	AccountLegendaryArmoryDTO,
	AccountLuckDTO,
	AccountMailCarriersDTO,
	AccountMapChestsDTO,
	AccountMasteriesDTO,
	AccountMasteryPointsDTO,
	AccountMaterialsDTO,
	AccountMinisDTO,
	AccountMountSkinsDTO,
	AccountMountTypesDTO,
	AccountNoveltiesDTO,
	AccountOutfitsDTO,
	AccountProgressionDTO,
	AccountPvpHeroesDTO,
	AccountRaidsDTO,
	AccountRecipesDTO,
	AccountSkiffsDTO,
	AccountSkinsDTO,
	AccountTitlesDTO,
	AccountWalletDTO,
	AccountWizardsVaultDailyDTO,
	AccountWizardsVaultListingsDTO,
	AccountWizardsVaultSpecialDTO,
	AccountWizardsVaultWeeklyDTO,
	AccountWorldBossesDTO
} from '../../models';
import { endpoints } from '../endpoints';

/**
 * /v2/account Api
 */
export class AccountApi extends ApiBase {
	/**
	 * Returns information about player accounts.
	 */
	async get() {
		return await this.buildRequest<typeof AccountDTO>(endpoints.account.base, {}, AccountDTO);
	}

	/**
	 * Returns an account's progress towards all their achievements.
	 */
	async getAchievements() {
		return await this.buildRequest<typeof AccountAchievementsDTO>(
			endpoints.account.achievements,
			{},
			AccountAchievementsDTO
		);
	}

	/**
	 * Returns the items stored in a player's vault (not including material storage).
	 * If null, the slot is empty.
	 */
	async getBank() {
		return await this.buildRequest<typeof AccountBankDTO>(endpoints.account.bank, {}, AccountBankDTO);
	}

	/**
	 * Returns the templates stored in a player's build storage.
	 */
	async getBuildStorage() {
		return await this.buildRequest<typeof AccountBuildStorageDTO>(
			endpoints.account.buildStorage,
			{},
			AccountBuildStorageDTO
		);
	}

	/**
	 * Returns information about time-gated recipes that have been crafted by the account since daily-reset.
	 */
	async getDailyCrafts() {
		return await this.buildRequest<typeof AccountDailyCraftingDTO>(
			endpoints.account.dailyCrafting,
			{},
			AccountDailyCraftingDTO
		);
	}

	/**
	 * Returns the dungeons completed since daily dungeon reset.
	 */
	async getDungeons() {
		return await this.buildRequest<typeof AccountDungeonsDTO>(endpoints.account.dungeons, {}, AccountDungeonsDTO);
	}

	/**
	 * Returns the unlocked dyes of the account.
	 */
	async getDyes() {
		return await this.buildRequest<typeof AccountDyesDTO>(endpoints.account.dyes, {}, AccountDyesDTO);
	}

	/**
	 * Returns the player's unlocked emotes.
	 */
	async getEmotes() {
		return await this.buildRequest<typeof AccountEmotesDTO>(endpoints.account.emotes, {}, AccountEmotesDTO);
	}

	/**
	 * Returns information about finishers that are unlocked for an account.
	 */
	async getFinishers() {
		return await this.buildRequest<typeof AccountFinishersDTO>(
			endpoints.account.finishers,
			{},
			AccountFinishersDTO
		);
	}

	/**
	 * Returns information about gliders that are unlocked for an account.
	 */
	async getGliders() {
		return await this.buildRequest<typeof AccountGlidersDTO>(endpoints.account.gliders, {}, AccountGlidersDTO);
	}

	/**
	 * Returns information about unlocked home instance nodes.
	 */
	async getHomeNodes() {
		return await this.buildRequest<typeof AccountHomeNodesDTO>(
			endpoints.account.homeNodes,
			{},
			AccountHomeNodesDTO
		);
	}

	/**
	 * Returns information about unlocked home instance cats.
	 */
	async getHomeCats() {
		return await this.buildRequest<typeof AccountHomeCatsDTO>(endpoints.account.homeCats, {}, AccountHomeCatsDTO);
	}

	/**
	 * Returns information about unlocked homestead decorations.
	 */
	async getHomesteadDecorations() {
		return await this.buildRequest<typeof AccountHomesteadDecorationsDTO>(
			endpoints.account.homesteadDecorations,
			{},
			AccountHomesteadDecorationsDTO
		);
	}

	/**
	 * Returns information about glyphs stored in homestead collection boxes.
	 */
	async getHomesteadGlyphs() {
		return await this.buildRequest<typeof AccountHomesteadGlyphsDTO>(
			endpoints.account.homesteadGlyphs,
			{},
			AccountHomesteadGlyphsDTO
		);
	}

	/**
	 * Returns the shared inventory slots in an account.
	 * If null, the slot is empty
	 */
	async getInventory() {
		return await this.buildRequest<typeof AccountInventoryDTO>(
			endpoints.account.inventory,
			{},
			AccountInventoryDTO
		);
	}

	/**
	 * Returns the unlocked Jade Bot skins of the account.
	 */
	async getJadebots() {
		return await this.buildRequest<typeof AccountJadebotsDTO>(endpoints.account.jadebots, {}, AccountJadebotsDTO);
	}

	/**
	 * Returns information about the Legendary Armory items that are unlocked for an account.
	 */
	async getLegendaryArmory() {
		return await this.buildRequest<typeof AccountLegendaryArmoryDTO>(
			endpoints.account.legendaryArmory,
			{},
			AccountLegendaryArmoryDTO
		);
	}

	/**
	 * Returns the total amount of luck consumed on an account.
	 */
	async getLuck() {
		return await this.buildRequest<typeof AccountLuckDTO>(endpoints.account.luck, {}, AccountLuckDTO);
	}

	/**
	 * Returns information about mail carriers that are unlocked for an account.
	 */
	async getMailCarriers() {
		return await this.buildRequest<typeof AccountMailCarriersDTO>(
			endpoints.account.mailCarriers,
			{},
			AccountMailCarriersDTO
		);
	}

	/**
	 * Returns information about Hero's Choice Chests acquired by the account since daily-reset.
	 */
	async getMapChests() {
		return await this.buildRequest<typeof AccountMapChestsDTO>(
			endpoints.account.mapChests,
			{},
			AccountMapChestsDTO
		);
	}

	/**
	 * Returns information about masteries that are unlocked for an account.
	 * A tallied up total of the account's mastery points can be found at /v2/account/mastery/points.
	 */
	async getMasteries() {
		return await this.buildRequest<typeof AccountMasteriesDTO>(
			endpoints.account.masteries,
			{},
			AccountMasteriesDTO
		);
	}

	/**
	 * Returns information about the total amount of mastery points that are unlocked for an account.
	 * A detailed mastery track completion break down is available at /v2/account/masteries.
	 */
	async getMasteryPoints() {
		return await this.buildRequest<typeof AccountMasteryPointsDTO>(
			endpoints.account.masteryPoints,
			{},
			AccountMasteryPointsDTO
		);
	}

	/**
	 * Returns the materials stored in a player's vault.
	 */
	async getMaterials() {
		return await this.buildRequest<typeof AccountMaterialsDTO>(
			endpoints.account.materials,
			{},
			AccountMaterialsDTO
		);
	}

	/**
	 * Returns the unlocked miniatures of the account.
	 */
	async getMinis() {
		return await this.buildRequest<typeof AccountMinisDTO>(endpoints.account.minis, {}, AccountMinisDTO);
	}

	/**
	 * Returns the unlocked mount skins of the account.
	 */
	async getMountSkins() {
		return await this.buildRequest<typeof AccountMountSkinsDTO>(
			endpoints.account.mountsSkins,
			{},
			AccountMountSkinsDTO
		);
	}

	/**
	 * Returns the unlocked mounts of the account.
	 */
	async getMountTypes() {
		return await this.buildRequest<typeof AccountMountTypesDTO>(
			endpoints.account.mountsTypes,
			{},
			AccountMountTypesDTO
		);
	}

	/**
	 * Returns information about novelties that are unlocked for an account.
	 */
	async getNovelties() {
		return await this.buildRequest<typeof AccountNoveltiesDTO>(
			endpoints.account.novelties,
			{},
			AccountNoveltiesDTO
		);
	}

	/**
	 * Returns information about outfits that are unlocked for an account.
	 */
	async getOutfits() {
		return await this.buildRequest<typeof AccountOutfitsDTO>(endpoints.account.outfits, {}, AccountOutfitsDTO);
	}

	/**
	 * Returns account-wide progression for Fractals's Account Augmentation and Luck.
	 */
	async getProgression() {
		return await this.buildRequest<typeof AccountProgressionDTO>(
			endpoints.account.progression,
			{},
			AccountProgressionDTO
		);
	}

	/**
	 * Returns information about pvp heroes that are unlocked for an account.
	 */
	async getPvpHeroes() {
		return await this.buildRequest<typeof AccountPvpHeroesDTO>(
			endpoints.account.pvpHeroes,
			{},
			AccountPvpHeroesDTO
		);
	}

	/**
	 * Returns the completed raid encounters since weekly raid reset.
	 */
	async getRaids() {
		return await this.buildRequest<typeof AccountRaidsDTO>(endpoints.account.raids, {}, AccountRaidsDTO);
	}

	/**
	 * Returns information about recipes that are unlocked for an account.
	 */
	async getRecipes() {
		return await this.buildRequest<typeof AccountRecipesDTO>(endpoints.account.recipes, {}, AccountRecipesDTO);
	}

	/**
	 * Returns the unlocked Skiff skins of the account.
	 */
	async getSkiffs() {
		return await this.buildRequest<typeof AccountSkiffsDTO>(endpoints.account.skiffs, {}, AccountSkiffsDTO);
	}

	/**
	 * Returns the unlocked skins of the account.
	 */
	async getSkins() {
		return await this.buildRequest<typeof AccountSkinsDTO>(endpoints.account.skins, {}, AccountSkinsDTO);
	}

	/**
	 * Returns information about titles that are unlocked for an account.
	 */
	async getTitles() {
		return await this.buildRequest<typeof AccountTitlesDTO>(endpoints.account.titles, {}, AccountTitlesDTO);
	}

	/**
	 * Returns the currencies of the account
	 */
	async getWallet() {
		return await this.buildRequest<typeof AccountWalletDTO>(endpoints.account.wallet, {}, AccountWalletDTO);
	}

	/**
	 * Returns the current set of daily Wizard's Vault achievements for the account.
	 */
	async getWizardsVaultDaily() {
		return await this.buildRequest<typeof AccountWizardsVaultDailyDTO>(
			endpoints.account.wizardsVaultDaily,
			{},
			AccountWizardsVaultDailyDTO
		);
	}

	/**
	 * Returns the current set of Wizard's Vault rewards, along with details about which have already been purchased by the account, and in what quantity.
	 */
	async getWizardsVaultListings() {
		return await this.buildRequest<typeof AccountWizardsVaultListingsDTO>(
			endpoints.account.wizardsVaultListings,
			{},
			AccountWizardsVaultListingsDTO
		);
	}

	/**
	 * Returns the current set of special Wizard's Vault achievements for the account.
	 */
	async getWizardsVaultSpecial() {
		return await this.buildRequest<typeof AccountWizardsVaultSpecialDTO>(
			endpoints.account.wizardsVaultSpecial,
			{},
			AccountWizardsVaultSpecialDTO
		);
	}

	/**
	 * Returns the current set of weekly Wizard's Vault achievements for the account.
	 */
	async getWizardsVaultWeekly() {
		return await this.buildRequest<typeof AccountWizardsVaultWeeklyDTO>(
			endpoints.account.wizardsVaultWeekly,
			{},
			AccountWizardsVaultWeeklyDTO
		);
	}

	/**
	 * Returns information about which world bosses have been killed by the account since daily-reset.
	 */
	async getWorldBosses() {
		return await this.buildRequest<typeof AccountWorldBossesDTO>(
			endpoints.account.worldBosses,
			{},
			AccountWorldBossesDTO
		);
	}
}
