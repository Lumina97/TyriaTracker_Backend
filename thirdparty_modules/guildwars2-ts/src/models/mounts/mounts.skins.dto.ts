import { z } from 'zod';

/**
 * /v2/mounts/skins definition.
 */
export const MountsSkinsDTO = z.array(
	z.object({
		/** The id of the mount skin. */
		id: z.number(),
		/** The name of the mount as it appears in-game. */
		name: z.string(),
		/** The full icon URL. */
		icon: z.string(),
		/** The mount type id for the given mount skin. Can be resolved against /v2/mounts/types */
		mount: z.string(),
		/** Each object contains a key-value pair for the dye. */
		dye_slots: z.array(
			z.object({
				/** Color id. Can be resolved against /v2/colors. */
				color_id: z.number(),
				/** Material description. */
				material: z.string()
			})
		)
	})
);
