import { z } from 'zod';

/**
 * /v2/account/skiffs definition
 */
export const AccountSkiffsDTO = z.array(
	/** The id of the skiff skin. Can be resolved against /v2/skiffs. */
	z.number()
);
