import { z } from 'zod';

/**
 * /v2/account/wizardsvault/listings definition
 */
export const AccountWizardsVaultListingsDTO = z.array(
	z.object({
		/** The listing id. */
		id: z.number(),
		/** The id of the item */
		item_id: z.number(),
		/** The quantity of the item the user receives */
		item_count: z.number(),
		/** Appears to be the position in the wizards vault UI. */
		type: z.enum(['Featured', 'Normal', 'Legacy']),
		/** The quantity of Astral Acclaim to purchase . */
		cost: z.number(),
		/** Amount of the item already purchased. Not included if the reward is unlimited. */
		purchased: z.number().optional(),
		/** Maximum amount that can be purchased. Not included if the reward is unlimited. */
		purchase_limit: z.number().optional()
	})
);
