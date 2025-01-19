import { z } from 'zod';

/**
 * /v2/account/gliders definition
 * Can be resolved against /v2/gliders
 */
export const AccountGlidersDTO = z.array(
	/** Id of the glider. */
	z.number()
);
