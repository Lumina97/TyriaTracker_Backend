import { z } from 'zod';

/**
 * /v2/account/luck definition
 */
export const AccountLuckDTO = z.array(
	z.object({
		/** Always the string "luck". */
		id: z.literal('luck'),
		/** The amount of luck consume. */
		value: z.number()
	})
);
