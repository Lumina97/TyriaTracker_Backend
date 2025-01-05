import { z } from 'zod';

/**
 * /v2/account/mounts/types definition
 * Can be resolved against /v2/mounts/types
 */
export const AccountMountTypesDTO = z.array(
	/** Type of the mount. */
	z.string()
);
