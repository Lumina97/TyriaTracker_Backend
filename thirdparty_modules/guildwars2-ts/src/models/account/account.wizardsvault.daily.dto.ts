import { z } from 'zod';

/**
 * /v2/account/wizardsvault/daily definition
 */
export const AccountWizardsVaultDailyDTO = z.object({
	/** The current progress to the meta achievement for the daily. */
	meta_progress_current: z.number(),
	/** The threshold for the meta progress to be 'complete', and the meta reward claimable. */
	meta_progress_complete: z.number(),
	/** The ID of the item you receive for claiming the meta reward */
	meta_reward_item_id: z.number(),
	/** The amount of Astral Acclaim you receive for claiming the meta reward */
	meta_reward_astral: z.number(),
	/** Whether the account has claimed the meta reward. */
	meta_reward_claimed: z.boolean(),
	/** An array of objects detailing each daily objective */
	objectives: z.array(
		z.object({
			/** The ID of the objective. */
			id: z.number(),
			/** The title of the objective. */
			title: z.string(),
			/** The reward track containing the objective. */
			track: z.string(),
			/** The astral acclaim awarded for the objective. */
			acclaim: z.number(),
			/** The current progress of the objective. */
			progress_current: z.number(),
			/** The progress status of the objective. */
			progress_complete: z.number(),
			/** The claim status of the objective. */
			claimed: z.boolean()
		})
	)
});
