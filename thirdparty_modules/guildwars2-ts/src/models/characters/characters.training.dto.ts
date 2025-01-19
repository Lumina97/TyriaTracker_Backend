import { z } from 'zod';

/**
 * /v2/characters/:id/training definition
 */
export const CharacterTrainingDTO = z.object({
	/** Skill trained in each skill tree. */
	training: z.array(
		z.object({
			/** Skill tree id. Can be resolved against /v2/profession, in training section. */
			id: z.number(),
			/** How many points have been spent in this tree. */
			spent: z.number(),
			/** Whether the tree is fully trained. */
			done: z.boolean()
		})
	)
});
