import { z } from 'zod';

/**
 * /v2/account/dyes definition
 * Can be resolved against /v2/dyes
 */
export const AccountDyesDTO = z.array(
	/** Id of the dye. */
	z.number()
);
