import { z } from 'zod';

/**
 * /v2/minis definition.
 */
export const MinisDTO = z.array(
	z.object({
		/** The mini id. */
		id: z.number(),
		/** The mini name. */
		name: z.string(),
		/** A description of how to unlock the mini (only present on a few entries). */
		unlock: z.string().optional(),
		/** The mini icon. */
		icon: z.string(),
		/** The sort order that is used for displaying the mini in-game. */
		order: z.number(),
		/** The item which unlocks the mini. Can be resolved against /v2/items. */
		item_id: z.number()
	})
);
