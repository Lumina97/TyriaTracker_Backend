import { z } from 'zod';

/**
 * /v2/account/mounts/skins definition
 * Can be resolved against /v2/mounts/skins
 */
export const AccountMountSkinsDTO = z.array(
	/** Id of the skin. */
	z.number()
);
