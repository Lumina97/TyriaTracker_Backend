import { z } from 'zod';

/**
 * /v2/account/progression definition
 */
export const AccountProgressionDTO = z.array(
	z.object({
		/** Progression name. */
		id: z.string(),
		/** Progression value. */
		value: z.number()
	})
);
