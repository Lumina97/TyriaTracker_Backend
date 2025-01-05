import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import {
	PvPAmuletsDTO,
	PvPGamesDTO,
	PvPHeroesDTO,
	PvPRanksDTO,
	PvPSeasonDTO,
	PvPSeasonLeaderboardRegionsDTO,
	PvPSeasonLeaderboardsDTO,
	PvPStandingsDTO,
	PvPStatsDTO
} from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType, stringArrayType } from '../v2apiUtils';

/**
 * /v2/pvp Api
 */
export class PvPApi extends ApiBase {
	/**
	 * Returns information about the PvP amulets that are in the game.
	 */
	async getAmulets(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns information about the PvP amulets that are in the game.
	 *
	 * @param ids - List of amulet ids, or "all"
	 */
	async getAmulets(ids: number[] | 'all'): Promise<z.infer<typeof PvPAmuletsDTO>>;
	async getAmulets(ids?: number[] | 'all') {
		if (ids)
			return await this.buildRequest<typeof PvPAmuletsDTO>(endpoints.pvp.amuletsById, { ids }, PvPAmuletsDTO);
		return await this.buildRequest<typeof numberArrayType>(endpoints.pvp.amuletsAll, {}, numberArrayType);
	}

	/**
	 * Returns information about past PvP matches the player has participated in.
	 */
	async getGames(): Promise<z.infer<typeof stringArrayType>>;
	/**
	 * Returns information about past PvP matches the player has participated in.
	 *
	 * @param ids - List of game ids, or "all"
	 */
	async getGames(ids: string[] | 'all'): Promise<z.infer<typeof PvPGamesDTO>>;
	async getGames(ids?: string[] | 'all') {
		if (ids) return await this.buildRequest<typeof PvPGamesDTO>(endpoints.pvp.gamesById, { ids }, PvPGamesDTO);
		return await this.buildRequest<typeof stringArrayType>(endpoints.pvp.gamesAll, {}, stringArrayType);
	}

	/**
	 * Returns information about pvp heroes that are available in-game.
	 */
	async getHeroes(): Promise<z.infer<typeof stringArrayType>>;
	/**
	 * Returns information about pvp heroes that are available in-game.
	 *
	 * @param ids - List of hero ids, or "all"
	 */
	async getHeroes(ids: string[] | 'all'): Promise<z.infer<typeof PvPHeroesDTO>>;
	async getHeroes(ids?: string[] | 'all') {
		if (ids) return await this.buildRequest<typeof PvPHeroesDTO>(endpoints.pvp.heroesById, { ids }, PvPHeroesDTO);
		return await this.buildRequest<typeof stringArrayType>(endpoints.pvp.heroesAll, {}, stringArrayType);
	}

	/**
	 * Returns information about the available ranks in the Player versus Player game mode.
	 */
	async getRanks(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns information about the available ranks in the Player versus Player game mode.
	 *
	 * @param ids - List of rank ids, or "all"
	 */
	async getRanks(ids: number[] | 'all'): Promise<z.infer<typeof PvPRanksDTO>>;
	async getRanks(ids?: number[] | 'all') {
		if (ids) return await this.buildRequest<typeof PvPRanksDTO>(endpoints.pvp.ranksById, { ids }, PvPRanksDTO);
		return await this.buildRequest<typeof numberArrayType>(endpoints.pvp.ranksAll, {}, numberArrayType);
	}

	/**
	 * Returns information about League seasons.
	 */
	async getSeasons(): Promise<z.infer<typeof stringArrayType>>;
	/**
	 * Returns information about League seasons.
	 *
	 * @param ids - Season ids, or "all"
	 */
	async getSeasons(ids: string[] | 'all'): Promise<z.infer<typeof PvPSeasonDTO>>;
	async getSeasons(ids?: string[] | 'all') {
		if (ids) return await this.buildRequest<typeof PvPSeasonDTO>(endpoints.pvp.seasonsById, { ids }, PvPSeasonDTO);
		return await this.buildRequest<typeof stringArrayType>(endpoints.pvp.seasonsAll, {}, stringArrayType);
	}

	/**
	 * Returns information about League season leaderboards for either NA or EU.
	 *
	 * @param id - PvP season id
	 */
	async getLeaderboards(id: string): Promise<z.infer<typeof PvPSeasonLeaderboardRegionsDTO>>;
	/**
	 * Returns information about League season leaderboards for either NA or EU.
	 *
	 * @param id - PvP season id
	 * @param region - EU or NA region
	 * @param type - For season 1-4, legendary or guild type. For season 5+, "ladder"
	 */
	async getLeaderboards(
		id: string,
		region: 'na' | 'eu',
		type: 'legendary' | 'guild' | 'ladder'
	): Promise<z.infer<typeof PvPSeasonLeaderboardsDTO>>;
	async getLeaderboards(id: string, region?: 'na' | 'eu', type?: 'legendary' | 'guild' | 'ladder') {
		if (type && region)
			return await this.buildRequest<typeof PvPSeasonLeaderboardsDTO>(
				endpoints.pvp.leaderboards,
				{ id, type, region },
				PvPSeasonLeaderboardsDTO
			);
		return await this.buildRequest<typeof PvPSeasonLeaderboardRegionsDTO>(
			endpoints.pvp.leaderboardsNoType,
			{ id },
			PvPSeasonLeaderboardRegionsDTO
		);
	}

	/**
	 * Returns information about player pips.
	 */
	async getStandings() {
		return await this.buildRequest<typeof PvPStandingsDTO>(endpoints.pvp.standings, {}, PvPStandingsDTO);
	}

	/**
	 * Resource returns information about wins and losses in the account's PvP matches.
	 */
	async getStats() {
		return await this.buildRequest<typeof PvPStatsDTO>(endpoints.pvp.stats, {}, PvPStatsDTO);
	}
}
