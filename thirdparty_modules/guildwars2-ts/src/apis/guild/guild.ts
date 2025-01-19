import { ApiBase } from '../../base/apiBase';
import {
	GuildDTO,
	GuildLogDTO,
	GuildMembersDTO,
	GuildPermissionsDTO,
	GuildRanksDTO,
	GuildSearchDTO,
	GuildStashDTO,
	GuildStorageDTO,
	GuildTeamsDTO,
	GuildTreasuryDTO,
	GuildUpgradesDTO,
	GuildUpgradesInfoDTO
} from '../../models';
import { endpoints } from '../endpoints';
import { stringArrayType } from '../v2apiUtils';

/**
 * /v2/guild Api
 */
export class GuildApi extends ApiBase {
	/**
	 * Returns core details about a given guild.
	 * The end point will include more or less fields depend on whether an API Key of a Leader or
	 * Member of the Guild with the guilds scope is included in the request.
	 *
	 * @param id - The guild id
	 */
	async get(id: string) {
		return await this.buildRequest<typeof GuildDTO>(endpoints.guild.core, { id }, GuildDTO);
	}

	/**
	 * Returns information about certain events in a guild's log.
	 * The endpoint requires the scope guilds, and will only work if the API key is from the guild leader's account.
	 *
	 * @param id - Unique guild id
	 * @param since - Starting point for the log, by log id
	 */
	async getLog(id: string, since = 0) {
		return await this.buildRequest<typeof GuildLogDTO>(endpoints.guild.log, { id, since }, GuildLogDTO);
	}

	/**
	 * Returns information about the members of a specified guild.
	 * The endpoint requires the scope guilds, and will only work if the API key is from the guild leader's account.
	 *
	 * @param id - Unique guild id
	 */
	async getMembers(id: string) {
		return await this.buildRequest<typeof GuildMembersDTO>(endpoints.guild.members, { id }, GuildMembersDTO);
	}

	/**
	 * Returns information about the ranks of a specified guild.
	 * The endpoint requires the scope guilds, and will only work if the API key is from the guild leader's account.
	 *
	 * @param id - Unique guild id
	 */
	async getRanks(id: string) {
		return await this.buildRequest<typeof GuildRanksDTO>(endpoints.guild.ranks, { id }, GuildRanksDTO);
	}

	/**
	 * Returns information about the items in a guild's vault.
	 * The endpoint requires the scope guilds, and will only work if the API key is from the guild leader's account.
	 *
	 * @param id - Unique guild id
	 */
	async getStash(id: string) {
		return await this.buildRequest<typeof GuildStashDTO>(endpoints.guild.stash, { id }, GuildStashDTO);
	}

	/**
	 * Returns information about the items in a guild's storage.
	 * The endpoint requires the scope guilds, and will only work if the API key is from the guild leader's account.
	 *
	 * @param id - Unique guild id
	 */
	async getStorage(id: string) {
		return await this.buildRequest<typeof GuildStorageDTO>(endpoints.guild.storage, { id }, GuildStorageDTO);
	}

	/**
	 * Returns information about the teams in a guild.
	 * The endpoint requires the scope guilds, and will only work if the API key is from the guild leader's account.
	 *
	 * @param id - Unique guild id
	 */
	async getTeams(id: string) {
		return await this.buildRequest<typeof GuildTeamsDTO>(endpoints.guild.teams, { id }, GuildTeamsDTO);
	}

	/**
	 * Returns information about the items in a guild's treasury.
	 * The endpoint requires the scope guilds, and will only work if the API key is from the guild leader's account.
	 *
	 * @param id - Unique guild id
	 */
	async getTreasury(id: string) {
		return await this.buildRequest<typeof GuildTreasuryDTO>(endpoints.guild.treasury, { id }, GuildTreasuryDTO);
	}

	/**
	 * Returns information about the guild's upgrades.
	 * The endpoint requires the scope guilds, and will only work if the API key is from the guild leader's account.
	 *
	 * @param id - Unique guild id
	 */
	async getUpgrades(id: string) {
		return await this.buildRequest<typeof GuildUpgradesDTO>(endpoints.guild.upgrades, { id }, GuildUpgradesDTO);
	}

	/**
	 * Returns information about all guild permissions.
	 *
	 * @param ids - Permission ids
	 */
	async getPermissions(ids?: string[]) {
		if (ids)
			return await this.buildRequest<typeof GuildPermissionsDTO>(
				endpoints.guild.permissionsById,
				{ ids },
				GuildPermissionsDTO
			);
		return await this.buildRequest<typeof stringArrayType>(endpoints.guild.permissionsAll, {}, stringArrayType);
	}

	/**
	 * Returns information on guild ids to be used for other API queries.
	 *
	 * @param name - Guild name
	 */
	async find(name: string) {
		return await this.buildRequest<typeof GuildSearchDTO>(endpoints.guild.search, { name }, GuildSearchDTO);
	}

	/**
	 * Returns information about all available Guild Hall upgrades, including scribe decorations.
	 *
	 * @param ids - Guild upgrade ids
	 */
	async upgradeInfo(ids: number[]) {
		return await this.buildRequest<typeof GuildUpgradesInfoDTO>(
			endpoints.guild.upgradesInfo,
			{ ids },
			GuildUpgradesInfoDTO
		);
	}
}
