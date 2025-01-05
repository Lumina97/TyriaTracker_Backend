import { z } from 'zod';

/**
 * /v2/account/achievements definition
 */
export const AccountAchievementsDTO = z.array(
	z.object({
		/** Achievement id. */
		id: z.number(),
		/** Achievement bits. */
		bits: z.array(z.number()).optional(),
		/** Current achievement point count. */
		current: z.number(),
		/** Maximum achievement point count. */
		max: z.number().optional(),
		/** Achievement completion status. */
		done: z.boolean(),
		/** Achievement repeatability. */
		repeated: z.number().optional(),
		/** Achievement unlock status. */
		unlocked: z.boolean().optional()
	})
);
