import { z } from 'zod';

export const Scores = z.object({
	/** Score of the red team. */
	red: z.number(),
	/** Score of the blue team. */
	blue: z.number(),
	/** Score of the green team. */
	green: z.number()
});

/**
 * /v2/wvw/matches definition
 */
export const WvWMatchesDTO = z.array(
	z.object({
		/** The WvW match id. */
		id: z.string(),
		/** The starting time of the matchup. (ISO-8601 Standard) */
		start_time: z.string(),
		/** The ending time of the matchup. (ISO-8601 Standard) */
		end_time: z.string(),
		/** An object containing the score of the three servers. */
		scores: Scores,
		/** An object containing the IDs of the three primary matchup worlds. */
		worlds: Scores,
		/** n object containing an array of objects with the world IDs of the three servers. */
		all_worlds: z.record(z.string(), z.array(z.number())),
		/** An object containing the total deaths of the three servers. */
		deaths: Scores,
		/** An object containing the total kills of the three servers. */
		kills: Scores,
		/** An object containing the victory points of the three server. */
		victory_points: Scores,
		/** A list of objects containing detailed information about each of the four maps. */
		maps: z.array(
			z.object({
				/** The map id. */
				id: z.number(),
				/** The identifier for the map. Can be either RedHome, GreenHome or BlueHome for the borderlands or Center for Eternal Battlegrounds. */
				type: z.string(),
				/** An object containing the score of the three servers for only the specified map. */
				scores: Scores,
				/** An object containing the total kills of the three servers for only the specified map. */
				kills: Scores,
				/** An object containing the total deaths of the three servers for only the specified map. */
				deaths: Scores,
				/** A list of objective objects for this map. Each object contains the following properties: */
				objectives: z.array(
					z.object({
						/** The objective id. */
						id: z.string(),
						/** The objective type. */
						type: z.enum(['Spawn', 'Camp', 'Ruins', 'Tower', 'Keep', 'Castle', 'Mercenary']),
						/** The current owner of the objective. */
						owner: z.enum(['Red', 'Green', 'Blue', 'Neutral']),
						/** The time at which this objective was last captured by a server. (ISO-8601 Standard) */
						last_flipped: z.string(),
						/** The guild id of the guild currently claiming the objective, or null if not claimed. (Not present for unclaimable objectives.) */
						claimed_by: z.union([z.string(), z.null()]).optional(),
						/** The time the objective was claimed by the claimed_by guild (ISO-8601 Standard), or null if not claimed. (Not present for unclaimable objectives.) */
						claimed_at: z.union([z.string(), z.null()]).optional(),
						/** The amount of points per tick the given objective yields. */
						points_tick: z.number(),
						/** The amount of points awarded for capturing the objective. */
						points_capture: z.number(),
						/** An array of ids. Can be resolved against /v2/guild/upgrades, showing which guild upgrades are currently slotted. */
						guild_upgrades: z.array(z.number()).optional(),
						/** The total amount of yak shipments delivered to the objective. Not limited to the shipments within the current tier only. */
						yaks_delivered: z.number().optional()
					})
				),
				/**
				 * A list of all bonuses being granted by this map.
				 * If no player team owns a bonus from the map, this list is empty.
				 */
				bonuses: z.array(
					z.object({
						/** A shorthand name for the bonus. */
						type: z.literal('Bloodlust'),
						/** The color representing which world group owns the bloodlust. */
						owner: z.string()
					})
				)
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
	})
);
