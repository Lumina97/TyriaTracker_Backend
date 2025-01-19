import { ApiBase } from '../../base/apiBase';
import { logger } from '../../base/logger';
import {
	CharacterBackstoryDTO,
	CharacterBuildTabsDTO,
	CharacterCoreDTO,
	CharacterCraftingDTO,
	CharacterEquipmentDTO,
	CharacterEquipmentTabDTO,
	CharacterEquipmentTabsDTO,
	CharacterHeroPointsDTO,
	CharacterInventoryDTO,
	CharacterQuestsDTO,
	CharacterRecipesDTO,
	CharacterSkillsDTO,
	CharacterSpecializationsDTO,
	CharacterSuperAdventureBoxDTO,
	CharacterTrainingDTO,
	CharactersDTO
} from '../../models';
import { endpoints } from '../endpoints';

/**
 * /v2/characters Api
 */
export class CharactersApi extends ApiBase {
	/**
	 * Returns information about characters attached to a specific account.
	 */
	async get() {
		return await this.buildRequest<typeof CharactersDTO>(endpoints.characters.base, {}, CharactersDTO);
	}

	/**
	 * Returns information about the backstory of a character attached to a specific account.
	 *
	 * @param id - Character name
	 */
	async getBackstory(id: string) {
		return await this.buildRequest<typeof CharacterBackstoryDTO>(
			endpoints.characters.backstory,
			{ id },
			CharacterBackstoryDTO
		);
	}

	/**
	 * Returns information about the build template tabs of a character.
	 *
	 * @param id - Character name
	 * @param tabs - Optional tab index. If the index is invalid, all tabs will be returned
	 */
	async getBuildTabs(id: string, tabs: number[] | 'all' = 'all') {
		if (Array.isArray(tabs)) {
			for (const tab of tabs) {
				if (tab < 1 || tab > 9) {
					logger.warn('Build tab ids must be between 1 and 9. Returning all tabs');
					tabs = 'all';
				}
			}
		}
		return await this.buildRequest<typeof CharacterBuildTabsDTO>(
			endpoints.characters.buildTabs,
			{
				id,
				tabs
			},
			CharacterBuildTabsDTO
		);
	}

	/**
	 * Returns core information about a character attached to a specific account.
	 *
	 * @param id - Character name
	 */
	async getCore(id: string) {
		return await this.buildRequest<typeof CharacterCoreDTO>(endpoints.characters.core, { id }, CharacterCoreDTO);
	}

	/**
	 * Returns information about the crafting disciplines available to a character attached to a specific account.
	 *
	 * @param id - Character name
	 */
	async getCrafting(id: string) {
		return await this.buildRequest<typeof CharacterCraftingDTO>(
			endpoints.characters.crafting,
			{ id },
			CharacterCraftingDTO
		);
	}

	/**
	 * Returns equipment of a character attached to a specific account.
	 *
	 * @param id - Character name
	 */
	async getEquipment(id: string) {
		return await this.buildRequest<typeof CharacterEquipmentDTO>(
			endpoints.characters.equipment,
			{ id },
			CharacterEquipmentDTO
		);
	}

	/**
	 * Returns information about an accounts equipment template tabs.
	 *
	 * @param id - Character name
	 * @param tabs - Optional equipment tab number.
	 */
	async getEquipmentTabs(id: string, tabs: number[] | 'all' = 'all') {
		if (Array.isArray(tabs)) {
			for (const tab of tabs) {
				if (tab < 1 || tab > 9) {
					logger.warn('Equipment tab ids must be between 1 and 9. Returning all tabs.');
					tabs = 'all';
				}
			}
		}
		return await this.buildRequest<typeof CharacterEquipmentTabsDTO>(
			endpoints.characters.equipmentTabsById,
			{
				id,
				tabs
			},
			CharacterEquipmentTabsDTO
		);
	}

	/**
	 * Returns the active equipment tab of a character attached to a specific account.
	 *
	 * @param id - Character name
	 */
	async getActiveEquipmentTab(id: string) {
		return await this.buildRequest<typeof CharacterEquipmentTabDTO>(
			endpoints.characters.equipmentTabActive,
			{ id },
			CharacterEquipmentTabDTO
		);
	}

	/**
	 * Returns information about the hero points obtained by a character attached to a specific account.
	 * NOTE: This api does not currently return a lot of hero point values.
	 * Check the list here for details https://wiki.guildwars2.com/wiki/API:2/characters/:id/heropoints#Notes
	 *
	 * @param id - Character name
	 */
	async getHeroPoints(id: string) {
		return await this.buildRequest<typeof CharacterHeroPointsDTO>(
			endpoints.characters.heroPoints,
			{ id },
			CharacterHeroPointsDTO
		);
	}

	/**
	 * Returns inventory of a character attached to a specific account.
	 *
	 * @param id - Character name
	 */
	async getInventory(id: string) {
		return await this.buildRequest<typeof CharacterInventoryDTO>(
			endpoints.characters.inventory,
			{ id },
			CharacterInventoryDTO
		);
	}

	/**
	 * Returns information about the quests selected that by a character attached to a specific account.
	 *
	 * @param id - Character name
	 */
	async getQuests(id: string) {
		return await this.buildRequest<typeof CharacterQuestsDTO>(
			endpoints.characters.quests,
			{ id },
			CharacterQuestsDTO
		);
	}

	/**
	 * Returns information about recipes that the given character can use.
	 *
	 * @param id - Character name
	 */
	async getRecipes(id: string) {
		return await this.buildRequest<typeof CharacterRecipesDTO>(
			endpoints.characters.recipes,
			{ id },
			CharacterRecipesDTO
		);
	}

	/**
	 * Returns information about Super Adventure Box on a character attached to a specific account.
	 *
	 * @param id - Character name
	 */
	async getSAB(id: string) {
		return await this.buildRequest<typeof CharacterSuperAdventureBoxDTO>(
			endpoints.characters.sab,
			{ id },
			CharacterSuperAdventureBoxDTO
		);
	}

	/**
	 * Returns information about the skills equipped on a character attached to a specific account.
	 *
	 * @param id - Character name
	 */
	async getSkills(id: string) {
		return await this.buildRequest<typeof CharacterSkillsDTO>(
			endpoints.characters.skills,
			{ id },
			CharacterSkillsDTO
		);
	}

	/**
	 * Returns information about the specializations equipped on a character attached to a specific account.
	 *
	 * @param id - Character name
	 */
	async getSpecializations(id: string) {
		return await this.buildRequest<typeof CharacterSpecializationsDTO>(
			endpoints.characters.specializations,
			{
				id
			},
			CharacterSpecializationsDTO
		);
	}

	/**
	 * Returns information about the training of a character attached to a specific account.
	 *
	 * @param id - Character name
	 */
	async getTraining(id: string) {
		return await this.buildRequest<typeof CharacterTrainingDTO>(
			endpoints.characters.training,
			{ id },
			CharacterTrainingDTO
		);
	}
}
