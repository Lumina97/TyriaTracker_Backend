import { z } from 'zod';

/**
 * /v2/account/mailcarriers definition
 * Can be resolved against /v2/mailcarriers.
 */
export const AccountMailCarriersDTO = z.array(
	/** Id of the mail carrier. */
	z.number()
);
