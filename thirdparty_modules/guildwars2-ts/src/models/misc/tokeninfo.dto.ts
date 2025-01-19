import { z } from 'zod';

/**
 * /v2/tokeninfo definition
 */
export const TokenInfoDTO = z.object({
	/** The first half of the API key that was requested. */
	id: z.string(),
	/** The name given to the API key by the account owner.
	 * NOTE: The value of this field is not escaped and may contain valid HTML, JavaScript, other code. */
	name: z.string(),
	/**
	 * Array of strings describing which permissions the API key has. The array can contain any of:
	 * account - Grants access to the /v2/account endpoint (This permission is required for all API keys).
	 * builds - Grants access to view each character's equipped specializations and gear.
	 * characters - Grants access to the /v2/characters endpoint.
	 * guilds - Grants access to guild info under the /v2/guild/:id/ sub-endpoints.
	 * inventories - Grants access to inventories in the /v2/characters, /v2/account/bank, and /v2/account/materials endpoints.
	 * progression - Grants access to achievements, dungeon unlock status, mastery point assignments, and general PvE progress.
	 * pvp - Grants access to the /v2/pvp sub-endpoints. (i.e. /v2/pvp/games, /v2/pvp/stats)
	 * tradingpost - Grants access to the /v2/commerce/transactions endpoint.
	 * unlocks - Grants access to the /v2/account/skins and /v2/account/dyes endpoints.
	 * wallet - Grants access to the /v2/account/wallet endpoint.
	 */
	permissions: z.array(
		z.enum([
			'account',
			'builds',
			'characters',
			'guilds',
			'inventories',
			'progression',
			'pvp',
			'tradingpost',
			'unlocks',
			'wallet'
		])
	),
	/** The type of the access token given. Either Api key or Subtoken. */
	type: z.string().optional(),
	/** If a subtoken is given, ISO8601 timestamp indicating when the given subtoken expires. */
	expires_at: z.string().optional(),
	/** If a subtoken is given, ISO8601 timestamp indicating when the given subtoken was created. */
	issued_at: z.string().optional(),
	/** If the given subtoken is restricted to a list of URLs, contains an array of strings describing what endpoints are available to this token. */
	urls: z.array(z.string()).optional()
});
