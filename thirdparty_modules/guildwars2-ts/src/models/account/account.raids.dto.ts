import { z } from 'zod';

/**
 * /v2/account/raids definition
 * Can be resolved against /v2/raids
 */
export const AccountRaidsDTO = z.array(
	/** Id of the raid. */
	z.string()
);
