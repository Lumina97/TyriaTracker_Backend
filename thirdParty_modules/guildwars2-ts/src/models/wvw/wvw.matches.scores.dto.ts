import { z } from 'zod';
import { Scores } from './wvw.matches.dto';

/**
 * /v2/wvw/matches/scores definition
 */
export const WvWMatchesScoresDTO = z.object({
	/** The WvW match id. */
	id: z.string(),
	/** An object containing the score of the three servers. */
	scores: Scores,
	/** A list of objects containing detailed information about each of the four maps. */
	maps: z.array(
		z.object({
			/** The map id. */
			id: z.number(),
			/** The identifier for the map. Can be either RedHome, GreenHome or BlueHome for the borderlands or Center for Eternal Battlegrounds. */
			type: z.string(),
			/** An object containing the score of the three servers for only the specified map. */
			scores: Scores
		})
	),
	/** A list of skirmishes. */
	skirmishes: z.array(
		z.object({
			/** The skirmish id . */
			id: z.number(),
			/** Object containing total scores for each team color. */
			scores: Scores,
			/** Contains the map specific scores for the specific skirmish. */
			map_scores: z.array(
				z.object({
					/** Which map is being looked at. */
					type: z.enum(['Center', 'RedHome', 'BlueHome', 'GreenHome']),
					/** Object containing total scores for each team color on the selected map. */
					scores: Scores
				})
			)
		})
	)
});
