import { z } from 'zod';

/**
 * /v2/build definition
 */
export const BuildDTO = z.object({
	/** The id of the current game build. */
	id: z.number()
});
