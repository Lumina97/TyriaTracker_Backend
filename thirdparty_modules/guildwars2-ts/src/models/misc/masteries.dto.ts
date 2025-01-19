import { z } from 'zod';

const Levels = z.object({
	/** The name for the given mastery. */
	name: z.string(),
	/** The in game description for the given mastery. */
	description: z.string(),
	/** The in game instructions for the given mastery. */
	instruction: z.string(),
	/** The icon uri for the mastery. */
	icon: z.string(),
	/** The amount of mastery points required to unlock the mastery. */
	point_cost: z.number(),
	/** The total amount of experience needed to train the given mastery level. This total is non-cumulative between levels. */
	exp_cost: z.number()
});

/**
 * /v2/masteries definition.
 */
export const MasteriesDTO = z.array(
	z.object({
		/** The id of the mastery. */
		id: z.number(),
		/** The name of the selected mastery. */
		name: z.string(),
		/** The written out requirements to unlock the mastery track. */
		requirement: z.string(),
		/** The order in which the mastery track appears in a list. */
		order: z.number(),
		/** The background uri for the mastery track. */
		background: z.string(),
		/** The in-game region in which the mastery track belongs. */
		region: z.string(),
		/** An array containing the information of each mastery level. */
		levels: z.array(Levels)
	})
);
