import { z } from 'zod';

/**
 * /v2/outfits definition.
 */
export const OutfitsDTO = z.array(
	z.object({
		/** The id of the outfit. */
		id: z.number(),
		/** The name of the outfit (this is also the outfit displayed over a character in-game.) */
		name: z.string(),
		/** The icon for the selected outfit. */
		icon: z.string(),
		/** An array of item id which unlock this outfit; Can be resolved against v2/items. */
		unlock_items: z.array(z.number())
	})
);
