import { z } from 'zod';

/**
 * /v2/account/mastery/points definition
 */
export const AccountMasteryPointsDTO = z.object({
	/** Mastery points redeemed per section. */
	totals: z.array(
		z.object({
			/** Name of the region for the masteries. */
			region: z.string(),
			/** Amount of masteries of this region spent in mastery tracks. */
			spent: z.number(),
			/** Amount of masteries of this region earned for the account. */
			earned: z.number()
		})
	),
	/** Array of unlocked mastery ids. */
	unlocked: z.array(z.number())
});
