import { z } from 'zod';

/**
 * /v2/account/jadebots definition
 */
export const AccountJadebotsDTO = z.array(
	/** The jadebot id. Can be resolved against /v2/jadebots.  */
	z.number()
);
