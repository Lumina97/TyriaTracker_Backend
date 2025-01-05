import { z } from 'zod';

/**
 * /v2/skiffs definition
 */
export const SkiffsDTO = z.array(
	z.object({
		/** The id of the skiff skin. */
		id: z.number(),
		/** The name of the skiff skin. */
		name: z.string(),
		/** The full icon URL. */
		icon: z.string(),
		/** An object containing information on the available dye slots and defaults. */
		dye_slots: z.array(
			z.object({
				/** The id of the default color. Can be resolved against v2/colors. */
				color_id: z.number(),
				/** The type of material. */
				material: z.enum(['metal', 'leather', 'cloth'])
			})
		)
	})
);
