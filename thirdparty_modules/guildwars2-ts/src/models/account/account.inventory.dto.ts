import { z } from 'zod';

/**
 * /v2/account/inventory definition
 */
export const AccountInventoryDTO = z.array(
	z.union([
		z.null(),
		z.object({
			/** Item id. */
			id: z.number(),
			/** The amount of items in the stack. */
			count: z.number(),
			/** The amount of charges remaining. */
			charges: z.number().optional(),
			/** The skin applied to the item. */
			skin: z.number().optional(),
			/** Item ids for runes and signets applied to the item. */
			upgrades: z.array(z.number()).optional(),
			/** Item ids for infusions applied to the item. */
			infusions: z.array(z.number()).optional(),
			/** Item binding. "Account" if available at all. */
			binding: z.literal('Account').optional()
		})
	])
);
