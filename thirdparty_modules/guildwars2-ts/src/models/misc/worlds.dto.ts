import { z } from 'zod';

/**
 * /v2/worlds definition
 */
export const WorldsDTO = z.array(
	z.object({
		/** The world id.
		 * The first digit of the id indicates the world's region. 1 is North America, 2 is Europe.
		 * The second digit of the id currently correlates with the world's assigned language: 1 means French, 2 means German, and 3 means Spanish. */
		id: z.number(),
		/** The world name. */
		name: z.string(),
		/** The world population level. */
		population: z.enum(['Low', 'Medium', 'High', 'VeryHigh', 'Full'])
	})
);
