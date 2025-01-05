import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import {
	WvWAbilitiesDTO,
	WvWMatchesDTO,
	WvWMatchesOverviewDTO,
	WvWMatchesScoresDTO,
	WvWMatchesStatsDTO,
	WvWObjectivesDTO,
	WvWRanksDTO,
	WvWUpgradesDTO
} from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType, stringArrayType } from '../v2apiUtils';

/**
 * /v2/wvw Api
 */
export class WorldVsWorldApi extends ApiBase {
	/**
	 * Returns information about the available abilities in the World versus World game mode.
	 */
	async getAbilities(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns information about the available abilities in the World versus World game mode.
	 *
	 * @param ids - List of WvW ability ids
	 */
	async getAbilities(ids: number[] | 'all'): Promise<z.infer<typeof WvWAbilitiesDTO>>;
	async getAbilities(ids?: number[] | 'all') {
		if (ids)
			return await this.buildRequest<typeof WvWAbilitiesDTO>(
				endpoints.wvw.abilitiesById,
				{ ids },
				WvWAbilitiesDTO
			);
		return await this.buildRequest<typeof numberArrayType>(endpoints.wvw.abilities, {}, numberArrayType);
	}

	/**
	 * Returns further details about the specified match, including the total score, kills and deaths, and further details for each map.
	 */
	async getMatches(): Promise<z.infer<typeof stringArrayType>>;
	/**
	 * Returns further details about the specified match, including the total score, kills and deaths, and further details for each map.
	 *
	 * @param ids - List of match ids, or "all"
	 */
	async getMatches(ids: Array<`${number}-${number}`> | 'all'): Promise<z.infer<typeof WvWMatchesDTO>>;
	async getMatches(ids?: Array<`${number}-${number}`> | 'all') {
		if (ids) {
			return await this.buildRequest<typeof WvWMatchesDTO>(endpoints.wvw.matchesById, { ids }, WvWMatchesDTO);
		}
		return await this.buildRequest<typeof stringArrayType>(endpoints.wvw.matches, {}, stringArrayType);
	}

	/**
	 * Returns further details about the specified match, including the total score, kills and deaths, and further details for each map.
	 * The same information as {@link WorldVsWorldApi#getMatches}, however more limited.
	 *
	 * @param type - Overview, Scores, or Stats for the matches
	 * @param world - World id
	 */
	async getMatchesByWorld(type: 'overview' | 'scores' | 'stats', world: number) {
		if (type === 'overview') {
			return await this.buildRequest<typeof WvWMatchesOverviewDTO>(
				endpoints.wvw.matchesByWorld,
				{
					type,
					world
				},
				WvWMatchesOverviewDTO
			);
		}
		if (type === 'scores') {
			return await this.buildRequest<typeof WvWMatchesScoresDTO>(
				endpoints.wvw.matchesByWorld,
				{
					type,
					world
				},
				WvWMatchesScoresDTO
			);
		}
		return await this.buildRequest<typeof WvWMatchesStatsDTO>(
			endpoints.wvw.matchesByWorld,
			{
				type,
				world
			},
			WvWMatchesStatsDTO
		);
	}

	/**
	 * Returns details about World vs. World objectives such as camps, towers, and keeps.
	 */
	async getObjectives(): Promise<z.infer<typeof stringArrayType>>;
	/**
	 * Returns details about World vs. World objectives such as camps, towers, and keeps.
	 *
	 * @param ids - Objective ids, or "all"
	 */
	async getObjectives(ids: Array<`${number}-${number}`>): Promise<z.infer<typeof WvWObjectivesDTO>>;
	async getObjectives(ids?: Array<`${number}-${number}`>) {
		if (ids)
			return await this.buildRequest<typeof WvWObjectivesDTO>(
				endpoints.wvw.objectivesById,
				{ ids },
				WvWObjectivesDTO
			);
		return await this.buildRequest<typeof stringArrayType>(endpoints.wvw.objectives, {}, stringArrayType);
	}

	/**
	 * Returns information about the available ranks in the World versus World game mode.
	 */
	async getRanks(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns information about the available ranks in the World versus World game mode.
	 *
	 * @param ids - List of WvW rank ids, or "all"
	 */
	async getRanks(ids: number[] | 'all'): Promise<z.infer<typeof WvWRanksDTO>>;
	async getRanks(ids?: number[] | 'all') {
		if (ids) return await this.buildRequest<typeof WvWRanksDTO>(endpoints.wvw.ranksById, { ids }, WvWRanksDTO);
		return await this.buildRequest<typeof numberArrayType>(endpoints.wvw.ranks, {}, numberArrayType);
	}

	/**
	 * Returns details about available World vs. World upgrades for objectives such as camps, towers, and keeps.
	 */
	async getUpgrades(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns details about available World vs. World upgrades for objectives such as camps, towers, and keeps.
	 *
	 * @param ids - List of WvW upgrades, or "all"
	 */
	async getUpgrades(ids: number[] | 'all'): Promise<z.infer<typeof WvWUpgradesDTO>>;
	async getUpgrades(ids?: number[] | 'all') {
		if (ids)
			return await this.buildRequest<typeof WvWUpgradesDTO>(endpoints.wvw.upgradesById, { ids }, WvWUpgradesDTO);
		return await this.buildRequest<typeof numberArrayType>(endpoints.wvw.upgradesAll, {}, numberArrayType);
	}
}
