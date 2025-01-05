import { z } from 'zod';

/**
 * /v2/account/masteries definition
 */
export const AccountMasteriesDTO = z.array(
	z.object({
		/** The id of the mastery resolvable against /v2/masteries. */
		id: z.number(),
		/**
		 * Indicates the level at which the mastery is on the account.
		 * Is a 0-indexed reference to the /v2/masteries.
		 */
		level: z.number()
	})
);
