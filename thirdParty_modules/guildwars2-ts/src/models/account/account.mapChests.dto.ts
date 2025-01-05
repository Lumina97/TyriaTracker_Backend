import { z } from 'zod';

/**
 * /v2/account/mapchests definition
 * Can be resolved against /v2/mapchests.
 */
export const AccountMapChestsDTO = z.array(
	/** Id of the acquired daily hero choice chest. */
	z.string()
);
