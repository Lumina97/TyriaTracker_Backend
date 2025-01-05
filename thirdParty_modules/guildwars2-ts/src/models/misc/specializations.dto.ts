import { z } from 'zod';

/**
 * /v2/specializations definition
 */
export const SpecializationsDTO = z.array(
	z.object({
		/** The specialization's ID. */
		id: z.number(),
		/** The name of the specialization. */
		name: z.string(),
		/** The profession that this specialization belongs to. */
		profession: z.string(),
		/** True if this specialization is an Elite specialization, false otherwise. */
		elite: z.boolean(),
		/** A URL to an icon of the specialization. */
		icon: z.string(),
		/** A URL to the background image of the specialization. */
		background: z.string(),
		/** Contains a list of IDs specifying the minor traits in the specialization. */
		minor_traits: z.array(z.number()),
		/** Contains a list of IDs specifying the major traits in the specialization. */
		major_traits: z.array(z.number())
	})
);
