import { z } from 'zod';

/**
 * /v2/home/cats definition
 */
export const HomeCatsDTO = z.array(
	z.object({
		/** Id of the cat. */
		id: z.number(),
		/* A hint to identify what is needed for each cat. */
		hint: z.string().optional()
	})
);
