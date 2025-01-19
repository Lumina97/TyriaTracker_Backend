import { z } from 'zod';

/**
 * /v2/emblem/* Definition
 */
export const EmblemDTO = z.array(
	z.object({
		/** The emblem id. */
		id: z.number(),
		/** An array of URLs to images that make up the various parts of the emblem. */
		layers: z.array(z.string())
	})
);
