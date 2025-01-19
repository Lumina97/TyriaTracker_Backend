import { z } from 'zod';

/**
 * /v2/wizardsvault/objectives definition
 */
export const WizardsVaultObjectivesDTO = z.array(
	z.object({
		/** The ID of the objective. */
		id: z.number(),
		/** The title of the objective. */
		title: z.string(),
		/** The reward track containing the objective. */
		track: z.enum(['PvP', 'WvW', 'PvE']),
		/** The amount of astral acclaim awarded. */
		acclaim: z.number()
	})
);
