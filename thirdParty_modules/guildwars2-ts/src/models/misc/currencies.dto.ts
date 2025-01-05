import { z } from 'zod';

/**
 * /v2/currencies definition.
 */
export const CurrenciesDTO = z.array(
	z.object({
		/** Currency id. */
		id: z.number(),
		/** Currency name. */
		name: z.string(),
		/** Currency description. */
		description: z.string(),
		/** Order of the currency in the list. */
		order: z.number(),
		/** Currency icon url. */
		icon: z.string()
	})
);
