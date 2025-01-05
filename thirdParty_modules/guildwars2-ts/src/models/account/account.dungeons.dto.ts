import { z } from 'zod';

/**
 * /v2/account/dungeons definition
 * Can be resolved against /v2/dungeons
 */
export const AccountDungeonsDTO = z.array(
	/** Id of the completed dungeon. */
	z.string()
);
