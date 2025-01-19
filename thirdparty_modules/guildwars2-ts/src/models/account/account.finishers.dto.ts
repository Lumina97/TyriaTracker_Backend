import { z } from 'zod';

/**
 * /v2/account/finishers definition
 */
export const AccountFinishersDTO = z.array(
	z.object({
		/** Id of the finisher. */
		id: z.number(),
		/** Indicated whether the finisher is permanent or temporary. */
		permanent: z.boolean(),
		/** Indicates uses if the finisher is temporary. */
		quantity: z.number().optional()
	})
);
