import { z } from 'zod';

/**
 * /v2/pvp/seasons/:id/leaderboards definition.
 */
export const PvPSeasonLeaderboardsDTO = z.array(
	z.object({
		/** Account name. */
		name: z.string(),
		/** Rank for the given player/guild. */
		rank: z.number(),
		/** Guild id. NOTE: Almost never present. */
		id: z.string().optional(),
		/** (only for guild leaderboard) Name of the team. */
		team: z.string().optional(),
		/** (only for guild leaderboard) Internal team id. */
		team_id: z.number().optional(),
		/** Date at which the rank is reached. */
		date: z.string(),
		/** Array of objects containing the id and values for scorings. */
		scores: z.array(
			z.object({
				/** Id for the scoring parameter. Can be compared to the values obtained from /v2/pvp/seasons/:id in the scorings array. */
				id: z.string(),
				/** Value for the given id. */
				value: z.number()
			})
		)
	})
);

export const PvPSeasonLeaderboardRegionsDTO = z.array(
	/** The region id. */
	z.string()
);
