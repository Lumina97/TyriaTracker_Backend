import { z } from 'zod';

const WinLoss = z.object({
	/** The wins for the category. */
	wins: z.number(),
	/** The losses for the category. */
	losses: z.number(),
	/** The desertions for the category. */
	desertions: z.number(),
	/** The byes for the category. */
	byes: z.number(),
	/** The forfeit for the category. */
	forfeits: z.number()
});

/**
 * /v2/pvp/stats definition.
 */
export const PvPStatsDTO = z.object({
	/** The player's PvP rank. */
	pvp_rank: z.number(),
	/** The player's PvP rank points. */
	pvp_rank_points: z.number(),
	/** The number of times the player has levelled up since reaching rank 80. If they aren't rank 80 yet, it should be 0. */
	pvp_rank_rollovers: z.number(),
	/** A win/loss object (see below) containing stats from all matches ever played. */
	aggregate: WinLoss,
	/** Contains a sub-object for each profession played in PvP, following the format of the win/loss object. */
	professions: z.record(z.string(), WinLoss),
	/** Contains a sub-object for each type of ladder (i.e. ranked, unranked), each containing a win/loss object. */
	ladders: z.record(z.string(), WinLoss)
});
