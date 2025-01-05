import { z } from 'zod';

/**
 * /v2/commerce/delivery definition
 */
export const CommerceDeliveryDTO = z.object({
	/** Amount of coins ready for pickup */
	coins: z.number(),
	/** Items ready for pickup */
	items: z.array(
		z.object({
			/** The item id. Can be resolved against /v2/items. */
			id: z.number(),
			/** Item count. */
			count: z.number()
		})
	)
});
