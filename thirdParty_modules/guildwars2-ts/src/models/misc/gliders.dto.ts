import { z } from 'zod';

/**
 * /v2/gliders definition.
 */
export const GlidersDTO = z.array(
	z.object({
		/** The id of the glider. */
		id: z.number(),
		/** An array of item ids used to unlock the glider. Can be resolved against /v2/items. */
		unlock_items: z.array(z.number()).optional(),
		/** The order in which the glider appears in a list. The value is not unique. */
		order: z.number(),
		/** The icon URL for the glider. */
		icon: z.string(),
		/** The name of the glider as it appears in-game. */
		name: z.string(),
		/** The in-game glider description. */
		description: z.string(),
		/** List of dye ids. Can be resolved against /v2/colors. */
		default_dyes: z.array(z.number())
	})
);
