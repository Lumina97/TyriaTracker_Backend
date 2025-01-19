import { z } from 'zod';

/**
 * /v2/account/outfits definition
 * Can be resolved against /v2/outfits
 */
export const AccountOutfitsDTO = z.array(
	/** Id of the outfit. */
	z.number()
);
