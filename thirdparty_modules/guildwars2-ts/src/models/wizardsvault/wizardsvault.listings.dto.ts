import { z } from 'zod';

/**
 * /v2/wizardsvault/listings definition
 */
export const WizardsVaultListingsDTO = z.array(
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
		cost: z.number()
	})
);
