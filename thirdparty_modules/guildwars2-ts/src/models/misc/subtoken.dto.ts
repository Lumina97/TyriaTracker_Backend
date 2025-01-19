import { z } from 'zod';

/**
 * /v2/subtoken definition.
 */
export const SubtokenDTO = z.object({
	/** Account subtoken. */
	subtoken: z.string()
});
