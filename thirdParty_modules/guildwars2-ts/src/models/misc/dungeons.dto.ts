import { z } from 'zod';

/**
 * /v2/dungeons definition
 */
export const DungeonsDTO = z.array(
	z.object({
		/** The name of the dungeon.*/
		id: z.string(),
		/** The paths in the dungeon. */
		paths: z.array(
			z.object({
				/** The given name for the dungeon path. */
				id: z.string(),
				/** The type of the chosen path. */
				type: z.enum(['Story', 'Explorable'])
			})
		)
	})
);
