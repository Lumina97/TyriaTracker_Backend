import { z } from 'zod';

/**
 * /v2/wvw/ranks definition
 */
export const WvWRanksDTO = z.array(
	z.object({
		/** The id of the rank. */
		id: z.number(),
		/** The given title for the WvW rank. */
		title: z.string(),
		/** The minimum WvW level required to be at this rank. */
		min_rank: z.number()
	})
);
