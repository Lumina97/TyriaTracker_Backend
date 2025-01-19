import { z } from 'zod';

/**
 * /v2/novelties definition
 */
export const NoveltiesDTO = z.array(
	z.object({
		/** The id of the novelty. */
		id: z.number(),
		/** The name of the novelty as it appears in-game. */
		name: z.string(),
		/** The in-game novelty description. */
		description: z.string(),
		/** The icon url for the novelty. */
		icon: z.string(),
		/** The slot which the novelty appears in the UI for. */
		slot: z.enum(['Chair', 'Music', 'HeldItem', 'Miscellaneous', 'Tonic']),
		/** An array of item ids used to unlock the novelty. Can be resolved against /v2/items. */
		unlock_item: z.array(z.number())
	})
);
