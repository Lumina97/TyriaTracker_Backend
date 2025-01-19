import { z } from 'zod';

/**
 * /v2/titles definition
 */
export const TitlesDTO = z.array(
	z.object({
		/** The id of the title. */
		id: z.number(),
		/** The name of the title (this is also the title displayed over a character in-game.) */
		name: z.string(),
		/** The id of the achievement that grants this title. Can be resolved against /v2/achievements. */
		achievements: z.array(z.number()).optional(),
		/** The amount of AP required to have said title. */
		ap_required: z.number().optional()
	})
);
