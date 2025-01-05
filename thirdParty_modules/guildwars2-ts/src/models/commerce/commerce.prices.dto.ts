import { z } from 'zod';

/**
 * /v2/commerce/prices definition.
 */
export const CommercePricesDTO = z.array(
	z.object({
		/** The item id. Can be resolved against /v2/items. */
		id: z.number(),
		/** Whether free to play accounts can purchase or sell this item. */
		whitelisted: z.boolean(),
		/** Buy information. */
		buys: z.object({
			/** The highest buy order or lowest sell offer price in copper coins. */
			quantity: z.number(),
			/** The amount of items being sold/bought. */
			unit_price: z.number()
		}),
		/** Sell information. */
		sells: z.object({
			/** The highest buy order or lowest sell offer price in copper coins. */
			quantity: z.number(),
			/** The amount of items being sold/bought. */
			unit_price: z.number()
		})
	})
);
