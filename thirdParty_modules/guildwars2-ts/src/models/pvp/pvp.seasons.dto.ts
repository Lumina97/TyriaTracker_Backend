import { z } from 'zod';

const Divisions = z.object({
	/** The division's name. */
	name: z.string(),
	/** Flags applying to the division. */
	flags: z.array(z.enum(['CanLosePoints', 'CanLoseTiers', 'Repeatable'])),
	/** Path to the large icon. */
	large_icon: z.string(),
	/** Path to the small icon. */
	small_icon: z.string(),
	/** Path to the pip icon. */
	pip_icon: z.string(),
	/** A list of tiers. */
	tiers: z.array(
		z.object({
			/** The number of pipes contained in each tier. */
			points: z.number()
		})
	)
});

const Ranks = z.object({
	/** The rank's name. */
	name: z.string(),
	/** The rank's description. */
	description: z.string(),
	/** The full icon URL. */
	icon: z.string(),
	/** The full URL for the rank's overlay icon. */
	overlay: z.string(),
	/** The full URL for a small variant of the rank's overlay icon. */
	overlay_small: z.string(),
	/** The tiers of the rank. */
	tiers: z.array(
		z.object({
			/** The minimum PvP rating required for the tier. */
			rating: z.number()
		})
	)
});

const Settings = z.object({
	/** Setting name. NOTE: Broken, always empty. */
	name: z.string(),
	/** Duration setting. NOTE: Broken, always null. Supposed to be a number. */
	duration: z.null(),
	/** Indicates the primary scoring component. */
	scoring: z.string(),
	/** The ladder tiers. */
	tiers: z.array(
		z.object({
			/** Two numbers, a maximum, followed by minimum. */
			range: z.array(z.number()).length(2)
		})
	)
});

const Scorings = z.object({
	/** The id for this scoring method, used as a reference in other endpoints. */
	id: z.string(),
	/** Which variable type the content is saved as. */
	type: z.string(),
	/** Description of the scoring method (if any). */
	description: z.string(),
	/** Should represent the scoring method, such as "wins", "losses", and "skill rating". */
	name: z.string(),
	/** Will describe how the scoring is ordered. */
	ordering: z.string()
});

const Leaderboards = z.object({
	/** The leaderboard ladder. */
	ladder: z
		.object({
			/** The ladder settings. */
			settings: Settings,
			/** Array used as reference to select player/guild scoring method. */
			scorings: z.array(Scorings)
		})
		.optional()
});

/**
 * /v2/pvp/seasons definition.
 */
export const PvPSeasonDTO = z.array(
	z.object({
		/** The season's UUID. */
		id: z.string(),
		/** The season's name. */
		name: z.string(),
		/** ISO timestamp for season start. */
		start: z.string(),
		/** ISO timestamp for season end. */
		end: z.string(),
		/** Whether the season is currently active. */
		active: z.boolean(),
		/** A list of divisions. */
		divisions: z.array(Divisions),
		/** Contains details about the season's ranks */
		ranks: z.array(Ranks).optional(),
		/** Contains details on the current leaderboards. */
		leaderboards: Leaderboards
	})
);
