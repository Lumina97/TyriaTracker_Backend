import { z } from 'zod';

/**
 * /v2/account/worldbosses definition
 * Can be resolved against /v2/worldbosses
 */
export const AccountWorldBossesDTO = z.array(
	/** Name of the world boss. */
	z.string()
);
