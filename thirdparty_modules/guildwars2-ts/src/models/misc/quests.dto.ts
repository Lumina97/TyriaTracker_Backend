import { z } from 'zod';

/**
 * /v2/quests definition.
 */
export const QuestsDTO = z.array(
	z.object({
		/** The id of the quest. */
		id: z.number(),
		/** The name of the quest. */
		name: z.string(),
		/** The minimum level required for a character to begin this quest. */
		level: z.number(),
		/** The id for the story. Can be resolved against /v2/stories. */
		story: z.number(),
		/** An array of goal objects providing details about the goals for this quest. */
		goals: z.array(
			z.object({
				/** The text displayed for the quest step if it is active. */
				active: z.string(),
				/** The text displayed for the quest step if it is complete. */
				complete: z.string()
			})
		)
	})
);
