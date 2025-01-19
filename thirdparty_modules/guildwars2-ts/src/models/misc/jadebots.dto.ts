import { z } from 'zod';

/**
 * /v2/jadebots definition
 */
export const JadebotsDTO = z.array(
	z.object({
		/** The id of the jade bot skin. */
		id: z.number(),
		/** The name of the jade bot skin. */
		name: z.string(),
		/** A description of how to unlock the skin. */
		description: z.string(),
		/** The item which unlocks the skin. Can be resolved against /v2/items */
		unlock_item: z.number()
	})
);
