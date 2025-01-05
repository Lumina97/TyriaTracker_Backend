import { z } from 'zod';

/**
 * /v2/guild/permissions definition
 */
export const GuildPermissionsDTO = z.array(
	z.object({
		/** The permission id. */
		id: z.string(),
		/** The permission name. */
		name: z.string(),
		/** Description of the permission. */
		description: z.string()
	})
);
