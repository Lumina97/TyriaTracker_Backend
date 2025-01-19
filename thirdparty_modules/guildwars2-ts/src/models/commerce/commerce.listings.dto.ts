import { z } from "zod";

/**
 * /v2/commerce/listings definition.
 */
export const CommerceListingsDTO = z.array(
	z.object({
		/** The item id. Can be resolved against /v2/items. */
		id: z.number(),
		/** List of all buy listings, descending from the highest buy order. */
		buys: z.array(
			z.object({
				/** The number of individual listings this object refers to. */
				listings: z.number(),
				/** The sell offer or buy order price in coins. */
				unit_price: z.number(),
				/** The amount of items being sold/bought in this listing. */
				quantity: z.number(),
			}),
		),
		/** List of all sell listings, ascending from the lowest sell order. */
		sells: z.array(
			z.object({
				/** The number of individual listings this object refers to. */
				listings: z.number(),
				/** The sell offer or buy order price in coins. */
				unit_price: z.number(),
				/** The amount of items being sold/bought in this listing. */
				quantity: z.number(),
			}),
		),
	}),
);
