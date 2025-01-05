import { z } from 'zod';

/**
 * /v2/finishers definition
 */
export const FinishersDTO = z.array(
	z.object({
		/** The id of the finisher. */
		id: z.number(),
		/** A description explaining how to acquire the finisher. */
		unlock_details: z.string(),
		/** An array of item ids used to unlock the finisher. Can be resolved against v2/items */
		unlock_items: z.array(z.number()).optional(),
		/** The order in which the finisher appears in a list. */
		order: z.number(),
		/** The icon uri for the finisher. */
		icon: z.string(),
		/** The name of the finisher as it appears in-game. */
		name: z.string()
	})
);
