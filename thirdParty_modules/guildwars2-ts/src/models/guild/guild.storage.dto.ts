import { z } from 'zod';

/**
 * /v2/guild/:id/storage definition
 */
export const GuildStorageDTO = z.array(
	z.object({
		/** The id of the consumable. */
		id: z.number(),
		/** Amount of the consumable in storage. */
		count: z.number()
	})
);
