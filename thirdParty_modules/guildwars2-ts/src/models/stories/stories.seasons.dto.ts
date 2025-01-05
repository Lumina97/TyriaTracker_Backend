import { z } from 'zod';

/**
 * /v2/stories/seasons definition
 */
export const StoriesSeasonsDTO = z.array(
	z.object({
		/** The id of the season. */
		id: z.string(),
		/** The name of the season. */
		name: z.string(),
		/** The order in which this season is displayed in the Story Journal. */
		order: z.number(),
		/** An array of story ids for the stories that belong to this season. */
		stories: z.array(z.number())
	})
);
