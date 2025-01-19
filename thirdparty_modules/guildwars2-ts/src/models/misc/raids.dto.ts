import { z } from 'zod';

/**
 * /v2/raids definition
 */
export const RaidsDTO = z.array(
	z.object({
		/** The name of the dungeon. */
		id: z.string(),
		/** An array of object containing the following: */
		wings: z.array(
			z.object({
				/** The given name for the dungeon path. */
				id: z.string(),
				/** List of events within the raid or dungeon. */
				events: z.array(
					z.object({
						/** The event/encounter name. */
						id: z.string(),
						/** The type of events. */
						type: z.enum(['Checkpoint', 'Boss'])
					})
				)
			})
		)
	})
);
