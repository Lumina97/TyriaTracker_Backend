import { z } from 'zod';

/**
 * /v2/guild/search definition
 */
export const GuildSearchDTO = z.array(
	/** The id of the guild. */
	z.string()
);
