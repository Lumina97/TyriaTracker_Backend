import { z } from 'zod';

/**
 * /v2/account/novelties definition
 * Can be resolved against /v2/novelties
 */
export const AccountNoveltiesDTO = z.array(
	/** Id of the novelty. */
	z.number()
);
