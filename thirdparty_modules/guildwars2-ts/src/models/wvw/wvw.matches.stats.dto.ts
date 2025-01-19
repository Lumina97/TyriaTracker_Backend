import { z } from 'zod';
import { Scores } from './wvw.matches.dto';

/**
 * /v2/wvw/matches/stats definition
 */
export const WvWMatchesStatsDTO = z.object({
	/** The WvW match id. */
	id: z.string(),
	/** An object containing the total deaths of the three servers. */
	deaths: Scores,
	/** An object containing the total kills of the three servers. */
	kills: Scores,
	/** A list of objects containing detailed information about each of the four maps. */
	maps: z.array(
		z.object({
			/** The map id. */
			id: z.number(),
			/** The identifier for the map. Can be either RedHome, GreenHome or BlueHome for the borderlands or Center for Eternal Battlegrounds. */
			type: z.string(),
			/** An object containing the total deaths of the three servers for only the specified map. */
			deaths: Scores
		})
	)
});
