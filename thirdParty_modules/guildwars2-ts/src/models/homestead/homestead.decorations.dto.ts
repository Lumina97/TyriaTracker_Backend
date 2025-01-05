import { z } from 'zod';

/**
 * /v2/homestead/decorations definition
 */
export const HomesteadDecorationsDTO = z.array(
	z.object({
		/** The decoration id. */
		id: z.number(),
		/* The name of the decoration. */
		name: z.string(),
		/** The homestead decoration description. */
		description: z.string(),
		/** The maximum amount of storable instances of this decoration. */
		max_count: z.number(),
		/** A URL pointing to an icon for the decoration. */
		icon: z.string(),
		/** An array of decoration category ids which this decoration belongs to.
		 * Can be compared to the v2/homestead/decorations/categories endpoint */
		categories: z.array(z.number())
	})
);
