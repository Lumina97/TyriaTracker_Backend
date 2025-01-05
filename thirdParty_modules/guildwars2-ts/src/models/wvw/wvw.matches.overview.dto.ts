import { z } from 'zod';
import { Scores } from './wvw.matches.dto';

/**
 * /v2/wvw/matches/overview definition
 */
export const WvWMatchesOverviewDTO = z.object({
	/** The WvW match id. */
	id: z.string(),
	/** The starting time of the matchup. (ISO-8601 Standard) */
	worlds: Scores,
	/** The ending time of the matchup. (ISO-8601 Standard) */
	all_worlds: z.record(z.enum(['red', 'blue', 'green']), z.array(z.number())),
	/** An object containing the score of the three servers. */
	start_time: z.string(),
	/** An object containing the IDs of the three primary matchup worlds. */
	end_time: z.string()
});
