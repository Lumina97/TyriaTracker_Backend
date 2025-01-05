import { z } from 'zod';

/**
 * /v2/account/dailycrafting definition
 * Can be resolved against /v2/dailycrafting
 */
export const AccountDailyCraftingDTO = z.array(
	/** Id of the crafted daily item. */
	z.string()
);
