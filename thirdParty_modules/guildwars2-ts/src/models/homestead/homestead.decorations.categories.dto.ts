import { z } from 'zod';

/**
 * /v2/homestead/decorations/categories definition
 */
export const HomesteadDecorationsCategoriesDTO = z.array(
	z.object({
		/** The category's ID. */
		id: z.number(),
		/** The category name. */
		name: z.string()
	})
);
