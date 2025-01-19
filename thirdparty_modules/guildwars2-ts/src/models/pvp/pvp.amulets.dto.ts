import { z } from 'zod';
import { ItemAttributesGeneric } from '../account';

/**
 * /v2/pvp/amulets definition.
 */
export const PvPAmuletsDTO = z.array(
	z.object({
		/** The id of the amulet. */
		id: z.number(),
		/** The name of the amulet. */
		name: z.string(),
		/** The icon uri for the amulet. */
		icon: z.string(),
		/** The list of stats provided by this PvP amulet. */
		attributes: ItemAttributesGeneric
	})
);
