import { z } from 'zod';

/**
 * /v2/legendaryarmory definition
 */
export const LegendaryArmoryDTO = z.array(
	z.object({
		/** The item id of the legendary armory item. */
		id: z.number(),
		/** The maximum quantity of the legendary armory item that can be stored on the account. */
		max_count: z.union([z.literal(1), z.literal(2), z.literal(4), z.literal(7), z.literal(8)])
	})
);
