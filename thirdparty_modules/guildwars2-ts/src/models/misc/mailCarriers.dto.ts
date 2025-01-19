import { z } from 'zod';

/**
 * /v2/mailcarriers definition.
 */
export const MailCarriersDTO = z.array(
	z.object({
		/** The id of the mail carrier. */
		id: z.number(),
		/** An array of item ids used to unlock the mailcarrier. Can be resolved against /v2/items. */
		unlock_items: z.array(z.number()),
		/** The order in which the mailcarrier appears in a list. */
		order: z.number(),
		/** The icon uri for the mail carrier. */
		icon: z.string(),
		/** The name of the mailcarrier as it appears in-game. */
		name: z.string(),
		/** Additional flags on the item, such as "Default" */
		flags: z.array(z.string())
	})
);
