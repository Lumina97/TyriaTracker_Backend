import { z } from 'zod';

/**
 * /v2/account/home/cats definition
 */
export const AccountHomeCatsDTO = z.array(
	/** Ids of cat unlocked in home instance. */
	z.number()
);
