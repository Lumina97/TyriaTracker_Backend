import { z } from 'zod';

/**
 * /v2/wizardsvault definition
 */
export const WizardsVaultDTO = z.object({
	/** The name of the current season. */
	title: z.string(),
	/** The date that the current season begins. */
	start: z.string(),
	/** The date that the current season ends. */
	end: z.string(),
	/** The wizard's vault listing ids available (use the sub endpoint to view item details). */
	listings: z.array(z.number()),
	/** The wizard's vault objective ids available (use the sub endpoint to view item details). */
	objectives: z.array(z.number())
});
