import { z } from 'zod';

/**
 * PvP stat aggregate
 * TODO: Move to /v2/pvp/stats
 */
const PvPAggregate = z.object({
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
 * PvP game object
 * TODO: Since this is identical to /v2/pvp/games but with professions omitted, figure out what to do
 */
const PvPGame = z.object({
	/** The game's UUID. */
	id: z.string(),
	/** The map the match was played on. Can be resolved against /v2/maps. */
	map_id: z.string(),
	/** A timestamp of when the match started. */
	started: z.string(),
	/** A timestamp of when the match ended. */
	ended: z.string(),
	/** The team the player was on during the match. */
	team: z.string(),
	/** Team scores. */
	scores: z.object({
		/** The ending score of the red team. */
		red: z.number(),
		/** The ending score of the blue team. */
		blue: z.number()
	}),
	/** The type of game mode played. */
	rating_type: z.enum(['Ranked', 'Unranked', 'None']),
	/** Change in rating as a result of the observed game. Note that number can be negative in the case of a loss. */
	rating_change: z.number(),
	/** Season id. Can be resolved against /v2/pvp/season. */
	season: z.string().optional()
});

/**
 * /v2/guild/:id/teams definition
 */
export const GuildTeamsDTO = z.array(
	z.object({
		/** the team ID, only unique within a guild. */
		id: z.number(),
		/** Array of members in the team. */
		members: z.array(
			z.object({
				/** Matching name from /v2/guild/members. */
				name: z.string(),
				/** Captain or member. */
				role: z.enum(['Member', 'Captain'])
			})
		),
		/** Team name. */
		name: z.string(),
		/** Team statistics aggregate. */
		aggregate: PvPAggregate,
		/** Team ladder statistics aggregates. */
		ladders: z.object({
			/** Ranked arena stats. */
			ranked: PvPAggregate.optional(),
			/** Unranked arena stats. */
			unranked: PvPAggregate.optional()
		}),
		/** Team games. */
		games: z.array(PvPGame),
		/** Team's seasonal participation. */
		seasons: z
			.array(
				z.object({
					/** Season id. */
					id: z.string(),
					/** Win count. */
					wins: z.number(),
					/** Loss count. */
					losses: z.number(),
					/** Seasonal rating. */
					rating: z.number()
				})
			)
			.optional()
	})
);
