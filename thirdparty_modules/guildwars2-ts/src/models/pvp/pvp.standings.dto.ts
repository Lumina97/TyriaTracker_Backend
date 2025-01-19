import { z } from 'zod';

const Current = z.object({
	/** Total points in the current ladder. */
	total_points: z.number(),
	/** 0-indexed and refers to the data returned by season ID. */
	division: z.number(),
	/** 0-indexed and refers to the data returned by season ID. */
	tier: z.number(),
	/** Current point count. */
	points: z.number(),
	/** The number of times the account has maxed out the "Repeat" division. */
	repeats: z.number(),
	/** The current rating level. For PvP season 5 and after only. */
	rating: z.number().optional(),
	/** The current decay value. For PvP season 5 and after only. */
	decay: z.number().optional()
});

const Best = z.object({
	/** Total points in the current ladder. */
	total_points: z.number(),
	/** 0-indexed and refers to the data returned by season ID. */
	division: z.number(),
	/** 0-indexed and refers to the data returned by season ID. */
	tier: z.number(),
	/** Current point count. */
	points: z.number(),
	/** The number of times the account has maxed out the "Repeat" division. */
	repeats: z.number()
});

/**
 * /v2/pvp/standings definition.
 */
export const PvPStandingsDTO = z.array(
	z.object({
		/** Current standings. */
		current: Current,
		/** Best standings. */
		best: Best,
		/** The season ID. */
		season_id: z.string()
	})
);
