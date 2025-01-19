import { z } from 'zod';

/**
 * /v2/wvw/upgrades definition.
 */
export const WvWUpgradesDTO = z.array(
	z.object({
		/** The upgrade id. */
		id: z.number(),
		/** The upgrade tiers. */
		tiers: z.array(
			z.object({
				/** The name of the upgrade tier. */
				name: z.string(),
				/** The number of required yaks. */
				yaks_required: z.number(),
				/** The upgrades in each tier. */
				upgrades: z.array(
					z.object({
						/** The name of the upgrade tier. */
						name: z.string(),
						/** The given description for this upgrade. */
						description: z.string(),
						/** The url/image link for the upgrade's icon. */
						icon: z.string()
					})
				)
			})
		)
	})
);
