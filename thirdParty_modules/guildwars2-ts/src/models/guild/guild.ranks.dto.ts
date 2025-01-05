/**
 * /v2/guild/:id/ranks definition
 */
import { z } from 'zod';

export const GuildRanksDTO = z.array(
	z.object({
		/** The id and name of the rank. */
		id: z.string(),
		/** A number given to each rank to specify how they should be sorted, lowest being the first and highest being the last. */
		order: z.number(),
		/** An array of permission ids from /v2/guild/permissions that have been given to this rank. */
		permissions: z.array(z.string()),
		/** The URL pointing to the image currently assigned to this rank. */
		icon: z.string()
	})
);
