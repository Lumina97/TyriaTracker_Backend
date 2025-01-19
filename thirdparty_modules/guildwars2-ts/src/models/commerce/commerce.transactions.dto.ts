import { z } from 'zod';

/**
 * /v2/commerce/transactions definition.
 */
export const CommerceTransactionDTO = z.array(
	z.object({
		/** Id of the transaction. */
		id: z.number(),
		/** The item id. Can be resolved against /v2/items. */
		item_id: z.number(),
		/** The price in coins. */
		price: z.number(),
		/** The quantity of the item. */
		quantity: z.number(),
		/** The date of creation, using ISO-8601 standard. */
		created: z.string(),
		/** The date of purchase, using ISO-8601 standard. Not shown in current second-level endpoint. */
		purchased: z.string().optional()
	})
);
