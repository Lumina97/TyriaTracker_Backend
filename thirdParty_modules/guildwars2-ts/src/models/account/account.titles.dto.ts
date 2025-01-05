import { z } from 'zod';

/**
 * /v2/account/titles definition
 * Can be resolved against /v2/titles
 */
export const AccountTitlesDTO = z.array(
	/** Id of the title. */
	z.number()
);
