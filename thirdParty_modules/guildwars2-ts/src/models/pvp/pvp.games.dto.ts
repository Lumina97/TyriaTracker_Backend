import { z } from 'zod';

/**
 * /v2/pvp/games definition.
 */
export const PvPGamesDTO = z.array(
	z.object({
		/** The game's UUID. */
		id: z.string(),
		/** The map the match was played on, cross-referenced from /v2/maps. */
		map_id: z.number(),
		/** A timestamp of when the match started. */
		started: z.string(),
		/** A timestamp of when the match ended. */
		ended: z.string(),
		/** The result of the match. */
		result: z.string(),
		/** The team the player was on during the match. */
		team: z.string(),
		/** The profession the player was playing during the match. */
		profession: z.string(),
		/** The ending scores for each team. */
		scores: z.object({
			/** Red team. */
			red: z.number(),
			/** Blue team. */
			blue: z.number()
		}),
		/** The type of game mode played. */
		rating_type: z.enum(['Ranked', 'Unranked', 'None']),
		/** Change in rating as a result of the observed game. Note that number can be negative in the case of a loss. */
		rating_change: z.number().optional(),
		/** Season id. Can be resolved against /v2/pvp/season. */
		season: z.string().optional()
	})
);
