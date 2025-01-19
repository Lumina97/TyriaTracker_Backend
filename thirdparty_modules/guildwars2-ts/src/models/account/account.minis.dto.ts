import { z } from 'zod';

/**
 * /v2/account/minis definition
 * Can be resolved against /v2/minis
 */
export const AccountMinisDTO = z.array(
	/** Id of the mini. */
	z.number()
);
