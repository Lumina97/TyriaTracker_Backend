import { z } from 'zod';

/**
 * /v2/legends definition.
 */
export const LegendsDTO = z.array(
	z.object({
		/** Id of the legend. */
		id: z.string(),
		/** The legend code for a build template link. Available on schema version 2019-12-19T00:00:00.000Z or later. */
		code: z.number().optional(),
		/** The id of the profession (swap Legend) skill. Can be resolved against /v2/skills. */
		swap: z.number(),
		/** The id of the heal skill. Can be resolved against /v2/skills. */
		heal: z.number(),
		/** The id of the elite skill. Can be resolved against /v2/skills. */
		elite: z.number(),
		/** The ids of the utility skills. Can be resolved against /v2/skills. */
		utilities: z.array(z.number())
	})
);
