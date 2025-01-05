import { z } from 'zod';

/**
 * /v2/commerce/exchange/coins definition
 */
export const CommerceExchangeDTO = z.object({
	/** The number of coins you required for a single currency unit. */
	coins_per_gem: z.number(),
	/** The number of gems you get for the specified quantity of currency. */
	quantity: z.number()
});
