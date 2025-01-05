import { z } from 'zod';

/**
 * /v2/races definition
 */
export const RacesDTO = z.array(
	z.object({
		/** The id/name of the race. */
		id: z.string(),
		/** An array of skill ids. Can be resolved against v2/skills. */
		skills: z.array(z.number())
	})
);
