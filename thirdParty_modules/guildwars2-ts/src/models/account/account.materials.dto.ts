import { z } from 'zod';

/**
 * /v2/account/materials definition
 */
export const AccountMaterialsDTO = z.array(
	z.object({
		/** Item id of the material. */
		id: z.number(),
		/** Material category. Can be resolved against /v2/materials. */
		category: z.number(),
		/** Binding of the material. Either "Account" or undefined. */
		binding: z.literal('Account').optional(),
		/** Material count in the account storage. */
		count: z.number()
	})
);
