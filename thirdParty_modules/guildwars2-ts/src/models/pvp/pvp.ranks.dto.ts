import { z } from 'zod';

/**
 * /v2/pvp/ranks definition.
 */
export const PvPRanksDTO = z.array(
	z.object({
		/** The id of the pvp rank. */
		id: z.number(),
		/** The id of the unlocked finisher, can be resolved against /v2/finishers */
		finisher_id: z.number(),
		/** The given name for the PvP rank. */
		name: z.string(),
		/** The icon uri for the Pvp rank. */
		icon: z.string(),
		/** The minimum PvP level required to be at this rank. */
		min_rank: z.number(),
		/** The maximum PvP level required to be at this rank. */
		max_rank: z.number(),
		/** The rank levels. */
		levels: z.array(
			z.object({
				/** The minimum PvP level required to be at this rank. */
				min_rank: z.number(),
				/** The maximum PvP level required to be at this rank. */
				max_rank: z.number(),
				/** The amount of PvP experience needed to go from the given minimum rank to maximum rank. */
				points: z.number()
			})
		)
	})
);
