import { z } from 'zod';

/**
 * /v2/account/home/nodes definition
 */
export const AccountHomeNodesDTO = z.array(
	/** Ids of node unlocked in home instance. */
	z.string()
);
