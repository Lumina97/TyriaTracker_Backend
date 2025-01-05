import { z } from 'zod';

/**
 * /v2/wvw/abilities definition
 */
export const WvWAbilitiesDTO = z.array(
	z.object({
		/** The id of the abilities.*/
		id: z.number(),
		/** The given name for the WvW ability.*/
		name: z.string(),
		/** The given description for the WvW ability.*/
		description: z.string(),
		/** The uri for the ability's icon.*/
		icon: z.string(),
		/** The WvW ranks.*/
		ranks: z.array(
			z.object({
				/** The cost in WvW experience points to purchase the ability.*/
				cost: z.number(),
				/** The effect given to players for obtaining the given ability rank.*/
				effect: z.string()
			})
		)
	})
);
