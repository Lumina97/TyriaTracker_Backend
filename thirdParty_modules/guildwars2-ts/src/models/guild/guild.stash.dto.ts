import { z } from 'zod';

/**
 * /v2/guild/:id/stash definition
 */
export const GuildStashDTO = z.array(
	z.object({
		/** ID of the guild upgrade that granted access to this section of the guild vault. */
		upgrade_id: z.number(),
		/** The number of slots in this section of the guild vault. */
		size: z.number(),
		/** The number of coins deposited in this section of the guild vault. */
		coins: z.number(),
		/** The description set for this section of the guild's vault. */
		note: z.string(),
		/**
		 * An array of objects describing the items in the guild stash of exactly size length.
		 * Each object either contains the following properties if an item is present, or is null if the slot is empty.
		 */
		inventory: z.array(
			z.union([
				z.null(),
				z.object({
					/** ID of the item in this slot. */
					id: z.number(),
					/** Amount of items in this slot. */
					count: z.number()
				})
			])
		)
	})
);
