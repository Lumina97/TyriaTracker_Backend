import { z } from 'zod';

/**
 * /v2/account/wizardsvault/special definition
 */
export const AccountWizardsVaultSpecialDTO = z.object({
	/** An array of objects detailing each weekly objective */
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
