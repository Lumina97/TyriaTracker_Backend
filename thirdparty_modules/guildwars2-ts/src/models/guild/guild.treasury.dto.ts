import { z } from 'zod';

/**
 * /v2/guild/:id/treasury definition
 */
export const GuildTreasuryDTO = z.array(
	z.object({
		/** The item id. */
		item_id: z.number(),
		/** How many items are currently in the treasury. */
		count: z.number(),
		/** An array of objects describing which currently in-progress upgrades are needing this item. */
		needed_by: z.array(
			z.object({
				/** The ID of the upgrade needing this item. */
				upgrade_id: z.number(),
				/** The total amount the upgrade needs for this item. */
				count: z.number()
			})
		)
	})
);
