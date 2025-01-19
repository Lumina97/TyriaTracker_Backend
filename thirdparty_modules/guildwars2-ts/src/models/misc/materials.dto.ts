import { z } from 'zod';

/**
 * /v2/materials definition.
 */
export const MaterialsDTO = z.array(
	z.object({
		/** The category id. */
		id: z.number(),
		/** The category name. */
		name: z.string(),
		/** The ids of the items in this category. Can be resolved against /v2/items. */
		items: z.array(z.number()),
		/** The order in which the category appears in the material storage. */
		order: z.number()
	})
);
