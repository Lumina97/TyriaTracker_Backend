import { z } from 'zod';

/**
 * /v2/account/legendaryarmory definition
 */
export const AccountLegendaryArmoryDTO = z.array(
	z.object({
		/** The id of the armory items. Can be resolved against /v2/items and /v2/legendaryarmory. */
		id: z.number(),
		/** The count of that item available for use in a single equipment template. */
		count: z.number()
	})
);
