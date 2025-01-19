import { z } from 'zod';

const Skins = z.object({
	/** The skin id. */
	id: z.number(),
	/** The name of the skin. */
	name: z.string(),
	/** The icon url for the skin. */
	icon: z.string(),
	/** States if the skin is the default champion skin. */
	default: z.boolean(),
	/** Item ids which unlock the skin. Can be resolved against /v2/items. */
	unlock_items: z.array(z.number())
});

/**
 * /v2/pvp/heroes definition.
 */
export const PvPHeroesDTO = z.array(
	z.object({
		/** The id of the pvp heroes. */
		id: z.string(),
		/** The name of the pvp heroes. */
		name: z.string(),
		/** The flavor type describing the hero. */
		type: z.string(),
		/** An object reflecting the champions stats under offense, defense, or speed. */
		stats: z.object({
			/** Offense. */
			offense: z.number(),
			/** Defense. */
			defense: z.number(),
			/** Speed. */
			speed: z.number()
		}),
		/** The overlay art url for that champion. */
		overlay: z.string(),
		/** The underlay art url for that champion. */
		underlay: z.string(),
		/** The pvp hero skin. */
		skins: z.array(Skins)
	})
);
