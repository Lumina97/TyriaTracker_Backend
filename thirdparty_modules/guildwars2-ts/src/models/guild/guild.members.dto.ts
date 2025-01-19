import { z } from 'zod';

/**
 * /v2/guild/:id/members definition
 */
export const GuildMembersDTO = z.array(
	z.object({
		/** The account name of the member. */
		name: z.string(),
		/** The guild rank of the member. Can be resolved with /v2/guild/:id/ranks. */
		rank: z.string(),
		/** The time and date the member joined the guild (ISO-8601 standard). Was not tracked before around March 19th, 2013. */
		joined: z.union([z.string(), z.null()])
	})
);
