import { z } from 'zod';

/**
 * /v2/pets definition
 */
export const PetsDTO = z.array(
	z.object({
		/** The id of the pet. */
		id: z.number(),
		/** The name of the pet. */
		name: z.string(),
		/** The description of the pet. */
		description: z.string(),
		/** The icon uri for the pet. */
		icon: z.string(),
		/** List of skill ids. Can be resolved against /v2/skills. */
		skills: z.array(
			z.object({
				/** The id of the skill. */
				id: z.number()
			})
		)
	})
);
