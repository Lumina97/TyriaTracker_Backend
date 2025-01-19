import { z } from 'zod';

/**
 * /v2/account/skins definition
 * Can be resolved against /v2/skins
 */
export const AccountSkinsDTO = z.array(
	/** Id of the skin. */
	z.number()
);
