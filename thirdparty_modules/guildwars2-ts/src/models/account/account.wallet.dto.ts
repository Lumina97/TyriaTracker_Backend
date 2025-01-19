import { z } from 'zod';

/**
 * /v2/account/wallet definition
 */
export const AccountWalletDTO = z.array(
	z.object({
		/** Id of the currency. Can be resolved against /v2/currencies. */
		id: z.number(),
		/** The amount of this currency. */
		value: z.number()
	})
);
