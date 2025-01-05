import { z } from 'zod';

/**
 * /v2/mounts/types definition.
 */
export const MountsTypesDTO = z.array(
	z.object({
		/** The id of the mount. */
		id: z.string(),
		/** The name of the mount type as it appears in-game. */
		name: z.string(),
		/** The mount skin a mount has when first obtained. Can be resolved against /v2/mounts/skins. */
		default_skin: z.number(),
		/** An array of mount skin ids. Can be resolved against /v2/mounts/skins. */
		skins: z.array(z.number()),
		/** Each object contains a key-value pair for the skill id and weapon slot. Can be resolved against /v2/skills. */
		skills: z.array(
			z.object({
				/** The skill id. */
				id: z.number(),
				/** The skill slot. */
				slot: z.string()
			})
		)
	})
);
